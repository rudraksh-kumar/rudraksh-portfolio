import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const LocationCard = () => {
  const [time, setTime] = useState('');

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

  return (
    <section className="py-12 flex justify-center items-center relative z-10" id="location">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 dark:bg-surface/50 border border-accent/20 dark:border-accent/30 rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 backdrop-blur-md flex flex-col items-center justify-center gap-3 min-w-[280px]"
      >
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium text-lg">
          <MapPin className="w-5 h-5 text-accent" />
          <span>Goa, India</span>
        </div>
        
        {/* Glow divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-1"></div>
        
        <div className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500 tracking-wider font-mono drop-shadow-[0_0_15px_rgba(139,92,246,0.2)]">
          {time || '00:00:00'}
        </div>
      </motion.div>
    </section>
  );
};

export default LocationCard;
