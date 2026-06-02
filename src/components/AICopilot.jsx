import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Trash2, Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "Tell me about Rudraksh",
  "What projects has he built?",
  "What technologies does he know?",
  "What are his strengths?",
  "Why should I hire him?"
];

// Dynamic API URL configuration for production deployment and local development fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AICopilot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm Rudraksh. Want to know more about me? Let's talk."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice AI States - Voice mode is now ALWAYS active by default
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true); // TTS Active by default
  const [autoSend, setAutoSend] = useState(true); // Auto-submit voice active by default
  const [speechSupport, setSpeechSupport] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('idle'); // idle, listening, thinking, speaking
  const [micError, setMicError] = useState("");

  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const autoSendRef = useRef(autoSend);

  // Sync autoSend state to ref to avoid stale closures inside event listeners
  useEffect(() => {
    autoSendRef.current = autoSend;
  }, [autoSend]);

  // Initialize Speech Synthesis and Recognition
  useEffect(() => {
    // 1. Setup Speech Synthesis (TTS)
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }

    // 2. Setup Speech Recognition (STT)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = typeof navigator !== 'undefined' ? (navigator.language || 'en-US') : 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setMicError("");
        setVoiceStatus('listening');
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setVoiceStatus('idle');
        
        if (event.error === 'not-allowed') {
          setMicError("Microphone access is required for voice interaction. Please enable it in browser settings.");
        } else if (event.error === 'no-speech') {
          setMicError("I couldn't hear anything. Please try speaking again.");
        } else if (event.error === 'network') {
          // Dynamic Brave Browser blocking detection
          if (typeof navigator !== 'undefined' && navigator.brave && typeof navigator.brave.isBrave === 'function') {
            navigator.brave.isBrave().then(isBrave => {
              if (isBrave) {
                setMicError("Brave Browser has completely removed Google Speech-to-Text integration to protect your privacy. You can still type your questions and hear the AI speak answers aloud! For the full microphone experience, please open this page in Chrome or Edge.");
              } else {
                setMicError("Speech recognition network error. This browser API requires an active internet connection. Please verify your connection and try speaking again.");
              }
            }).catch(() => {
              setMicError("Speech recognition network error. Please verify your internet connection and try speaking again.");
            });
          } else {
            setMicError("Speech recognition network error. This browser API requires an active internet connection. Please verify your connection and try speaking again.");
          }
        } else {
          setMicError(`Speech error: ${event.error}. Please try again.`);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setVoiceStatus('idle');
        setMicError("");

        if (autoSendRef.current) {
          handleSend(transcript);
        }
      };

      recognitionRef.current = rec;
      setSpeechSupport(true);
    } else {
      setSpeechSupport(false);
    }

    // Cleanup speech engines on component unmount
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Speak Text Aloud Helper
  const speakText = (text) => {
    if (!synthRef.current) return;

    // Terminate any active speech
    synthRef.current.cancel();

    if (!voiceEnabled) return;

    // Clean text by stripping Markdown bolding, headers, and code ticks
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // remove markdown bolding
      .replace(/[\*\#\`\_]/g, '')     // strip remaining MD characters
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Dynamic professional English voice selection
    const voices = synthRef.current.getVoices();
    const premiumVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
                         voices.find(v => v.lang.startsWith('en') && v.name.includes('Natural')) ||
                         voices.find(v => v.lang.startsWith('en')) ||
                         voices[0];

    if (premiumVoice) {
      utterance.voice = premiumVoice;
    }

    utterance.rate = 1.05; // Slightly faster, highly professional rhythm
    utterance.pitch = 1.0;  // Standard natural pitch

    utterance.onstart = () => {
      setIsSpeaking(true);
      setVoiceStatus('speaking');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setVoiceStatus('idle');
    };

    utterance.onerror = (err) => {
      console.error("Speech synthesis error:", err);
      setIsSpeaking(false);
      setVoiceStatus('idle');
    };

    synthRef.current.speak(utterance);
  };

  // Halt active speech
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      if (voiceStatus === 'speaking') {
        setVoiceStatus('idle');
      }
    }
  };

  // Trigger speech recognition capture loop
  const toggleListening = () => {
    // If the AI is currently speaking, clicking the mic button halts the audio and returns to idle
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceStatus('idle');
    } else {
      try {
        setMicError("");
        setInputValue("");
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start Speech Recognition:", err);
      }
    }
  };

  const handleSend = async (text) => {
    if (!text || !text.trim()) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Please enter a question." }]);
      return;
    }

    // Stop any ongoing assistant speech
    stopSpeaking();

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setVoiceStatus('thinking');

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.filter(m => m.role !== 'system')
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        setVoiceStatus('idle');
        
        // Speak response aloud automatically
        if (voiceEnabled) {
          speakText(data.reply);
        }
      } else {
        let errMsg = data.error || "Unable to reach the server.";
        
        if (errMsg.includes('503') || errMsg.toLowerCase().includes('high demand')) {
          errMsg = "My AI brain is currently experiencing unusually high traffic from Google's servers! 🧠⚡ Please wait a few seconds and try asking again.";
        } else if (errMsg.includes('API key not valid')) {
          errMsg = "My AI systems are currently offline due to a configuration error. Please try again later.";
        } else {
          errMsg = "Oops, I ran into a technical snag: " + errMsg;
        }

        setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
        setVoiceStatus('idle');
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my servers. Please make sure the backend is running." }]);
      setVoiceStatus('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const clearChat = () => {
    stopSpeaking();
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setMessages([{
      role: 'assistant',
      content: "Hi, I'm Rudraksh. Want to know more about me? Let's talk."
    }]);
    setMicError("");
  };

  return (
    <section className="py-24 relative border-t border-black/5 dark:border-white/5 transition-colors duration-300" id="copilot">
      {/* Self-contained custom CSS overrides for dynamic pulse wave and ring animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseWave {
          0% { transform: scaleY(0.25); }
          100% { transform: scaleY(1.3); }
        }
        @keyframes ringPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}} />

      <div className="max-w-[1500px] w-full px-5 sm:px-10 lg:px-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
              <Bot className="text-accent w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white leading-[1.3]">
              AI Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500 py-2 inline-block">Copilot.</span>
            </h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 font-sans text-center max-w-2xl text-lg">
            Explore my portfolio through conversation, not just scrolling.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white/90 dark:bg-surface/40 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] md:h-[700px] relative backdrop-blur-xl transition-colors duration-300 shadow-sm dark:shadow-none">
          
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative animate-fadeIn">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-blue-500 p-[2px]">
                  <div className="w-full h-full bg-surface rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full"></div>
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-semibold leading-tight">Ask Rudraksh</h3>
                {isSpeaking ? (
                  <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium animate-fadeIn mt-0.5">
                    <span className="flex items-center gap-0.5 h-3 w-4">
                      <span className="w-[2px] bg-green-500 rounded-full animate-[pulseWave_0.8s_infinite_ease-in-out_alternate]" style={{ height: '60%', animationDelay: '0ms' }} />
                      <span className="w-[2px] bg-green-500 rounded-full animate-[pulseWave_0.8s_infinite_ease-in-out_alternate]" style={{ height: '100%', animationDelay: '150ms' }} />
                      <span className="w-[2px] bg-green-500 rounded-full animate-[pulseWave_0.8s_infinite_ease-in-out_alternate]" style={{ height: '45%', animationDelay: '300ms' }} />
                    </span>
                    AI is speaking...
                  </div>
                ) : isListening ? (
                  <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium animate-fadeIn mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Listening to you...
                  </div>
                ) : (
                  <p className="text-xs text-accent mt-0.5">Online</p>
                )}
              </div>
            </div>
            
            <button 
              onClick={clearChat}
              className="p-2 text-slate-500 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
              title="Clear Chat"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Microphone Permission/Speech Recognition Error Alerts */}
          {micError && (
            <div className="mx-4 md:mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between gap-3 text-red-500 text-xs font-sans animate-fadeIn">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{micError}</span>
              </div>
              <button 
                onClick={() => setMicError("")}
                className="p-1 hover:bg-red-500/20 rounded-full transition-colors font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Chat Messages */}
          <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 md:p-6 flex flex-col gap-6 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-accent/20 text-accent'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl text-sm md:text-base leading-relaxed relative group ${
                    msg.role === 'user' 
                      ? 'bg-blue-600/20 text-slate-900 dark:text-white rounded-tr-sm border border-blue-500/20' 
                      : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 rounded-tl-sm border border-black/5 dark:border-white/10'
                  }`}>
                    
                    {/* Speak Button for individual assistant messages */}
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => {
                          if (isSpeaking) {
                            stopSpeaking();
                          } else {
                            speakText(msg.content);
                          }
                        }}
                        className="absolute -right-8 top-2 p-1.5 text-slate-400 hover:text-accent rounded-full bg-white dark:bg-surface border border-black/10 dark:border-white/10 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Read aloud"
                        type="button"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div 
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ 
                        __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-accent">$1</strong>')
                      }} 
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1 text-accent">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-2xl rounded-tl-sm border border-black/5 dark:border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggested Prompts */}
          <div className="px-4 md:px-6 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar hide-scrollbar-on-mobile">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInputValue(prompt);
                      handleSend(prompt);
                    }}
                    className="whitespace-nowrap px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-accent/20 border border-black/5 dark:border-white/10 hover:border-accent/30 text-slate-600 dark:text-gray-400 hover:text-accent rounded-full text-xs md:text-sm transition-all flex items-center gap-1.5"
                  >
                    <span>🎤</span>
                    {prompt}
                  </button>
                ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-slate-50 dark:bg-black/40 border-t border-black/10 dark:border-white/10 relative z-10 transition-colors duration-300">
            <div className="relative flex items-center">
              
              {/* Premium Microphone Trigger Button - Always visible next to Send */}
              {speechSupport && (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`absolute right-11 sm:right-14 rounded-full transition-all flex items-center justify-center border shrink-0 w-9 h-9 sm:w-10 sm:h-10 ${
                    isListening
                      ? 'bg-red-500 border-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                      : isSpeaking
                      ? 'bg-green-500 border-green-500 text-white animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                      : 'bg-accent/10 border-accent/20 hover:bg-accent/20 text-accent hover:border-accent/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]'
                  }`}
                  title={
                    isSpeaking ? "Stop AI voice playback" :
                    isListening ? "Stop listening" : 
                    "Start speaking"
                  }
                >
                  {isListening ? (
                    <div className="relative flex items-center justify-center w-full h-full">
                      {/* CSS-based expanding outer ring animation */}
                      <div className="absolute rounded-full bg-red-500/30 animate-[ringPulse_1s_infinite_ease-out] w-9 h-9 sm:w-10 sm:h-10" />
                      <MicOff className="w-4 h-4 relative z-10" />
                    </div>
                  ) : isSpeaking ? (
                    <div className="relative flex items-center justify-center w-full h-full">
                      {/* CSS-based expanding outer ring animation */}
                      <div className="absolute rounded-full bg-green-500/30 animate-[ringPulse_1s_infinite_ease-out] w-9 h-9 sm:w-10 sm:h-10" />
                      <Volume2 className="w-4 h-4 relative z-10" />
                    </div>
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
              )}

              <textarea
                rows={1}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  stopSpeaking();
                }}
                onKeyDown={handleKeyDown}
                placeholder={
                  isListening ? "Listening... Speak naturally now!" : "Ask me anything or tap Mic to speak..."
                }
                className={`w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full py-3.5 sm:py-4 pl-5 sm:pl-6 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent/50 resize-none overflow-hidden transition-all text-xs sm:text-sm ${
                  speechSupport ? 'pr-24 sm:pr-28' : 'pr-12 sm:pr-14'
                }`}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-1.5 sm:right-2 bg-accent hover:bg-accent/90 disabled:bg-slate-200 dark:disabled:bg-white/5 disabled:text-slate-400 dark:disabled:text-gray-600 text-white rounded-full transition-all flex items-center justify-center shrink-0 w-9 h-9 sm:w-10 sm:h-10"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center mt-3 text-[10px] md:text-xs text-gray-600 dark:text-gray-500">
              Speak clearly or type your questions.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AICopilot;
