"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DeepDiveStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene 1: Innovation (0.0 - 0.25)
  const innovationOpacity = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.25], [0, 1, 1, 0]);
  const innovationY = useTransform(scrollYProgress, [0, 0.05, 0.25], [50, 0, -50]);

  // Scene 2: Routing Evolution (0.25 - 0.55)
  const evolutionOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.5, 0.55], [0, 1, 1, 0]);
  const evolutionY = useTransform(scrollYProgress, [0.25, 0.3, 0.55], [50, 0, -50]);

  // Scene 3: Attack Surfaces (0.55 - 0.85)
  const matrixOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.8, 0.85], [0, 1, 1, 0]);
  const matrixY = useTransform(scrollYProgress, [0.55, 0.6, 0.85], [50, 0, -50]);

  // Scene 4: Standalone Features (0.85 - 1.0)
  const standOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1.0, 1.0], [0, 1, 1, 1]);
  const standY = useTransform(scrollYProgress, [0.85, 0.9, 1.0], [50, 0, 0]);

  const routingData = [
    { name: "P2P Messaging", lat: "Low", anon: "Low", res: "Low", color: "text-green-400" },
    { name: "Onion Routing", lat: "Moderate", anon: "High", res: "Moderate", color: "text-yellow-400" },
    { name: "Delay-Tolerant", lat: "High", anon: "Low", res: "High", color: "text-orange-400" },
    { name: "Multi-Hop", lat: "High", anon: "High", res: "High", color: "text-cyan-400" }
  ];

  const matrixData = [
    { t: "Traffic analysis", e: "Match timing of packets", d: "Dummy packets during idle time" },
    { t: "Sybil Attacks", e: "Flooding with fake peers", d: "PoW for every new session" },
    { t: "Metadata Leakage", e: "Sender/receiver IP visible", d: "Onion routing, randomized paths" },
    { t: "Relay Node Compromise", e: "Middle hop logs info", d: "Only sees next hop knowledge" },
    { t: "DoS/Replay Attack", e: "Reuse same challenge", d: "Cached PoW sessions & timeouts" },
    { t: "Key Theft", e: "Attacker gets public key", d: "Ephemeral ECDH, no reuse" },
  ];

  const pillars = [
    { title: "Adaptability", desc: "Switches routing modes based on network conditions.", icon: "🔄" },
    { title: "Performance", desc: "Optimizes for speed and reduces unnecessary delays.", icon: "⚡" },
    { title: "Security", desc: "Integrates encryption and dummy traffic for superior privacy.", icon: "🛡️" },
    { title: "Resilience", desc: "Handles changing environments dynamically and efficiently.", icon: "🏗️" }
  ];

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Visuals */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[120px]" />
        </div>

        {/* --- SCENE 1: INNOVATION --- */}
        <motion.div 
          className="absolute flex flex-col items-center text-center max-w-5xl px-6"
          style={{ opacity: innovationOpacity, y: innovationY, willChange: "transform, opacity" }}
>
          <h2 className="text-5xl md:text-7xl font-bold text-white font-mono tracking-[0.2em] mb-12">OUR <span className="text-cyan-400">INNOVATION</span></h2>
          <div className="grid md:grid-cols-2 gap-8 w-full">
            <div className="p-8 bg-white/5 border border-cyan-500/20 rounded-2xl backdrop-blur-sm group hover:border-cyan-500/50 transition-colors">
               <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-mono uppercase">Decentralization</h3>
               <p className="text-xl text-white/80 font-mono leading-relaxed">Fully decentralized architecture with NO reliance on centralized servers or authorities.</p>
            </div>
            <div className="p-8 bg-white/5 border border-cyan-500/20 rounded-2xl backdrop-blur-sm group hover:border-cyan-500/50 transition-colors">
               <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-mono uppercase">Adaptive Routing</h3>
               <p className="text-xl text-white/80 font-mono leading-relaxed">Multiple routing options (Low-latency, Onion, DTN, ASR) that adapt to your environment.</p>
            </div>
          </div>
        </motion.div>

        {/* --- SCENE 2: ROUTING EVOLUTION --- */}
        <motion.div 
          className="absolute w-full max-w-6xl px-6 flex flex-col items-center"
          style={{ opacity: evolutionOpacity, y: evolutionY, willChange: "transform, opacity" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white font-mono mb-12 tracking-widest uppercase">How did we get <span className="text-cyan-400">here?</span></h2>
          <div className="w-full space-y-4">
             {routingData.map((r, idx) => (
               <div key={idx} className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                     <span className="text-2xl font-bold text-white font-mono w-48">{r.name}</span>
                     <div className="flex flex-wrap justify-center gap-8 text-xs font-mono uppercase tracking-widest">
                        <div className="flex flex-col items-center">
                           <span className="text-white/40 mb-1">Latency</span>
                           <span className={r.lat === "Low" ? "text-green-400" : "text-orange-400"}>{r.lat}</span>
                        </div>
                        <div className="flex flex-col items-center">
                           <span className="text-white/40 mb-1">Anonymity</span>
                           <span className={r.anon === "High" ? "text-cyan-400" : "text-red-400"}>{r.anon}</span>
                        </div>
                        <div className="flex flex-col items-center">
                           <span className="text-white/40 mb-1">Resilience</span>
                           <span className={r.res === "High" ? "text-green-400" : "text-yellow-400"}>{r.res}</span>
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </motion.div>

        {/* --- SCENE 3: ATTACK MATRIX --- */}
        <motion.div 
          className="absolute w-full max-w-6xl px-6 flex flex-col items-center"
          style={{ opacity: matrixOpacity, y: matrixY, willChange: "transform, opacity" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white font-mono mb-8 tracking-widest uppercase">Defensive <span className="text-red-500">Architecture</span></h2>
          <div className="w-full grid gap-4 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
             {matrixData.map((m, idx) => (
               <div key={idx} className="grid md:grid-cols-3 gap-4 p-4 border border-white/5 bg-white/[0.02] rounded-lg items-center">
                  <div className="font-bold text-red-400 font-mono text-sm uppercase">{m.t}</div>
                  <div className="text-white/40 text-xs font-mono">{m.e}</div>
                  <div className="text-green-400 font-mono text-sm border-l border-green-500/20 pl-4">{m.d}</div>
               </div>
             ))}
          </div>
        </motion.div>

        {/* --- SCENE 4: ADAPTIVE STANDOUT --- */}
        <motion.div 
          className="absolute w-full max-w-6xl px-6 flex flex-col items-center"
          style={{ opacity: standOpacity, y: standY, willChange: "transform, opacity" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white font-mono mb-4 tracking-[0.3em]">OBSCURANET</h2>
            <p className="text-xl text-cyan-400 font-mono uppercase tracking-[0.5em] animate-pulse">Adaptive Secure Routing</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
             {pillars.map((p, idx) => (
               <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center text-center hover:bg-cyan-500/5 transition-colors">
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="text-lg font-bold text-white font-mono mb-2 uppercase">{p.title}</h3>
                  <p className="text-[10px] text-white/40 font-mono uppercase tracking-tighter leading-tight">{p.desc}</p>
               </div>
             ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
