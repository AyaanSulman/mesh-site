"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

const steps = [
  // Phase 1: Peer Discovery
  { id: 1, phase: "Phase 1: Peer Discovery", label: "Launch CLI/GUI", progress: [0, 0.05] },
  { id: 2, phase: "Phase 1: Peer Discovery", label: "Start DHT Listener + TCP Server", progress: [0.05, 0.1] },
  { id: 3, phase: "Phase 1: Peer Discovery", label: "Began LAN searching for peers", progress: [0.1, 0.15] },
  { id: 4, phase: "Phase 1: Peer Discovery", label: "Send probe to each LAN IP", progress: [0.15, 0.2] },
  { id: 5, phase: "Phase 1: Peer Discovery", label: "Identify peers & Start Handshake", progress: [0.2, 0.25] },
  { id: 6, phase: "Phase 1: Peer Discovery", label: "Generate session key & Receive PoW Challenge", progress: [0.25, 0.3] },
  
  // Phase 2: Message Composition
  { id: 7, phase: "Phase 2: Message Composition", label: "User types message", progress: [0.35, 0.4] },
  { id: 8, phase: "Phase 2: Message Composition", label: "Encrypt message (RSA/ChaCha20)", progress: [0.4, 0.45] },
  { id: 9, phase: "Phase 2: Message Composition", label: "Select routing mode (Onion)", progress: [0.45, 0.5] },
  
  // Phase 3: Onion Routing
  { id: 10, phase: "Phase 3: Onion Routing", label: "Wrap message in multi-layer encryption", progress: [0.55, 0.6] },
  { id: 11, phase: "Phase 3: Onion Routing", label: "Add Dummy Packets for Obfuscation", progress: [0.6, 0.65] },
  { id: 12, phase: "Phase 3: Onion Routing", label: "Send Message via TCP (Relay 1)", progress: [0.65, 0.7] },
  { id: 13, phase: "Phase 3: Onion Routing", label: "Decrypt Outer Layer & Forward", progress: [0.7, 0.75] },
  { id: 14, phase: "Phase 3: Onion Routing", label: "Relay 2: Peel Layer & Final Forward", progress: [0.75, 0.8] },
  
  // Phase 4: Final Node
  { id: 15, phase: "Phase 4: Final Node", label: "Arrival at Destination Node", progress: [0.85, 0.9] },
  { id: 16, phase: "Phase 4: Final Node", label: "Decrypt Final Layer", progress: [0.9, 0.95] },
  { id: 17, phase: "Phase 4: Final Node", label: "Display Message: 'FREE PALESTINE'", progress: [0.95, 1.0] },
];

function RubiksCube({ progress }: { progress: any }) {
  // Rotate the whole cube
  const rotateX = useTransform(progress, [0.25, 0.35], [45, 405]);
  const rotateY = useTransform(progress, [0.25, 0.35], [45, 765]);
  
  // Solve individual tiles (from random colors to cyan)
  const colors = ["#06b6d4", "#0891b2", "#155e75", "#22d3ee", "#67e8f9"];
  
  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-32 h-32"
    >
      {/* Front */}
      <CubeFace transform="translateZ(64px)" progress={progress} solvedColor="#06b6d4" />
      {/* Back */}
      <CubeFace transform="rotateY(180deg) translateZ(64px)" progress={progress} solvedColor="#0891b2" />
      {/* Right */}
      <CubeFace transform="rotateY(90deg) translateZ(64px)" progress={progress} solvedColor="#155e75" />
      {/* Left */}
      <CubeFace transform="rotateY(-90deg) translateZ(64px)" progress={progress} solvedColor="#22d3ee" />
      {/* Top */}
      <CubeFace transform="rotateX(90deg) translateZ(64px)" progress={progress} solvedColor="#06b6d4" />
      {/* Bottom */}
      <CubeFace transform="rotateX(-90deg) translateZ(64px)" progress={progress} solvedColor="#0891b2" />
    </motion.div>
  );
}

function CubeFace({ transform, progress, solvedColor }: { transform: string, progress: any, solvedColor: string }) {
  const isSolved = useTransform(progress, [0.25, 0.32, 0.35], [0, 0, 1]);
  
  return (
    <div 
      className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-1 bg-slate-900 border border-cyan-500/30"
      style={{ transform }}
    >
      {[...Array(9)].map((_, i) => (
        <CubeTile key={i} index={i} isSolved={isSolved} solvedColor={solvedColor} />
      ))}
    </div>
  );
}

function CubeTile({ index, isSolved, solvedColor }: { index: number, isSolved: any, solvedColor: string }) {
  const initialColor = ["#ef4444", "#eab308", "#22c55e", "#3b82f6", "#a855f7"][index % 5];
  const backgroundColor = useTransform(isSolved, [0, 1], [initialColor, solvedColor]);
  const opacity = useTransform(isSolved, [0, 0.5, 1], [0.4, 0.8, 1]);
  
  return (
    <motion.div 
      className="rounded-sm"
      style={{ backgroundColor, opacity }}
    />
  );
}

function StepLabel({ step, progress }: { step: any, progress: any }) {
  const opacity = useTransform(progress, [step.progress[0], step.progress[0] + 0.01, step.progress[1] - 0.01, step.progress[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [step.progress[0], step.progress[1]], [20, -20]);
  
  return (
    <motion.div 
      className="absolute whitespace-nowrap"
      style={{ opacity, y }}
    >
      <p className="text-xs uppercase tracking-[0.3em] opacity-40 mb-1">{step.phase}</p>
      <h3 className="text-2xl font-bold tracking-tighter">{step.label}</h3>
    </motion.div>
  );
}

export default function ProtocolLifecycle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [typedMessage, setTypedMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("ESTABLISHING HANDSHAKE...");
  const [isOnionVisible, setIsOnionVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const messageTransform = useTransform(smoothProgress, [0.35, 0.42], ["", "Transmission secure. Prepare protocol reveal."]);
  const statusTransform = useTransform(smoothProgress, [0.4, 0.45], ["ESTABLISHING HANDSHAKE...", "ENCRYPTION HARDENED"]);
  const onionVisibilityTransform = useTransform(smoothProgress, (p) => p >= 0.5 && p <= 0.9);

  useMotionValueEvent(messageTransform, "change", (latest) => {
    setTypedMessage(latest);
  });

  useMotionValueEvent(statusTransform, "change", (latest) => {
    setStatusMessage(latest);
  });

  useMotionValueEvent(onionVisibilityTransform, "change", (latest) => {
    setIsOnionVisible(latest);
  });

  // Laptop/Terminal Frame Animations
  const laptopScale = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.8, 1, 1, 1.2]);
  const laptopRotationX = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [20, 0, -5, 0, 10]);
  
  // HUD Elements
  const hudOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);
  
  // Phase Label
  const phaseLabelOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  
  // Phase 1: Probes
  const probeScale = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
  const probeOpacity = useTransform(smoothProgress, [0.1, 0.15, 0.2, 0.25], [0, 1, 1, 0]);

  // Phase 1: PoW Puzzle (Rubik's Cube)
  const puzzleOpacity = useTransform(smoothProgress, [0.25, 0.28, 0.32, 0.35], [0, 1, 1, 0]);
  const puzzleRotate = useTransform(smoothProgress, [0.25, 0.35], [0, 360]);

  // Phase 2: Typing
  const cursorOpacity = useTransform(smoothProgress, [0.35, 0.45], [1, 0]);
  
  // Phase 2: Encryption Lock
  const lockScale = useTransform(smoothProgress, [0.4, 0.45, 0.5], [0, 1.2, 1]);
  const lockColor = useTransform(smoothProgress, [0.4, 0.45], ["#22d3ee", "#ef4444"]); // Cyan to Red

  // Phase 3: Onion Layers
  const layer1Scale = useTransform(smoothProgress, [0.55, 0.6], [0, 1.2]);
  const layer2Scale = useTransform(smoothProgress, [0.57, 0.62], [0, 1.4]);
  const layer3Scale = useTransform(smoothProgress, [0.59, 0.64], [0, 1.6]);
  
  // Relay Jump Effect (Zoom terminal)
  const relayZoom = useTransform(smoothProgress, [0.65, 0.7, 0.75, 0.8, 0.85], [1, 1.5, 1, 1.5, 1]);
  const relayBlur = useTransform(smoothProgress, [0.65, 0.68, 0.7, 0.75, 0.78, 0.8, 0.85], [0, 10, 0, 0, 10, 0, 0]);
  
  // Phase 3: Dummy Packets
  const dummyOpacity = useTransform(smoothProgress, [0.6, 0.65, 0.85], [0, 1, 0]);

  // Phase 4: Final Message
  const finalMessageOpacity = useTransform(smoothProgress, [0.95, 1.0], [0, 1]);
  const finalMessageScale = useTransform(smoothProgress, [0.95, 1.0], [0.5, 1]);

  return (
    <div ref={containerRef} className="relative h-[4000vh] bg-[#020617]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* --- LARGE BACKGROUND SHIELD (From Screenshot) --- */}
        <motion.div 
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[60%] aspect-square opacity-10 pointer-events-none"
          style={{ 
            opacity: useTransform(smoothProgress, [0.4, 0.5, 0.9, 0.95], [0, 0.1, 0.1, 0])
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="0.5">
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
          </svg>
        </motion.div>

        {/* Phase Indicator (Top Left) */}
        <motion.div 
          style={{ opacity: phaseLabelOpacity }}
          className="absolute top-12 left-12 font-mono text-cyan-400 border-l-2 border-cyan-500/50 pl-6 z-50"
        >
          {/* --- PHASE 3 TITLE CARD (From Screenshot) --- */}
          <motion.div 
            className="mb-8 p-4 bg-cyan-400 text-black font-black text-4xl uppercase tracking-tighter"
            style={{ 
              opacity: useTransform(smoothProgress, [0.55, 0.6, 0.8, 0.85], [0, 1, 1, 0]),
              x: useTransform(smoothProgress, [0.55, 0.6], [-50, 0])
            }}
          >
            Phase 3: Onion Routing
          </motion.div>

          {steps.map((s, i) => (
            <StepLabel key={i} step={s} progress={smoothProgress} />
          ))}
        </motion.div>

        {/* --- MAIN CENTERPIECE: THE TERMINAL --- */}
        <motion.div
          style={{
            scale: useTransform([laptopScale, relayZoom], ([s, z]) => (s as number) * (z as number)),
            rotateX: laptopRotationX,
            filter: useTransform(relayBlur, (b) => `blur(${b}px)`),
            x: useTransform(smoothProgress, [0.65, 0.68, 0.7, 0.75, 0.78, 0.8], [0, 5, -5, 0, 5, 0]), // Subtle vibration during jump
            perspective: 1000,
<<<<<<< HEAD
            willChange: "transform, filter"
=======
>>>>>>> a07ce9936b1b5bbca92c207f0759e37c9840d39a
          }}
          className="relative w-full max-w-4xl aspect-[16/10] z-20"
        >
          {/* Laptop Base Frame */}
          <div className="absolute inset-0 bg-slate-950 border-[12px] border-slate-900 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.9),inset_0_0_80px_rgba(6,182,212,0.15)] overflow-hidden">
            
            {/* CRT Scanlines Overlay */}
            <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.03]" 
                 style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }} />
            
            {/* CRT Flicker & Glow */}
            <div className="absolute inset-0 pointer-events-none z-[100] bg-cyan-500/5 mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
            
            {/* Terminal HUD Micro-elements */}
            <div className="absolute inset-0 p-4 pointer-events-none z-[60] font-mono text-[10px] text-cyan-500/40 uppercase tracking-widest">
              <div className="absolute top-4 left-6 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                  <span>SECURE_CONNECTION: ESTABLISHED</span>
                </div>
                <div>NODE_ID: OB-X72-ALPHA</div>
              </div>
              <div className="absolute top-4 right-6 text-right">
                <div>BITRATE: 42.8 MB/S</div>
                <div>UPTIME: 00:04:12:88</div>
              </div>
              <div className="absolute bottom-4 left-6">
                <div>LATENCY: 12MS</div>
                <div>ENCRYPTION: RSA-4096 / CHACHA20</div>
              </div>
              <div className="absolute bottom-4 right-6 text-right">
                <div className="flex gap-2 justify-end mb-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="w-4 h-1 bg-cyan-500/20"
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <div>CORE_TEMP: 42°C</div>
              </div>
            </div>

            {/* Screen Content */}
            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center font-mono">
              
              {/* --- CENTERED LOGO (From Screenshot) --- */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                style={{ 
                  opacity: useTransform(smoothProgress, [0.35, 0.4, 0.85, 0.9], [0, 0.4, 0.4, 0])
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" className="opacity-50">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
                      <circle cx="12" cy="12" r="4" className="animate-pulse" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 border border-white/20 rounded-full animate-ping" />
                    </div>
                  </div>
                  <h4 className="text-white text-2xl font-bold tracking-[0.3em] [writing-mode:vertical-lr] rotate-180">ObscuraNet</h4>
                </div>
              </motion.div>
              
              {/* GUI Initial State */}
              <motion.div 
                className="absolute inset-0 bg-black flex flex-col items-center justify-center space-y-4"
                style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
              >
                <div className="w-16 h-16 border-2 border-cyan-500 rounded flex items-center justify-center animate-pulse">
                  <span className="text-cyan-400">ON</span>
                </div>
                <p className="text-cyan-400 text-xs tracking-widest uppercase">Initializing ObscuraNet...</p>
              </motion.div>

              {/* Phase 1: LAN Probes */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: probeOpacity, scale: probeScale }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Radar Sweep */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-cyan-500/10"
                    style={{ 
                      background: "conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.1) 100%)",
                      rotate: useTransform(smoothProgress, [0.1, 0.2], [0, 1080])
                    }}
                  />
                  
                  {/* Concentric Rings */}
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute border border-cyan-500/20 rounded-full"
                      style={{ width: `${(i + 1) * 200}px`, height: `${(i + 1) * 200}px` }}
                    />
                  ))}

                  {/* Detected Node Blips */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
                      initial={{ opacity: 0 }}
                      style={{ 
                        left: `${40 + (i * 10)}%`, 
                        top: `${30 + (i * 15)}%`,
                        opacity: useTransform(smoothProgress, [0.1 + (i * 0.01), 0.12 + (i * 0.01)], [0, 1])
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 3], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <p className="absolute left-4 top-0 text-[8px] whitespace-nowrap text-cyan-400 font-mono">
                        NODE_{100 + i}: DETECTED
                      </p>
                    </motion.div>
                  ))}

                  <div className="z-10 bg-slate-900/80 backdrop-blur-md p-6 rounded-lg border border-cyan-500/40 text-center shadow-2xl">
                    <p className="text-cyan-400 text-xs mb-1 tracking-[0.4em]">PROBING_LAN</p>
                    <div className="flex gap-1 justify-center mb-2">
                       {typedMessage.slice(0, 5).split("").map((char, i) => (
                         <div key={i} className="w-1 h-3 bg-cyan-500/40" />
                       ))}
                    </div>
                    <p className="text-white text-[10px] font-mono">BROADCASTING UDP @ 255.255.255.255</p>
                  </div>
                </div>
              </motion.div>

              {/* Phase 1: PoW Challenge */}
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center space-y-12"
                style={{ opacity: puzzleOpacity, perspective: 1000 }}
              >
                <RubiksCube progress={smoothProgress} />
                <div className="text-center">
                  <p className="text-cyan-400 text-xs tracking-[0.3em] mb-2">POW_ENGINE: ACTIVE</p>
                  <motion.p 
                    className="text-white text-xl font-bold tracking-tighter"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    SOLVING CRYPTOGRAPHIC GATE...
                  </motion.p>
                  <div className="mt-4 w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyan-500"
                      style={{ width: useTransform(smoothProgress, [0.25, 0.35], ["0%", "100%"]) }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Phase 2: Typing Message */}
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-12"
                style={{ opacity: useTransform(smoothProgress, [0.35, 0.4, 0.5, 0.55], [0, 1, 1, 0]) }}
              >
                  <div className="relative">
                    <div className="w-full max-w-lg bg-black/60 backdrop-blur-xl border border-white/20 p-8 rounded-xl font-mono relative shadow-2xl overflow-hidden">
                       {/* Glitch Overlay */}
                       <motion.div 
                         className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay"
                         animate={{ opacity: [0, 0.2, 0] }}
                         transition={{ duration: 0.2, repeat: Infinity }}
                       />
                       
                       <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                         <div className="w-3 h-3 rounded-full bg-red-500/50" />
                         <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                         <div className="w-3 h-3 rounded-full bg-green-500/50" />
                         <span className="text-[10px] text-white/40 ml-2">secure_composer.sh</span>
                       </div>

                       <motion.p className="text-white text-xl inline leading-relaxed">
                         {typedMessage}
                       </motion.p>
                       <motion.span 
                         style={{ opacity: cursorOpacity }}
                         className="inline-block w-2 h-6 bg-cyan-400 ml-1 align-middle"
                       />
                    </div>

                    {/* --- SPEECH BUBBLE (From Screenshot) --- */}
                    <motion.div 
                      className="absolute -top-20 -right-12 bg-cyan-400 text-black px-4 py-2 rounded-2xl rounded-bl-none font-bold text-2xl flex gap-1 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                      style={{ 
                        opacity: useTransform(smoothProgress, [0.35, 0.38, 0.45, 0.48], [0, 1, 1, 0])
                      }}
                    >
                      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>.</motion.span>
                      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}>.</motion.span>
                      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}>.</motion.span>
                    </motion.div>
                  </div>
                 
                  <motion.div 
                  className="mt-8 flex flex-col items-center gap-12"
                  style={{ opacity: useTransform(smoothProgress, [0.4, 0.45], [0, 1]) }}
                 >
                    {/* --- LARGE ROUTING ICONS (From Screenshot) --- */}
                    <div className="flex gap-8">
                      {[
                        { name: "P2P", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
                        { name: "MULTI", icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" },
                        { name: "DTN", icon: "M12 8v4l3 3M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" },
                        { name: "ONION", icon: "M12 2l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9z" }
                      ].map(mode => (
                        <div key={mode.name} className="flex flex-col items-center gap-3">
                          <div className={`w-20 h-20 rounded-3xl border-4 flex items-center justify-center transition-all ${mode.name === 'ONION' ? 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_30px_rgba(6,182,212,0.5)]' : 'border-white/10 bg-white/5'}`}>
                            <svg className={`w-10 h-10 ${mode.name === 'ONION' ? 'text-cyan-400' : 'text-white/20'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d={mode.icon} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className={`text-xs font-black tracking-[0.2em] ${mode.name === 'ONION' ? 'text-cyan-400' : 'text-white/20'}`}>{mode.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-cyan-500/20 px-12 py-6 border-4 border-cyan-400/40 relative overflow-hidden">
                       <motion.div 
                        className="absolute inset-0 bg-cyan-400/10"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                       />
                       <span className="text-2xl text-cyan-400 font-black uppercase tracking-[0.3em] relative z-10">
                        Select routing mode
                       </span>
                    </div>
                 </motion.div>
              </motion.div>

              {/* Phase 3: Onion Layering */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  opacity: useTransform(smoothProgress, [0.55, 0.85], [1, 1]), 
                  display: isOnionVisible ? "flex" : "none" 
                }}
              >
                <motion.div className="relative flex items-center justify-center">
                   {/* The Locked Core */}
                   <motion.div 
                    style={{ 
                      scale: lockScale, 
                      borderColor: lockColor, 
                      color: lockColor,
                      boxShadow: useTransform(lockColor, c => `0 0 40px ${c}44`)
                    }}
                    className="w-24 h-24 border-4 rounded-full flex items-center justify-center bg-black z-30 relative"
                   >
                     <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 11V15M8 11V15M16 11V15M5 11V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V11M5 11H19M5 11V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V11" strokeLinecap="round" />
                     </svg>
                     {/* Pulse Shield */}
                     <motion.div 
                      className="absolute inset-[-8px] border border-white/20 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                     />
                   </motion.div>
                   
                   {/* Onion Rings */}
                    {[layer1Scale, layer2Scale, layer3Scale].map((scale, i) => (
                     <motion.div 
                      key={i}
                      style={{ 
                        scale: useTransform(smoothProgress, [0.55 + i*0.02, 0.65 + i*0.02, 0.7 + i*0.05, 0.8 + i*0.05], [0, 1, 1, 3]),
                        opacity: useTransform(smoothProgress, [0.55 + i*0.02, 0.6 + i*0.02, 0.7 + i*0.05, 0.8 + i*0.05], [0, 1, 1, 0]),
                        rotate: useTransform(smoothProgress, [0.5, 1], [0, (i % 2 === 0 ? 360 : -360)]),
                        width: 140 + i * 80, 
                        height: 140 + i * 80,
                        borderStyle: i === 1 ? 'dashed' : 'solid'
                      }} 
                      className="absolute rounded-full border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                     />
                   ))}
                   
                   {/* Dummy Packets */}
                   <motion.div 
                    style={{ opacity: dummyOpacity }}
                    className="absolute inset-0 w-[600px] h-[600px] pointer-events-none"
                   >
                      {isClient && [...Array(16)].map((_, i) => {
                        const packetText = ["0xDEADBEEF", "ENCRYPT_V2", "AUTH_TOKEN", "DUMMY_DATA", "NOISE_GEN"][i % 5];
                        const xStart = (i * 37) % 400 - 200;
                        const yStart = (i * 73) % 400 - 200;
                        const xEnd = (i * 59) % 600 - 300;
                        const yEnd = (i * 97) % 600 - 300;
                        
                        return (
                          <motion.div 
                            key={i}
                            className="absolute text-[8px] font-mono text-cyan-500/30 border border-cyan-500/10 px-2 py-0.5 bg-black/40"
                            initial={{ x: xStart, y: yStart }}
                            animate={{ 
                              x: [xStart, xEnd], 
                              y: [yStart, yEnd],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                          >{packetText}</motion.div>
                        );
                      })}
                   </motion.div>
                </motion.div>
              </motion.div>

              {/* Phase 4: Final Node Reveal */}
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center space-y-8"
                style={{ opacity: finalMessageOpacity }}
              >
                {/* Bloom Flash */}
                <motion.div 
                  className="absolute inset-0 bg-white z-[110] pointer-events-none"
                  style={{ 
                    opacity: useTransform(smoothProgress, [0.95, 0.97, 1.0], [0, 1, 0])
                  }}
                />

                <motion.div 
                  style={{ scale: finalMessageScale }}
                  className="relative group"
                >
                  {/* Glowing Background */}
                  <div className="absolute -inset-10 bg-white opacity-20 blur-[100px] rounded-full animate-pulse" />
                  
                  <div className="relative bg-white px-16 py-12 rounded-2xl shadow-[0_0_100px_rgba(255,255,255,0.6)] overflow-hidden">
                    {/* Glitch Bars */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute h-[1px] bg-black/10 w-full"
                        style={{ top: `${20 + i * 20}%` }}
                        animate={{ x: [-100, 100], opacity: [0, 1, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity, delay: i * 0.05 }}
                      />
                    ))}
                    
                    <h2 className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-none text-center">
                      FREE<br/>PALESTINE
                    </h2>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center gap-2"
                  style={{ opacity: useTransform(smoothProgress, [0.98, 1.0], [0, 1]) }}
                >
                  <div className="flex gap-4 items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-white font-mono text-xs uppercase tracking-[0.5em]">DECRYPTION_SUCCESSFUL // END_TO_END_VERIFIED</p>
                  </div>
                  <p className="text-cyan-400 font-mono text-[10px] opacity-40">DESTINATION: 0x71...F2E9 | HOP_COUNT: 12</p>
                </motion.div>
              </motion.div>

            </div>

            {/* Screen Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Laptop Lid Edge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-4 bg-slate-700 rounded-b-xl" />
        </motion.div>

        {/* --- ORBITING PEERS (Decorative) --- */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
           {[...Array(8)].map((_, i) => {
              const startX = (i % 2 === 0 ? -1 : 1) * 45;
              const startY = (i < 4 ? -1 : 1) * 35;
              const delay = i * 0.1;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-28 h-28 border border-cyan-500/20 rounded-lg flex flex-col items-center justify-center bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                  style={{
                    left: `${50 + startX}%`,
                    top: `${50 + startY}%`,
                    opacity: useTransform(smoothProgress, [0.1, 0.2, 0.85, 0.9], [0, 1, 1, 0]),
                    scale: useTransform(smoothProgress, [0.1, 0.2], [0.5, 1]),
                    x: useTransform(smoothProgress, [0.6, 0.7, 0.75, 0.85], [0, (i % 2 === 0 ? -800 : 800), (i % 2 === 0 ? -1200 : 1200), (i % 2 === 0 ? -2000 : 2000)]),
                    y: useTransform(smoothProgress, [0.6, 0.85], [0, (i < 4 ? -500 : 500)]),
<<<<<<< HEAD
                    willChange: "transform, opacity"
=======
>>>>>>> a07ce9936b1b5bbca92c207f0759e37c9840d39a
                  }}
                >
                   <div className="w-8 h-8 mb-2 border border-cyan-500/30 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-cyan-500/20 rounded-sm animate-pulse" />
                   </div>
                   <div className="text-[7px] font-mono text-cyan-400/60 leading-tight text-center">
                      PEER_{1024 + i}<br/>
                      <span className="opacity-40">192.168.1.{10 + i}</span><br/>
                      <span className="text-green-500/60">ACTIVE</span>
                   </div>
                </motion.div>
              );
           })}
        </div>

        {/* Progress Bar (Bottom) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
           <motion.div 
            className="h-full bg-cyan-400"
            style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
           />
        </div>
      </div>
    </div>
  );
}
