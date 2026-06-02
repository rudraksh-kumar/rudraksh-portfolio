import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <footer className="bg-white dark:bg-surface border-t border-black/5 dark:border-white/5 pt-24 pb-12 transition-colors duration-300 relative overflow-hidden" id="contact">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1500px] w-full px-5 sm:px-10 lg:px-16 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center lg:col-span-5"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-6">
              <div className="block leading-relaxed relative z-30 -mb-3 sm:-mb-6 lg:-mb-8 pt-2">Let's build</div>
              <div className="block leading-relaxed relative z-20 -mb-3 sm:-mb-6 lg:-mb-8 pt-2">something</div>
              <div className="block leading-relaxed relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500 pt-2 pb-6">extraordinary.</div>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg max-w-md mb-10">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="flex gap-4">
              <a 
                href="https://github.com/rudraksh-kumar" 
                target="_blank" 
                rel="noreferrer" 
                className="p-4 rounded-xl bg-slate-50 dark:bg-surface/50 border border-black/5 dark:border-white/5 hover:border-accent/50 dark:hover:border-accent/50 text-slate-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/rudraksh-565501285" 
                target="_blank" 
                rel="noreferrer" 
                className="p-4 rounded-xl bg-slate-50 dark:bg-surface/50 border border-black/5 dark:border-white/5 hover:border-accent/50 dark:hover:border-accent/50 text-slate-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a 
                href="mailto:rudrakshkumar9119@gmail.com?subject=Portfolio%20Inquiry" 
                className="p-4 rounded-xl bg-slate-50 dark:bg-surface/50 border border-black/5 dark:border-white/5 hover:border-accent/50 dark:hover:border-accent/50 text-slate-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 flex items-center justify-center min-w-[56px]"
                aria-label="Send Email"
              >
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/80 dark:bg-surface/40 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-3xl p-5 sm:p-8 shadow-xl shadow-black/5 dark:shadow-none">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-gray-300">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-gray-300">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-gray-300">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell me about your project, idea, or opportunity..." 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm mt-[-10px]">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {status === 'success' ? (
                  <div className="w-full py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-medium flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Message sent successfully!
                  </div>
                ) : (
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                )}
                
              </form>
            </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-black/5 dark:border-white/5 text-sm text-slate-400 dark:text-gray-500 text-left">
          <p>© {new Date().getFullYear()} Rudraksh Kumar - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
