import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  const [time, setTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Theme Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  // Live Clock Logic (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(formatter.format(now));
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'AI Copilot', href: '#copilot' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-6 px-4 pointer-events-none animate-fadeIn">
      {/* 
        The main navbar:
        - Desktop: Spans w-[95%] and spaces items out using justify-between.
        - Mobile: Shrink-wraps into a single, compact centered capsule pill (w-auto) without nested boxes.
      */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-auto relative flex items-center justify-center md:justify-between w-auto md:w-[95%] max-w-[1400px] px-5 md:px-8 py-3 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-surface/80 border border-black/5 dark:border-white/10 shadow-2xl transition-all duration-300 gap-4 md:gap-0"
      >
        
        {/* DESKTOP VIEWPORT PARTS (hidden on mobile) */}
        
        {/* Left Side: Icons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#home"
            className="text-slate-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-300"
            aria-label="Home"
          >
            <Home className="w-5 h-5" />
          </a>
          
          <button 
            onClick={toggleTheme}
            className="text-slate-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-300 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Center: Text Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-gray-400">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="hover:text-accent dark:hover:text-accent hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        {/* Right Side: Location & Time Clock (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex flex-col items-end justify-center text-xs text-slate-500 dark:text-gray-400 font-medium">
            <span className="tracking-wide">Goa, India</span>
            <span className="text-accent tracking-widest font-mono mt-0.5 drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]">
              {time || '00:00:00'}
            </span>
          </div>
        </div>


        {/* MOBILE VIEWPORT PARTS (visible only on mobile) */}
        {/* Rendered directly inside the navbar, grouped closely with standard dividers */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Home link */}
          <a 
            href="#home"
            className="text-slate-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent active:scale-95 transition-all p-1 flex items-center justify-center"
            aria-label="Home"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home className="w-5 h-5" />
          </a>
          
          {/* Separator Line */}
          <span className="w-[1px] h-4 bg-black/10 dark:bg-white/10" />

          {/* Centered Mobile Menu Trigger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="px-3.5 py-1.5 bg-accent/15 border border-accent/20 text-accent hover:bg-accent/20 rounded-xl transition-all flex items-center gap-1 active:scale-[0.98] cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <>
                <X className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans leading-none pt-0.5">Close</span>
              </>
            ) : (
              <>
                <Menu className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans leading-none pt-0.5">Menu</span>
              </>
            )}
          </button>

          {/* Separator Line */}
          <span className="w-[1px] h-4 bg-black/10 dark:bg-white/10" />

          {/* Mobile Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="text-slate-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent active:scale-95 transition-all p-1 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>


        {/* Floating Mobile Dropdown Menu Drawer */}
        {/* Centered horizontally relative to the small shrink-wrapped capsule navbar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[90vw] sm:w-[85vw] max-w-[360px] overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/95 dark:bg-surface/95 backdrop-blur-lg shadow-2xl md:hidden pointer-events-auto"
            >
              <div className="flex flex-col p-6 gap-3 font-sans font-medium text-slate-700 dark:text-gray-300">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl hover:bg-accent/10 hover:text-accent active:scale-[0.98] transition-all duration-200 text-sm tracking-wide flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-accent opacity-55 text-xs">→</span>
                  </a>
                ))}
                
                {/* Divider */}
                <div className="h-[1px] bg-black/5 dark:bg-white/5 my-2" />
                
                {/* Mobile Location & Live Time clock */}
                <div className="flex items-center justify-between px-4 py-1 text-xs text-slate-500 dark:text-gray-400 font-mono">
                  <span className="tracking-wide">Goa, India</span>
                  <span className="text-accent tracking-wider font-semibold">
                    {time || '00:00:00'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </div>
  );
};

export default Navbar;
