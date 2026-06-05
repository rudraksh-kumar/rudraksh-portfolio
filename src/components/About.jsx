import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Github, Code2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { GitHubCalendar } from 'react-github-calendar';

const About = () => {
  // Custom theme to match the accent color (#8b5cf6)
  const explicitTheme = {
    light: ['#171717', '#4c1d95', '#6d28d9', '#8b5cf6', '#a78bfa'],
    dark: ['#171717', '#4c1d95', '#6d28d9', '#8b5cf6', '#a78bfa'],
  };

  // Filter to show approximately the last 60 days
  const filterLast60Days = (contributions) => {
    return contributions.slice(-60);
  };

  return (
    <section className="py-16 sm:py-24 relative border-t border-black/5 dark:border-white/5 transition-colors duration-300" id="about">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full"
      >
        
        {/* Top Row: About Me (Left) & GitHub Activity (Right) */}
        
        {/* About Me */}
        <div className="lg:col-span-7 xl:col-span-8 flex">
          <div className="bg-white/80 dark:bg-surface/50 border border-black/5 dark:border-white/5 rounded-3xl p-5 sm:p-8 hover:border-accent/40 hover:-translate-y-0.5 md:hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 w-full flex flex-col justify-between shadow-sm dark:shadow-none">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-[1.3]">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500 py-1 inline-block">Me.</span>
              </h2>
              
              <div className="prose prose-invert text-slate-600 dark:text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
                <p className="mb-4">
                  I am a Mathematics and Computing undergraduate at BITS Pilani with a strong foundation in problem-solving and algorithms.
                </p>
                <p>
                  What began as curiosity while learning Data Structures and Algorithms evolved into a passion for understanding how software works. Exploring websites and digital products often leaves me asking "How was this built?" and "What happens behind the scenes?" That curiosity has pushed me beyond algorithms and into the world of web development, where I enjoy learning how ideas are transformed into scalable, efficient, and user-friendly applications.
                </p>
              </div>
            </div>

            <blockquote className="border-l-2 border-accent text-accent/90 bg-accent/10 dark:bg-accent/5 p-4 rounded-r-xl font-medium italic mt-6 text-sm sm:text-base md:text-lg">
              "From wondering how websites work to building them myself—one project at a time."
            </blockquote>
          </div>
        </div>

        {/* GitHub Activity Card - Responsive Wrapping */}
        <div className="lg:col-span-5 xl:col-span-4 flex">
          <div className="bg-white/80 dark:bg-surface/50 border border-black/5 dark:border-white/5 rounded-3xl p-5 sm:p-8 hover:border-accent/40 hover:-translate-y-0.5 md:hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 w-full flex flex-col justify-between shadow-sm dark:shadow-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0">
                  <Github className="text-accent w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">GitHub Activity</h3>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-gray-300 w-fit h-fit">
                rudraksh-kumar
              </div>
            </div>
            
            {/* Wrapped in a horizontally scrollable container with hidden scrollbars for narrow viewports */}
            <div className="flex-grow flex items-center justify-center w-full pb-2 overflow-x-auto hide-scrollbar">
              <div className="min-w-[310px] sm:min-w-0 w-full flex justify-center items-center github-calendar-clean p-1">
                <GitHubCalendar 
                  username="rudraksh-kumar"
                  theme={explicitTheme}
                  colorScheme="dark"
                  fontSize={13}
                  blockSize={15}
                  blockMargin={4}
                  transformData={filterLast60Days}
                  hideColorLegend
                  hideTotalCount
                />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 font-medium font-sans">Last 60 Days</span>
              <a 
                href="https://github.com/rudraksh-kumar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-accent/20 dark:hover:bg-accent/20 text-slate-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: How I Think & Beyond Code (Stacks vertically on Mobile, side-by-side on tablet/desktop) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col md:flex-row gap-6 w-full mt-2 lg:mt-4">
          
          {/* How I Think */}
          <div className="md:w-[65%] bg-white/80 dark:bg-surface/50 border border-black/5 dark:border-white/5 rounded-3xl p-5 sm:p-8 hover:border-accent/40 hover:-translate-y-0.5 md:hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 flex flex-col justify-center shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0">
                <Sparkles className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">How I Think</h3>
            </div>
            <p className="text-slate-600 dark:text-gray-400 font-sans leading-relaxed text-xs sm:text-sm md:text-base">
              Using AI to learn faster, build smarter, and stay ahead in modern software development.
            </p>
          </div>

          {/* Beyond the Code */}
          <div className="md:w-[35%] bg-white/80 dark:bg-surface/50 border border-black/5 dark:border-white/5 rounded-3xl p-5 sm:p-8 hover:border-accent/40 hover:-translate-y-0.5 md:hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 flex flex-col justify-center shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0">
                <Camera className="text-accent w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-tight">Beyond the Code</h3>
            </div>
            <p className="text-slate-600 dark:text-gray-400 font-sans leading-relaxed text-xs sm:text-sm">
              Exploring creativity through photography and visual storytelling.
            </p>
          </div>

        </div>

        {/* Skills Card */}
        <div className="lg:col-span-5 xl:col-span-4 flex mt-2 lg:mt-4">
          <div className="bg-white/80 dark:bg-surface/50 border border-black/5 dark:border-white/5 rounded-3xl p-5 sm:p-8 hover:border-accent/40 hover:-translate-y-0.5 md:hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 w-full flex flex-col justify-center shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0">
                <Code2 className="text-accent w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {['C', 'C++', 'Python', 'Java', 'JavaScript', 'HTML', 'CSS', 'MATLAB', 'React'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent hover:border-accent/45 dark:hover:border-accent/45 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default About;
