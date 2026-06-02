import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Activity, Calculator, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "Competitive Programming Tracker",
    status: "Work in Progress",
    description: "A full-stack application tracking user performance across Codeforces and LeetCode using third-party APIs. Features activity calendars and data-driven recommendations.",
    stack: ["React", "Node.js", "Express", "Tailwind CSS"],
    icon: <Activity className="w-6 h-6 text-accent" />,
    color: "from-purple-500/20 to-accent/20",
    extendedDetails: {
      problem: "Competitive programmers have difficulty tracking active metrics, contest heatmaps, and customized learning feedback across multiple distinct coding nodes (like Codeforces and LeetCode) in a unified visual dashboard.",
      features: [
        "Dynamic multi-platform API caching system to bypass strict platform rate limits.",
        "Interactive activity heatmap dashboard consolidating user solving frequencies.",
        "RAG-driven feedback recommendations suggesting customized problem subsets based on active user weak metrics.",
        "Modern dark-mode glassmorphic widget containers with Framer Motion scroll loading."
      ],
      challenges: "Synchronizing rapid external API requests without triggering HTTP 429 Rate Limit blocks. Resolved using backend Redis-style memory caching layers and throttled fetch queues.",
      architecture: "Decoupled SPA layout with Vite compiling client segments and Express serving JSON payloads concurrently."
    }
  },
  {
    title: "Personal Finance Management",
    status: "Completed",
    description: "An OOP-based system managing income, expenses, and savings with a custom modular tax calculator.",
    stack: ["C++", "OOP", "Data Structures"],
    icon: <Calculator className="w-6 h-6 text-blue-500" />,
    color: "from-blue-500/20 to-cyan-500/20",
    extendedDetails: {
      problem: "Traditional spreadsheet models are tedious to maintain, prone to syntax errors, and fail to calculate complex multi-bracket progressive taxes dynamically in real-time.",
      features: [
        "Strict Object-Oriented C++ model using structural classes (Transaction, Category, User).",
        "Interactive console/file logging framework keeping transaction histories secure.",
        "Modular progressive tax bracket matching module based on dynamic income configurations.",
        "High-performance memory allocation structures executing instantly without overhead."
      ],
      challenges: "Designing robust file stream persistence that gracefully handles corrupt records. Resolved using modular parsing checks and robust try/catch exception pipelines.",
      architecture: "Console-bound compiled standard OOP executable built under strict C++17 standards."
    }
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="py-16 sm:py-24 border-t border-black/5 dark:border-white/5 transition-colors duration-300" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500 pb-1">Projects.</span>
        </h2>
        <p className="text-slate-600 dark:text-gray-400 font-sans mb-12 max-w-2xl leading-relaxed text-sm sm:text-base">
          A selection of my recent work focusing on full-stack development, algorithmic complexity, and scalable systems.
        </p>

        {/* Bento Grid layout - Stacks on mobile, 2 columns on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-surface border border-black/5 dark:border-white/5 hover:border-accent/30 dark:hover:border-accent/30 transition-all shadow-sm dark:shadow-none flex flex-col justify-between"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.color} rounded-full blur-[80px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
                    {project.icon}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-mono px-3 py-1 rounded-full border ${project.status === 'Completed' ? 'border-green-500/30 text-green-700 dark:text-green-400 bg-green-500/10' : 'border-yellow-500/30 text-yellow-700 dark:text-yellow-400 bg-yellow-500/10'}`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 font-heading group-hover:text-accent transition-colors leading-snug">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.stack.map(tech => (
                    <span key={tech} className="text-[10px] sm:text-xs px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded text-slate-600 dark:text-gray-300 border border-black/5 dark:border-white/5 leading-normal">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/rudraksh-kumar" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub className="w-4.5 h-4.5" />
                  </a>
                </div>
                
                {/* Premium Interactive Modal trigger */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2 bg-slate-900 dark:bg-white/5 hover:bg-slate-800 dark:hover:bg-accent/20 border border-black/10 dark:border-white/10 text-white dark:text-gray-200 hover:text-white hover:border-accent/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Details <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modern, Highly Responsive Project Modals */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 dark:bg-surface/95 border border-black/10 dark:border-white/10 rounded-3xl w-[95%] md:w-[90%] lg:w-[75%] max-w-[800px] max-h-[85vh] overflow-y-auto shadow-2xl relative p-6 md:p-8 flex flex-col gap-6 hide-scrollbar"
            >
              
              {/* Close Trigger (44px responsive click target) */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer z-50 flex items-center justify-center"
                style={{ width: '42px', height: '42px' }}
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-10 border-b border-black/5 dark:border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0">
                    {selectedProject.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {selectedProject.stack.map(tech => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded text-slate-500 dark:text-gray-400 border border-black/5 dark:border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <span className={`text-[10px] font-mono px-3 py-1 rounded-full border w-fit h-fit ${selectedProject.status === 'Completed' ? 'border-green-500/30 text-green-700 dark:text-green-400 bg-green-500/10' : 'border-yellow-500/30 text-yellow-700 dark:text-yellow-400 bg-yellow-500/10'}`}>
                  {selectedProject.status}
                </span>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col gap-6 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-gray-300 font-sans">
                
                {/* Section: Problem Statement */}
                <div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2">The Problem</h4>
                  <p className="text-xs sm:text-sm">{selectedProject.extendedDetails.problem}</p>
                </div>

                {/* Section: Features list */}
                <div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2">Core Features</h4>
                  <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2">
                    {selectedProject.extendedDetails.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Section: Engineering Challenges */}
                <div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2">Technical Challenges</h4>
                  <p className="text-xs sm:text-sm italic border-l-2 border-accent pl-3 bg-accent/5 py-1">{selectedProject.extendedDetails.challenges}</p>
                </div>

                {/* Section: Architectural Alignment */}
                <div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2">Architecture Alignment</h4>
                  <p className="text-xs sm:text-sm">{selectedProject.extendedDetails.architecture}</p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-4 mt-2">
                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/rudraksh-kumar" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    <FaGithub className="w-4 h-4" /> Github
                  </a>
                  <a 
                    href="https://github.com/rudraksh-kumar" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-gray-100 transition-all cursor-pointer active:scale-[0.98]"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
