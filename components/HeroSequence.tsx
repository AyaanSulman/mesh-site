"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    ["0vw", "25vw", "0vw"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0.6, 0.8],
<<<<<<< HEAD
    [1, 150]
=======
    [1, 30]
  );

  const imageOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.8],
    [1, 0]
>>>>>>> a07ce9936b1b5bbca92c207f0759e37c9840d39a
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6],
    [1, 1, 0]
  );

  const cyanOpacity = useTransform(
    scrollYProgress,
    [0.9, 1.0],
    [0, 0]
  );

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Text Block */}
        <motion.div
          className="absolute flex flex-col items-start gap-4 text-white z-10 max-w-2xl"
          style={{
            opacity: textOpacity,
            x: "-20vw",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-cyan-400 font-mono">
            OBSCURANET
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-white/90">
            Secure. Private. Decentralized.
          </h2>
          <p className="text-white/70 leading-relaxed max-w-xl mt-2 mb-4">
            A modular, decentralized messaging protocol for secure, private peer-to-peer communication. Designed to eliminate single points of failure and resist censorship and surveillance.
          </p>
          <div className="font-mono text-lg flex flex-col gap-2 opacity-80 border-l-2 border-cyan-500/50 pl-4">
            <p>
              Privacy Crisis <span className="text-cyan-400">87%</span>
            </p>
            <p>
              Metadata Leaks <span className="text-cyan-400">99.9%</span>
            </p>
            <p>
              Censorship <span className="text-cyan-400">4.2B</span>
            </p>
          </div>
          
          <motion.div 
            className="mt-8 flex flex-col items-center gap-2 opacity-40"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase">Scroll to begin</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Logo Placeholder */}
        <motion.div
          className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] z-20 flex items-center justify-center border-4 border-cyan-500 rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.3)] bg-black/50 backdrop-blur-sm"
          style={{
            x: imageX,
            scale: imageScale,
<<<<<<< HEAD
            willChange: "transform",
=======
            opacity: imageOpacity,
>>>>>>> a07ce9936b1b5bbca92c207f0759e37c9840d39a
          }}
        >
          <span className="font-mono text-cyan-400 text-xl tracking-widest animate-pulse">
            [ LOGO ]
          </span>
        </motion.div>

        {/* Cyan Overlay (Removed/Disabled) */}
        <motion.div
          className="absolute inset-0 z-50 bg-[#00FFFF] pointer-events-none"
          style={{ opacity: cyanOpacity }}
        />
      </div>
    </div>
  );
}
