"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VisionStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene 1: Transition (0.0 - 0.2)
  const transOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const transScale = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const transX = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, -50]);

  // Scene 2: Introducing (0.2 - 0.45)
  const introOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0.2, 0.25, 0.45], [50, 0, -50]);

  // Scene 3: Feature Icons (0.45 - 0.7)
  const featuresOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.65, 0.7], [0, 1, 1, 0]);
  const featuresY = useTransform(scrollYProgress, [0.45, 0.5, 0.7], [50, 0, -50]);

  // Scene 4: Technical Matrix (0.7 - 1.0)
  const tableOpacity = useTransform(scrollYProgress, [0.7, 0.75, 1.0, 1.0], [0, 1, 1, 1]);
  const tableY = useTransform(scrollYProgress, [0.7, 0.75, 1.0], [50, 0, 0]);

  const featureItems = [
    { name: "Decentralized Peer Discovery", icon: "🌐" },
    { name: "Multi-Layer Encryption", icon: "🔒" },
    { name: "Proof-of-Work Handshake", icon: "🤝" },
    { name: "Traffic Obfuscation", icon: "🌫" }
  ];

  const tableData = [
    { f: "ChaCha20 + X25519 Encryption", d: "Future-ready for ASR, file transfer, mobile, and AI defense integration", l: "Crypto Layer", b: "Data confidentiality and forward secrecy", color: "border-red-500" },
    { f: "Onion Routing", d: "Multi-hop, layered encryption routing hides sender identity and route", l: "Routing Layer", b: "Strong anonymity, even on untrusted networks", color: "border-cyan-500" },
    { f: "Proof-of-Work Challenge", d: "Lightweight puzzles validate incoming connections & resist Sybil/spam", l: "Network Layer", b: "Trustless entry barrier without central authority", color: "border-cyan-500" },
    { f: "Dummy Traffic Obfuscation", d: "Lightweight puzzles validate incoming connections & resist Sybil/spam", l: "Routing Layer", b: "Defends against traffic analysis and metadata leaks", color: "border-cyan-500" },
    { f: "Selectable Routing Modes", d: "Direct, Multi-Hop, Onion, and Delay-Tolerant options based on use case", l: "Application Layer", b: "User control over speed vs. privacy trade-offs", color: "border-blue-500" },
    { f: "LAN-based Peer Discovery", d: "Real-time scan and verification of local peers with key exchange", l: "Network Layer", b: "Seamless connection without central servers", color: "border-blue-500" },
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#0A1A2F]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Waves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500" stroke="#06b6d4" fill="transparent" strokeWidth="2" className="animate-pulse" />
          </svg>
        </div>

        {/* --- SCENE 1: TRANSITION --- */}
        <motion.div 
          className="absolute flex items-center gap-8"
          style={{ opacity: transOpacity, scale: transScale, x: transX }}
        >
          <span className="text-[12rem] md:text-[18rem] font-bold text-cyan-400/20 leading-none select-none border-r-4 border-cyan-400/40 pr-8">2</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-[0.2em] font-mono leading-tight">THE<br/>VISION</h2>
        </motion.div>

        {/* --- SCENE 2: INTRODUCING --- */}
        <motion.div 
          className="absolute flex flex-col items-center text-center max-w-4xl px-6"
          style={{ opacity: introOpacity, y: introY }}
        >
          <p className="text-3xl md:text-4xl font-mono text-white mb-4 tracking-widest lowercase opacity-60 italic">introducing</p>
          <h2 className="text-6xl md:text-8xl font-bold text-white font-mono tracking-widest mb-12 shadow-[0_0_20px_rgba(6,182,212,0.5)]">OBSCURANET</h2>
          
          <div className="space-y-6 w-full max-w-2xl">
            <div className="relative p-6 bg-black/40 border border-cyan-500/50 rounded-lg backdrop-blur-md shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                <p className="text-xl md:text-2xl text-white font-mono leading-relaxed">
                    A modular, decentralized messaging protocol for secure, private peer-to-peer communication.
                </p>
            </div>
            <div className="relative p-6 bg-black/40 border border-cyan-500/50 rounded-lg backdrop-blur-md shadow-xl overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                <p className="text-xl md:text-2xl text-white font-mono leading-relaxed">
                    Designed to eliminate single points of failure and resist censorship or surveillance.
                </p>
            </div>
          </div>
        </motion.div>

        {/* --- SCENE 3: FEATURE ICONS --- */}
        <motion.div 
          className="absolute w-full max-w-6xl px-6 flex flex-col items-center"
          style={{ opacity: featuresOpacity, y: featuresY }}
        >
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-white font-mono tracking-widest mb-2">OBSCURANET</h2>
            <p className="text-3xl text-white font-mono tracking-[0.4em] opacity-80">features</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full">
            {featureItems.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-4 border-cyan-500/30 flex items-center justify-center text-5xl md:text-6xl shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-transform group-hover:scale-110 duration-500">
                   {item.icon}
                 </div>
                 <p className="mt-6 text-white font-mono text-sm md:text-lg tracking-tight leading-snug px-2 uppercase">{item.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- SCENE 4: TECHNICAL MATRIX --- */}
        <motion.div 
          className="absolute w-full max-w-6xl px-6 flex flex-col items-center"
          style={{ opacity: tableOpacity, y: tableY }}
        >
          <div className="mb-8 w-full flex justify-center">
            <h2 className="text-4xl font-bold text-white font-mono tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)] px-8 py-2 border-x-2 border-cyan-500">OBSCURANET</h2>
          </div>

          <div className="w-full overflow-x-auto rounded-lg border border-white/10 bg-black/40 backdrop-blur-xl">
             <table className="w-full text-left font-mono text-xs md:text-sm">
                <thead>
                   <tr className="bg-white/5 border-b border-white/10 uppercase tracking-widest text-[10px]">
                      <th className="p-4 text-red-400">Feature</th>
                      <th className="p-4 text-cyan-400">Description</th>
                      <th className="p-4 text-blue-400 text-center">Technical Layer</th>
                      <th className="p-4 text-green-400">User Benefit</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {tableData.map((row, idx) => (
                     <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-4 font-bold text-white group-hover:text-cyan-400">{row.f}</td>
                        <td className="p-4 text-white/60 leading-relaxed">{row.d}</td>
                        <td className="p-4 text-center">
                           <span className={`px-2 py-1 rounded border ${row.color} bg-white/5 text-[10px] whitespace-nowrap`}>
                              {row.l}
                           </span>
                        </td>
                        <td className="p-4 text-green-400/80">{row.b}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <p className="text-white/20 text-[10px] mt-4 font-mono uppercase tracking-[0.5em]">Scroll to explore protocol workflow</p>
        </motion.div>

      </div>
    </div>
  );
}
