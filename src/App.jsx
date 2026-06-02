import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AICopilot from './components/AICopilot';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background text-slate-900 dark:text-gray-200 selection:bg-accent/30 selection:text-white transition-colors duration-300">
      <Navbar />
      <main className="max-w-[1500px] w-full px-5 sm:px-10 lg:px-16 mx-auto overflow-hidden">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <AICopilot />
      </main>
      <Contact />
    </div>
  );
}

export default App;
