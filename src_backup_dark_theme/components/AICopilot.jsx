import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Trash2 } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "Tell me about Rudraksh",
  "What projects has he built?",
  "What technologies does he know?",
  "What is his educational background?",
  "What are his interests?",
  "How does he use AI?"
];

const AICopilot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Rudraksh's AI Career Copilot. I can answer questions about his skills, projects, experience, and background. What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          // Exclude the very first greeting message from history to save tokens if desired,
          // but sending the whole history helps with conversational flow.
          history: messages.filter(m => m.role !== 'system')
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Error: " + (data.error || "Unable to reach the server.") }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my servers. Please make sure the backend is running." }]);
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
    setMessages([{
      role: 'assistant',
      content: "Chat cleared! How else can I help you?"
    }]);
  };

  return (
    <section className="py-24 relative border-t border-white/5" id="copilot">
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
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
              AI Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Copilot.</span>
            </h2>
          </div>
          <p className="text-gray-400 font-sans text-center max-w-2xl text-lg">
            Ask me anything about my work, projects, skills, and journey.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-surface/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] md:h-[700px] relative backdrop-blur-xl">
          
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-blue-500 p-[2px]">
                  <div className="w-full h-full bg-surface rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold leading-tight">Rudraksh's AI</h3>
                <p className="text-xs text-accent">Online • RAG Powered</p>
              </div>
            </div>
            <button 
              onClick={clearChat}
              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
              title="Clear Chat"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 md:p-6 flex flex-col gap-6 custom-scrollbar">
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
                  <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600/20 text-white rounded-tr-sm border border-blue-500/20' 
                      : 'bg-white/5 text-gray-300 rounded-tl-sm border border-white/10'
                  }`}>
                    {msg.content}
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
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-sm border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="px-4 md:px-6 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar hide-scrollbar-on-mobile">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/30 text-gray-400 hover:text-accent rounded-full text-xs md:text-sm transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-black/40 border-t border-white/10 relative z-10">
            <div className="relative flex items-center">
              <textarea
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 resize-none overflow-hidden"
                style={{ minHeight: '56px', maxHeight: '120px' }}
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 p-3 bg-accent hover:bg-accent/90 disabled:bg-white/5 disabled:text-gray-600 text-white rounded-full transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-3 text-[10px] md:text-xs text-gray-600">
              AI responses are generated based on Rudraksh's portfolio data.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AICopilot;
