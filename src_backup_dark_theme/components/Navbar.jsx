import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-auto flex items-center justify-between w-full max-w-3xl px-10 py-4 rounded-full backdrop-blur-md bg-surface/80 border border-white/10 shadow-2xl"
      >
        <div className="flex items-center gap-2">
          <Terminal className="text-accent w-5 h-5" />
          <span className="font-heading font-bold text-lg tracking-wider text-white">RK</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#about" className="hover:text-white hover:-translate-y-0.5 transition-transform duration-300">About</a>
          <a href="#projects" className="hover:text-white hover:-translate-y-0.5 transition-transform duration-300">Projects</a>
          <a href="#experience" className="hover:text-white hover:-translate-y-0.5 transition-transform duration-300">Experience</a>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
