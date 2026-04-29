"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function WorkflowStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [stepText, setStepText] = useState("User inputs message via GUI/CLI");
  const textTransform = useTransform(scrollYProgress, 
    [0.5, 0.6, 0.7, 0.8, 0.9, 1.0], 
    [
      "User inputs message via GUI/CLI", 
      "Peer Node Handler identifies destination", 
      "Proof of Work challenge initiated", 
      "Encryption module applies ChaCha20+X25519", 
      "Rerouting Engine determines optimal path", 
      "Message transmitted via Network Layer"
    ]
  );

  useMotionValueEvent(textTransform, "change", (latest) => {
    setStepText(latest);
  });

  // Scene 1: Modular Architecture Overview (0.0 - 0.4)
  const archOpacity = useTransform(scrollYProgress, [0, 0.05, 0.35, 0.4], [0, 1, 1, 0]);
  const archY = useTransform(scrollYProgress, [0, 0.05, 0.4], [50, 0, -50]);

  // Scene 2: Component Design Journey (0.4 - 1.0)
  const journeyOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.95, 1.0], [0, 1, 1, 1]);
  const journeyY = useTransform(scrollYProgress, [0.4, 0.45, 1.0], [50, 0, 0]);

  // Data Packet position through components
  const packetX = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8, 0.9, 1.0], ["10%", "30%", "50%", "70%", "90%", "50%"]);
  const packetY = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8, 0.9, 1.0], ["50%", "30%", "50%", "30%", "50%", "80%"]);
  const packetScale = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [1, 1.5, 1]);

  const layers = [
    { title: "Application Layer", items: ["User Interface (CLI/GUI)", "Peer Discovery", "Message Management"], color: "border-cyan-400" },
    { title: "Routing Layer", items: ["P2P", "DTN", "Onion", "Multi-Hop"], color: "border-blue-500" },
    { title: "Network Layer", items: ["TCP/UDP Socket Management", "Peer Transport", "Socket Pooling"], color: "border-indigo-600" }
  ];

  const components = [
    { name: "GUI/CLI", x: "10%", y: "50%" },
    { name: "Peer Handler", x: "30%", y: "30%" },
    { name: "Proof of Work", x: "50%", y: "50%" },
    { name: "Encryption", x: "70%", y: "30%" },
    { name: "Rerouting", x: "90%", y: "50%" },
    { name: "Communication", x: "50%", y: "80%" }
  ];

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Visuals */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#06b6d4_0%,transparent_50%)]" />
        </div>

        {/* --- SCENE 1: ARCHITECTURE OVERVIEW --- */}
        <motion.div 
          className="absolute w-full max-w-6xl px-6 flex flex-col items-center"
          style={{ opacity: archOpacity, y: archY, willChange: "transform, opacity" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white font-mono mb-16 tracking-widest text-center uppercase">Modular <span className="text-cyan-400">Architecture</span> Overview</h2>
          <div className="grid md:grid-cols-3 gap-8 w-full">
            {layers.map((layer, idx) => (
              <div key={idx} className={`p-8 bg-white/5 border-t-4 ${layer.color} rounded-b-2xl backdrop-blur-md`}>
                <h3 className="text-xl font-bold text-white font-mono mb-6 uppercase tracking-widest">{layer.title}</h3>
                <ul className="space-y-4">
                  {layer.items.map((item, i) => (
                    <li key={i} className="text-white/40 font-mono text-sm border-l border-white/10 pl-4">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- SCENE 2: COMPONENT DESIGN JOURNEY --- */}
        <motion.div 
          className="absolute w-full h-full flex flex-col items-center justify-center"
          style={{ opacity: journeyOpacity, y: journeyY, willChange: "transform, opacity" }}
        >
          <div className="absolute top-20 text-center">
            <h2 className="text-5xl font-bold text-white font-mono tracking-widest uppercase">Component <span className="text-cyan-400">Design</span></h2>
            <p className="text-white/20 font-mono text-xs mt-2 uppercase tracking-[0.5em]">The message lifecycle through the protocol</p>
          </div>

          <div className="relative w-full max-w-6xl h-[60vh]">
            {/* Component Nodes */}
            {components.map((comp, idx) => (
              <motion.div 
                key={idx}
                className="absolute p-4 border border-cyan-500/30 bg-black/40 backdrop-blur-md rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.1)] flex items-center justify-center"
                style={{ left: comp.x, top: comp.y, transform: "translate(-50%, -50%)" }}
              >
                <span className="text-white font-mono text-xs md:text-sm uppercase tracking-widest font-bold">{comp.name}</span>
              </motion.div>
            ))}

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
               <path d="M 10% 50% Q 20% 50% 30% 30% T 50% 50% T 70% 30% T 90% 50% T 50% 80% Z" fill="transparent" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
            </svg>

            {/* DATA PACKET (The moving star) */}
            <motion.div 
              className="absolute w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_30px_#06b6d4] z-50 flex items-center justify-center"
              style={{ left: packetX, top: packetY, scale: packetScale, transform: "translate(-50%, -50%)" }}
            >
               <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </motion.div>

            {/* Stage-specific detail overlay */}
            <motion.div 
              className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl text-center"
              style={{ 
                opacity: useTransform(scrollYProgress, [0.5, 0.55, 0.95, 1.0], [0, 1, 1, 0])
              }}
            >
              <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
                {stepText}
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
