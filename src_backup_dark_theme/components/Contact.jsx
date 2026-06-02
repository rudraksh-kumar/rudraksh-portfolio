import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <footer className="bg-surface border-t border-white/5 pt-24 pb-12" id="contact">
      <div className="max-w-[1500px] w-full px-5 sm:px-10 lg:px-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">extraordinary.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-6"
          >
            <a 
              href="mailto:rudrakshkumar9119@gmail.com"
              className="px-8 py-5 rounded-full bg-accent hover:bg-accent/90 text-white font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
            >
              <Mail className="w-5 h-5" />
              Say Hello
            </a>
            
            <div className="flex gap-4">
              <a href="https://github.com/torvalds" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-background border border-white/5 hover:border-accent/50 text-gray-400 hover:text-white transition-all">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-background border border-white/5 hover:border-accent/50 text-gray-400 hover:text-white transition-all">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Rudraksh Kumar. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed & Built with React & Tailwind</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
