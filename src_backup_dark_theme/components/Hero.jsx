import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowUpRight, MessageSquare, TerminalSquare, Download } from 'lucide-react';

const HoverText = ({ text, className }) => (
  <span className={className}>
    {text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block transition-all duration-300 hover:scale-[1.15] hover:-translate-y-2 hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.6)] cursor-default"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

const HoverTextSafe = ({ text, className }) => (
  <span className={className}>
    {text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block transition-transform duration-300 hover:scale-110 hover:-translate-y-1 cursor-default"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

const Hero = () => {
  const [desc, setDesc] = useState('');

  return (
    <section className="min-h-[100svh] flex flex-col justify-center pt-24 pb-12 relative" id="home">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12 lg:mt-0">
        {/* Left Typography Column */}
        <div className="col-span-1 lg:col-span-7 2xl:col-span-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/50 border border-white/5 text-xs font-heading tracking-wide text-gray-300 mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            ACTIVELY BUILDING & LEARNING
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-heading font-bold text-white leading-[1.05] tracking-tight mb-8"
          >
            <HoverText text="Rudraksh" className="inline-block" />
            <br />
            <HoverText text="Kumar." className="inline-block" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-8 min-h-[90px] sm:min-h-[80px]"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-accent font-sans flex items-center gap-2 font-medium mb-4 whitespace-nowrap overflow-hidden text-ellipsis pb-2">
              <span className="text-gray-400">&gt;</span>
              <TypeAnimation
                sequence={[
                  'Algorithmic Problem Solver',
                  () => setDesc('Designing, developing, and deploying highly optimized algorithms to creatively solve complex business logic challenges efficiently.'),
                  4500,
                  () => setDesc(''),
                  'Aspiring Software Engineer',
                  () => setDesc('Architecting and building robust, scalable software systems from the ground up to ensure long-term reliability and peak performance.'),
                  4500,
                  () => setDesc(''),
                  'Full Stack Developer',
                  () => setDesc('Crafting modern, highly responsive, and robust full-stack web applications tailored to deliver incredibly seamless and engaging user experiences.'),
                  4500,
                  () => setDesc(''),
                ]}
                wrapper="span"
                speed={50}
                deletionSpeed={65}
                repeat={Infinity}
              />
            </h2>
            <p className={`text-gray-400 text-sm sm:text-base font-sans leading-relaxed transition-opacity duration-300 ${desc ? 'opacity-100' : 'opacity-0'}`}>
              {desc || '\u00A0'}
            </p>
          </motion.div>

           {/* CTA Buttons (Under description) */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 0.6 }}
             className="flex flex-wrap gap-3 items-center mt-4"
           >
             <a 
               href="#projects"
               className="px-5 py-2.5 bg-white text-black rounded-xl text-xs font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5 group"
             >
               View My Work 
               <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </a>
             <a 
               href="#contact"
               className="px-5 py-2.5 bg-surface border border-white/10 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 hover:bg-surfaceHover hover:border-white/20 hover:-translate-y-0.5 hover:shadow-lg transition-all active:scale-[0.98]"
             >
               Let's Connect <MessageSquare className="w-3.5 h-3.5" />
             </a>
             <a 
               href="/resume.pdf"
               target="_blank"
               rel="noopener noreferrer"
               className="px-5 py-2.5 bg-transparent border border-white/20 text-gray-300 rounded-xl font-medium text-xs flex items-center justify-center gap-2 hover:text-white hover:border-accent/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 transition-all active:scale-[0.98]"
             >
               Resume <Download className="w-3.5 h-3.5" />
             </a>
           </motion.div>
        </div>

        {/* Right Side Floating Bento/Cards */}
        <div className="col-span-1 lg:col-span-5 2xl:col-span-4 relative flex flex-col items-center justify-center h-full min-h-[400px]">
           {/* Info Card */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.8 }}
             className="relative p-6 bg-surface/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl w-full max-w-sm z-20 hover:border-accent/40 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)] transition-all duration-300"
           >
             <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4 border border-accent/20">
               <TerminalSquare className="text-accent w-5 h-5" />
             </div>
             <h3 className="text-base font-medium text-white mb-1">
               Mathematics & Computing
             </h3>
             <p className="text-sm text-gray-400">BITS Pilani, KK Birla Goa Campus</p>
           </motion.div>

           {/* Decorative Tech Rings (behind card) */}
           <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30 pointer-events-none">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
               className="w-80 h-80 border border-white/10 rounded-full border-dashed"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute w-60 h-60 border border-accent/20 rounded-full"
             />
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
