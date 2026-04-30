"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

function AnimatedNumber({ value }: { value: MotionValue<number> }) {
  const [display, setDisplay] = useState(0);
  useMotionValueEvent(value, "change", (latest) => {
    setDisplay(Math.round(latest));
  });
  return <>{display}</>;
}

function Scene2Bar({ value }: { value: MotionValue<number> }) {
  const width = useTransform(value, (v) => `${v * 10}%`);
  return <motion.div className="h-6 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] rounded-r" style={{ width }} />;
}

function Scene5Bar({ value, icon }: { value: MotionValue<number>, icon: string }) {
  const width = useTransform(value, (v) => `${v}%`);
  const xOffset = useTransform(value, (v) => `calc(-100% + ${v}%)`);
  
  return (
    <div className="flex-1 h-8 bg-cyan-900/30 rounded-r relative overflow-hidden">
      <motion.div 
        className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] rounded-r flex items-center justify-end pr-2" 
        style={{ width }}
      >
        <div className="text-xl mr-[-12px] z-10 drop-shadow-md">{icon}</div>
      </motion.div>
      <motion.span 
        className="absolute left-full ml-4 text-white font-bold" 
        style={{ x: xOffset }}
      >
        <AnimatedNumber value={value} />
      </motion.span>
    </div>
  );
}

export default function ProblemSpace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene 1: INTRODUCTION Transition (0.0 - 0.2)
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const introX = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, -50]);

  // Scene 2: Global Data Breaches (0.2 - 0.45)
  const breachesOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
  const breachesY = useTransform(scrollYProgress, [0.2, 0.25, 0.45], [50, 0, -50]);
  
  // Bar Chart growth
  const bar2017 = useTransform(scrollYProgress, [0.25, 0.35], [0, 2.5]);
  const bar2018 = useTransform(scrollYProgress, [0.25, 0.35], [0, 2.8]);
  const bar2019 = useTransform(scrollYProgress, [0.25, 0.35], [0, 4.0]);
  const bar2020 = useTransform(scrollYProgress, [0.25, 0.35], [0, 5.2]);
  const bar2021 = useTransform(scrollYProgress, [0.25, 0.35], [0, 6.5]);
  const bar2022 = useTransform(scrollYProgress, [0.25, 0.35], [0, 7.2]);
  const bar2023 = useTransform(scrollYProgress, [0.25, 0.35], [0, 8.0]);

  // Scene 3: Metadata Risk (0.45 - 0.65)
  const metadataOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const metadataY = useTransform(scrollYProgress, [0.45, 0.5, 0.65], [50, 0, -50]);

  // Scene 4: PROBLEM SPACE Transition (0.65 - 0.8)
  const problemOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.75, 0.8], [0, 1, 1, 0]);
  const problemScale = useTransform(scrollYProgress, [0.65, 0.7], [0.8, 1]);
  const problemX = useTransform(scrollYProgress, [0.65, 0.7, 0.8], [50, 0, -50]);

  // Scene 5: Censorship Chart (0.8 - 1.0)
  const censorshipOpacity = useTransform(scrollYProgress, [0.8, 0.85, 0.95, 1.0], [0, 1, 1, 1]);
  const censorshipY = useTransform(scrollYProgress, [0.8, 0.85, 1.0], [50, 0, 0]);

  // Censorship Bar Growth
  const barIndia = useTransform(scrollYProgress, [0.85, 0.95], [0, 84]);
  const barIran = useTransform(scrollYProgress, [0.85, 0.95], [0, 34]);
  const barRussia = useTransform(scrollYProgress, [0.85, 0.95], [0, 20]);
  const barChina = useTransform(scrollYProgress, [0.85, 0.95], [0, 19]);
  const barMyanmar = useTransform(scrollYProgress, [0.85, 0.95], [0, 17]);
  const barPakistan = useTransform(scrollYProgress, [0.85, 0.95], [0, 10]);
  const barEthiopia = useTransform(scrollYProgress, [0.85, 0.95], [0, 8]);
  const barSudan = useTransform(scrollYProgress, [0.85, 0.95], [0, 6]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#0A1A2F]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Waves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500" stroke="#06b6d4" fill="transparent" strokeWidth="2" className="animate-pulse" />
            <path d="M0,600 C200,500 300,700 500,600 C700,500 800,700 1000,600" stroke="#06b6d4" fill="transparent" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* --- SCENE 1: INTRODUCTION --- */}
        <motion.div 
          className="absolute flex items-center gap-8"
          style={{ opacity: introOpacity, scale: introScale, x: introX, willChange: "transform, opacity" }}
        >
          <span className="text-[12rem] md:text-[18rem] font-bold text-cyan-400/20 leading-none select-none border-r-4 border-cyan-400/40 pr-8">1</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-[0.2em] font-mono">INTRODUCTION</h2>
        </motion.div>

        {/* --- SCENE 2: DATA BREACHES --- */}
        <motion.div 
          className="absolute w-full max-w-5xl px-6 flex flex-col md:flex-row items-center gap-12"
          style={{ opacity: breachesOpacity, y: breachesY, willChange: "transform, opacity" }}
        >
          <div className="flex-1 w-full space-y-4 font-mono">
             {[
               { year: "2017", val: bar2017 }, { year: "2018", val: bar2018 },
               { year: "2019", val: bar2019 }, { year: "2020", val: bar2020 },
               { year: "2021", val: bar2021 }, { year: "2022", val: bar2022 },
               { year: "2023", val: bar2023 }
             ].map((b) => (
               <div key={b.year} className="flex items-center gap-4">
                 <span className="w-12 text-white/60 text-right">{b.year}</span>
                 <Scene2Bar value={b.val} />
               </div>
             ))}
             <div className="flex justify-between text-white/40 text-[10px] pt-2">
               <span>0</span><span>2</span><span>4</span><span>6</span><span>8B</span>
             </div>
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-5xl font-bold text-white mb-2 font-mono tracking-tighter">The Privacy <span className="text-cyan-400">Crisis</span></h2>
            <div className="relative inline-block mt-4">
              <div className="absolute -inset-1 bg-cyan-500/20 blur-md rounded-lg" />
              <div className="relative bg-black/40 border border-cyan-500/50 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-xl text-white font-mono">8 billion records leaked in 2023 alone</p>
              </div>
            </div>
            <h3 className="text-2xl text-white/40 mt-8 font-mono">Global Data Breaches (2017-2023)</h3>
          </div>
        </motion.div>

        {/* --- SCENE 3: METADATA RISK --- */}
        <motion.div 
          className="absolute w-full max-w-5xl px-6 flex flex-col md:flex-row items-center gap-16"
          style={{ opacity: metadataOpacity, y: metadataY, willChange: "transform, opacity" }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
             <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#06b6d4" strokeWidth="20" strokeDasharray="12.8 238.4" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22d3ee" strokeWidth="20" strokeDasharray="32.1 219.1" strokeDashoffset="-12.8" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#67e8f9" strokeWidth="20" strokeDasharray="48.2 203" strokeDashoffset="-44.9" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a5f3fc" strokeWidth="20" strokeDasharray="64.1 187.1" strokeDashoffset="-93.1" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0891b2" strokeWidth="20" strokeDasharray="89.3 161.9" strokeDashoffset="-157.2" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-mono text-cyan-400">METADATA</span>
                <span className="text-xl font-bold text-white">TYPES</span>
             </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold text-white font-mono">The Privacy <span className="text-cyan-400">Crisis</span></h2>
            <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-lg inline-block">
               <p className="text-sm text-white font-mono">Metadata can reveal more than messages</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white font-mono uppercase tracking-widest leading-none">Types of Metadata Collected</h3>
              <p className="text-white/30 text-xs font-mono">by Centralized Platforms</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
              {["Operational 20.4%", "Administrative 20.4%", "Descriptive 20.4%", "Technical 15.3%", "Structural 15.3%", "Compliance 8.2%"].map(m => (
                <div key={m} className="flex justify-between border-l border-cyan-500 pl-2 py-1 bg-white/5">
                   <span>{m.split(' ')[0]}</span> <span className="text-cyan-400">{m.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- SCENE 4: PROBLEM SPACE Transition --- */}
        <motion.div 
          className="absolute flex items-center gap-8"
          style={{ opacity: problemOpacity, scale: problemScale, x: problemX, willChange: "transform, opacity" }}
        >
          <span className="text-[12rem] md:text-[18rem] font-bold text-cyan-400/20 leading-none select-none border-r-4 border-cyan-400/40 pr-8">2</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-[0.2em] font-mono leading-tight">PROBLEM<br/>SPACE</h2>
        </motion.div>

        {/* --- SCENE 5: CENSORSHIP CHART --- */}
        <motion.div 
          className="absolute w-full max-w-5xl px-6 flex flex-col items-center"
          style={{ opacity: censorshipOpacity, y: censorshipY, willChange: "transform, opacity" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white font-mono mb-2">The Current <span className="text-cyan-400">State</span> of Privacy</h2>
            <p className="text-xl md:text-2xl text-white font-mono uppercase tracking-widest">Top Countries with <span className="text-cyan-400">Frequent</span> Internet Censorship (2023)</p>
          </div>

          <div className="w-full space-y-3 font-mono">
             {[
               { name: "India", val: barIndia, icon: "🇮🇳" }, { name: "Iran", val: barIran, icon: "🇮🇷" },
               { name: "Russia", val: barRussia, icon: "🇷🇺" }, { name: "China", val: barChina, icon: "🇨🇳" },
               { name: "Myanmar", val: barMyanmar, icon: "🇲🇲" }, { name: "Pakistan", val: barPakistan, icon: "🇵🇰" },
               { name: "Ethiopia", val: barEthiopia, icon: "🇪🇹" }, { name: "Sudan", val: barSudan, icon: "🇸🇩" }
             ].map((c) => (
               <div key={c.name} className="flex items-center gap-4">
                 <span className="w-24 text-white text-right text-sm">{c.name}</span>
                 <Scene5Bar value={c.val} icon={c.icon} />
               </div>
             ))}
             <div className="flex justify-between text-white/40 text-xs pt-4 border-t border-white/10">
               <span>0</span><span>20</span><span>40</span><span>60</span><span>80</span><span>100</span>
             </div>
             <p className="text-center text-white/40 text-[10px] mt-2 uppercase tracking-widest">No. of Internet Censorship Events</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
