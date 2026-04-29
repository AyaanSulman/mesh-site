"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function ExplodingDot({
  progress,
  index,
  opacity,
}: {
  progress: MotionValue<number>;
  index: number;
  opacity: MotionValue<number>;
}) {
  const angle = (index / 40) * Math.PI * 2;
  const maxDistance = 150 + ((index * 47) % 300);

  const x = useTransform(progress, [0, 1], [0, Math.cos(angle) * maxDistance]);
  const y = useTransform(progress, [0, 1], [0, Math.sin(angle) * maxDistance]);

  return (
    <motion.div
      className="absolute w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
      style={{ x, y, opacity, willChange: "transform" }}
    />
  );
}

export default function ProtocolStage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Visual Animations ---
  const radarScale = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const radarOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]);

  const nodesOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const nodesColor = useTransform(scrollYProgress, [0, 0.2], ["#333333", "#06b6d4"]);

  const nodePositions = [
    { top: "20%", left: "30%" }, { top: "70%", left: "20%" },
    { top: "40%", left: "80%" }, { top: "80%", left: "70%" },
    { top: "10%", left: "60%" }, { top: "50%", left: "10%" },
  ];

  const centerCircleOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const ringsScaleDown = useTransform(scrollYProgress, [0.2, 0.6], [3, 1]);
  const ringsOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);

  const explodeProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const explodeOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0]);

  const circlesX = useTransform(scrollYProgress, [0.6, 1.0], ["0vw", "30vw"]);
  const layersScaleUp = useTransform(scrollYProgress, [0.6, 1.0], [1, 20]);
  const layersOpacityOut = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  const terminalOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const terminalX = useTransform(scrollYProgress, [0.6, 0.8], ["5vw", "0vw"]);

  // --- Text Animations (Core Features) ---
  const feat1Opacity = useTransform(scrollYProgress, [0.05, 0.1, 0.18, 0.2], [0, 1, 1, 0]);
  const feat2Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const feat3Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.6, 0.65], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black">
        
        {/* Core Features Texts */}
        <motion.div className="absolute top-[15%] left-[5%] md:left-[10%] max-w-sm z-40 font-mono" style={{ opacity: feat1Opacity }}>
          <h3 className="text-2xl text-cyan-400 font-bold mb-2">Peer Discovery & PoW</h3>
          <ul className="text-white/70 space-y-2 text-sm">
            <li className="border-l border-cyan-500/50 pl-2">LAN-based discovery without central servers</li>
            <li className="border-l border-cyan-500/50 pl-2">Proof-of-Work Handshake prevents spam & Sybil attacks</li>
          </ul>
        </motion.div>

        <motion.div className="absolute top-[15%] right-[5%] md:right-[10%] max-w-sm z-40 font-mono text-right" style={{ opacity: feat2Opacity }}>
          <h3 className="text-2xl text-purple-400 font-bold mb-2">Traffic Obfuscation</h3>
          <ul className="text-white/70 space-y-2 text-sm flex flex-col items-end">
            <li className="border-r border-purple-500/50 pr-2">Dummy traffic generation prevents analysis</li>
            <li className="border-r border-purple-500/50 pr-2">Adaptive routing dynamically switches modes (P2P, DTN, Multi-hop)</li>
          </ul>
        </motion.div>

        <motion.div className="absolute bottom-[15%] left-[5%] md:left-[10%] max-w-sm z-40 font-mono" style={{ opacity: feat3Opacity }}>
          <h3 className="text-2xl text-red-400 font-bold mb-2">Onion Routing & Encryption</h3>
          <ul className="text-white/70 space-y-2 text-sm">
            <li className="border-l border-red-500/50 pl-2">Multi-hop layered encryption hides sender identity</li>
            <li className="border-l border-red-500/50 pl-2">ChaCha20 + X25519 with Forward Secrecy</li>
          </ul>
        </motion.div>

        {/* Part 1: Radar Rings */}
        <motion.div
          className="absolute border border-cyan-500 rounded-full w-[40vw] h-[40vw]"
          style={{ scale: radarScale, opacity: radarOpacity, willChange: "transform" }}
        />
        <motion.div
          className="absolute border border-cyan-500 rounded-full w-[20vw] h-[20vw]"
          style={{ scale: radarScale, opacity: radarOpacity, willChange: "transform" }}
        />

        {/* Part 1: 6 Scattered 'node' dots */}
        {nodePositions.map((pos, i) => (
          <div key={i} className="absolute w-4 h-4" style={{ top: pos.top, left: pos.left }}>
            <motion.div
              className="w-full h-full rounded-full"
              style={{ opacity: nodesOpacity, backgroundColor: nodesColor, willChange: "transform" }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
          </div>
        ))}

        {/* Part 2, 3 & 4 Container */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{ x: circlesX, willChange: "transform" }}
        >
          {/* 40 Exploding Dots */}
          {Array.from({ length: 40 }).map((_, i) => (
            <ExplodingDot key={`dot-${i}`} index={i} progress={explodeProgress} opacity={explodeOpacity} />
          ))}

          {/* Central grouping that scales out and fades later */}
          <motion.div
            className="flex items-center justify-center"
            style={{ scale: layersScaleUp, opacity: layersOpacityOut, willChange: "transform" }}
          >
            {/* The 3 Concentric Rings */}
            <motion.div
              className="absolute rounded-full border border-red-500 w-[400px] h-[400px]"
              style={{ scale: ringsScaleDown, opacity: ringsOpacity, willChange: "transform" }}
            />
            <motion.div
              className="absolute rounded-full border border-purple-500 w-[300px] h-[300px]"
              style={{ scale: ringsScaleDown, opacity: ringsOpacity, willChange: "transform" }}
            />
            <motion.div
              className="absolute rounded-full border border-cyan-500 w-[200px] h-[200px]"
              style={{ scale: ringsScaleDown, opacity: ringsOpacity, willChange: "transform" }}
            />

            {/* White Central Circle */}
            <motion.div
              className="w-16 h-16 bg-white rounded-full z-10 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              style={{ opacity: centerCircleOpacity }}
            />
          </motion.div>
        </motion.div>

        {/* Part 4: Terminal UI Box */}
        <motion.div
          className="absolute right-[5vw] md:right-[10vw] border border-cyan-500/50 bg-black/80 backdrop-blur-md p-6 font-mono text-cyan-400 w-96 z-50 rounded-md shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          style={{ opacity: terminalOpacity, x: terminalX, willChange: "transform" }}
        >
          <div className="flex items-center gap-2 mb-4 border-b border-cyan-500/30 pb-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-cyan-500/70 ml-2">obscura_terminal.sh</span>
          </div>
          <p className="leading-relaxed">
            {`> Package successfully decrypted at exit node. Connection Secure.`}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
