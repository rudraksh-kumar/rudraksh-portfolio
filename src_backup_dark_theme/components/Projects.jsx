import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Activity, Calculator } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "Competitive Programming Tracker",
    status: "Work in Progress",
    description: "A full-stack application tracking user performance across Codeforces and LeetCode using third-party APIs. Features activity calendars and data-driven recommendations.",
    stack: ["React", "Node.js", "Express", "Tailwind CSS"],
    icon: <Activity className="w-6 h-6 text-accent" />,
    color: "from-purple-500/20 to-accent/20"
  },
  {
    title: "Personal Finance Management",
    status: "Completed",
    description: "An OOP-based system managing income, expenses, and savings with a custom modular tax calculator.",
    stack: ["C++", "OOP", "Data Structures"],
    icon: <Calculator className="w-6 h-6 text-blue-500" />,
    color: "from-blue-500/20 to-cyan-500/20"
  }
];

const Projects = () => {
  return (
    <section className="py-24 border-t border-white/5" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Projects.</span>
        </h2>
        <p className="text-gray-400 font-sans mb-12 max-w-2xl">
          A selection of my recent work focusing on full-stack development, algorithmic complexity, and scalable systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-surface border border-white/5 hover:border-accent/30 transition-all overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.color} rounded-full blur-[80px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {project.icon}
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${project.status === 'Completed' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'}`}>
                  {project.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 font-heading group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map(tech => (
                  <span key={tech} className="text-xs px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
