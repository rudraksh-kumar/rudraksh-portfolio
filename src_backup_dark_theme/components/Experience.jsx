import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Scientific Computing Lab",
    company: "Professor P Danumjaya Palla",
    date: "July 2025",
    description: "3-day intensive workshop on MATLAB and numerical methods under college faculty.",
  },
  {
    role: "Core Team Member",
    company: "Department of Photography, BITS Pilani Goa",
    date: "Aug 2024 - Present",
    description: "Covered major college events, executed large-scale event shoots, and managed visual storytelling workflows.",
  }
];

const Experience = () => {
  return (
    <section className="py-24 border-t border-white/5" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-12 pb-2 leading-tight">
          Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500 py-1">Extracurriculars.</span>
        </h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-surface border border-white/5 hover:border-accent/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                <h4 className="text-accent font-medium text-sm mb-3">{exp.company}</h4>
                <p className="text-gray-400 text-sm max-w-xl">
                  {exp.description}
                </p>
              </div>
              <div className="shrink-0">
                <span className="text-sm font-mono text-gray-500 bg-background px-4 py-2 rounded-full border border-white/5">
                  {exp.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
