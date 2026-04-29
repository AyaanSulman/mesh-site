"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MotivationStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene 1: Transition (0.0 - 0.3)
  const transOpacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.3], [0, 1, 1, 0]);
  const transScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const transX = useTransform(scrollYProgress, [0, 0.1, 0.3], [50, 0, -50]);

  // Scene 2: Current State (0.3 - 0.65)
  const currentOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.6, 0.65], [0, 1, 1, 0]);
  const currentY = useTransform(scrollYProgress, [0.3, 0.35, 0.65], [50, 0, -50]);

  // Scene 3: What We Offer (0.65 - 1.0)
  const offerOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.95, 1.0], [0, 1, 1, 1]);
  const offerY = useTransform(scrollYProgress, [0.65, 0.7, 1.0], [50, 0, 0]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#0A1A2F]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Waves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500" stroke="#06b6d4" fill="transparent" strokeWidth="2" />
          </svg>
        </div>

        {/* --- SCENE 1: TRANSITION --- */}
        <motion.div 
          className="absolute flex items-center gap-8"
          style={{ opacity: transOpacity, scale: transScale, x: transX, willChange: "transform, opacity" }}
        >
          <span className="text-[12rem] md:text-[18rem] font-bold text-cyan-400/20 leading-none select-none border-r-4 border-cyan-400/40 pr-8">4</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-[0.2em] font-mono">MOTIVATION</h2>
        </motion.div>

        {/* --- SCENE 2: CURRENT STATE --- */}
        <motion.div 
          className="absolute w-full max-w-6xl px-6 flex flex-col items-center"
          style={{ opacity: currentOpacity, y: currentY, willChange: "transform, opacity" }}
        >
          <div className="text-right w-full mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white font-mono leading-tight">Current State of<br/><span className="text-cyan-400 uppercase tracking-widest">Privacy & Anonymity Tools</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-4xl">
             <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-white text-6xl md:text-7xl mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                   🛡️
                </div>
                <p className="text-white font-mono text-xl md:text-2xl tracking-widest uppercase">Data Breach</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-white text-6xl md:text-7xl mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                   👁️
                </div>
                <p className="text-white font-mono text-xl md:text-2xl tracking-widest uppercase">Censorship</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-white text-6xl md:text-7xl mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                   🖥️
                </div>
                <p className="text-white font-mono text-xl md:text-2xl tracking-widest uppercase">Surveillance</p>
             </div>
          </div>
        </motion.div>

        {/* --- SCENE 3: WHAT WE OFFER --- */}
        <motion.div 
          className="absolute w-full max-w-6xl px-6 flex flex-col items-center"
          style={{ opacity: offerOpacity, y: offerY, willChange: "transform, opacity" }}
        >
          <div className="text-right w-full mb-16">
            <h2 className="text-6xl md:text-8xl font-bold text-white font-mono tracking-widest">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-4xl">
             <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-white text-6xl md:text-7xl mb-6 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                   🛡️
                </div>
                <p className="text-white font-mono text-xl md:text-2xl tracking-widest uppercase leading-tight">Security &<br/>Privacy</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-white text-6xl md:text-7xl mb-6 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                   ⛓️
                </div>
                <p className="text-white font-mono text-xl md:text-2xl tracking-widest uppercase leading-tight">Decentralized<br/>Cryptography</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-white text-6xl md:text-7xl mb-6 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                   👤
                </div>
                <p className="text-white font-mono text-xl md:text-2xl tracking-widest uppercase">Anonymity</p>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
