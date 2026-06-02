import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera } from 'lucide-react';
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
    <section className="py-24 relative border-t border-white/5" id="about">
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
          <div className="bg-surface/50 border border-white/5 rounded-3xl p-6 md:p-8 hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 w-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Me.</span>
              </h2>
              
              <div className="prose prose-invert prose-lg text-gray-400 font-sans">
                <p className="leading-relaxed mb-4">
                  I am a Mathematics and Computing undergraduate at BITS Pilani with a strong foundation in problem-solving and algorithms.
                </p>
                <p className="leading-relaxed">
                  What began as curiosity while learning Data Structures and Algorithms evolved into a passion for understanding how software works. Exploring websites and digital products often leaves me asking "How was this built?" and "What happens behind the scenes?" That curiosity has pushed me beyond algorithms and into the world of web development, where I enjoy learning how ideas are transformed into scalable, efficient, and user-friendly applications.
                </p>
              </div>
            </div>

            <blockquote className="border-l-2 border-accent text-accent/90 bg-accent/5 p-4 rounded-r-xl font-medium italic mt-6 text-base md:text-lg">
              "From wondering how websites work to building them myself—one project at a time."
            </blockquote>
          </div>
        </div>

        {/* GitHub Activity Card */}
        <div className="lg:col-span-5 xl:col-span-4 flex">
          <div className="bg-surface/50 border border-white/5 rounded-3xl p-6 md:p-8 hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 w-full flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
              <h3 className="text-2xl font-bold text-white">GitHub Activity</h3>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-xs font-mono text-gray-300 w-fit">
                rudraksh-kumar
              </div>
            </div>
            
            <div className="flex-grow flex items-center justify-center overflow-hidden w-full pb-2">
              <div className="w-full flex justify-center items-center github-calendar-clean">
                <GitHubCalendar 
                  username="rudraksh-kumar"
                  theme={explicitTheme}
                  colorScheme="dark"
                  fontSize={14}
                  blockSize={16}
                  blockMargin={5}
                  transformData={filterLast60Days}
                  hideColorLegend
                  hideTotalCount
                />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium font-sans">Last 60 Days</span>
              <a 
                href="https://github.com/rudraksh-kumar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-white/5 hover:bg-accent/20 text-gray-400 hover:text-accent hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: How I Think & Beyond Code (Only under About Me) */}
        
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col md:flex-row gap-6 w-full mt-2 lg:mt-4">
          
          {/* How I Think */}
          <div className="md:w-[70%] bg-surface/50 border border-white/5 rounded-3xl p-6 md:p-8 hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                <Sparkles className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">How I Think</h3>
            </div>
            <p className="text-gray-400 font-sans leading-relaxed text-sm md:text-base">
              Using AI to learn faster, build smarter, and stay ahead in modern software development.
            </p>
          </div>

          {/* Beyond the Code */}
          <div className="md:w-[30%] bg-surface/50 border border-white/5 rounded-3xl p-6 md:p-8 hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0">
                <Camera className="text-accent w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white leading-tight">Beyond the Code</h3>
            </div>
            <p className="text-gray-400 font-sans leading-relaxed text-sm">
              Exploring creativity through photography and visual storytelling.
            </p>
          </div>

        </div>

        {/* Empty space below GitHub Activity on Desktop */}
        <div className="lg:col-span-5 xl:col-span-4 hidden lg:block"></div>

      </motion.div>
    </section>
  );
};

export default About;
