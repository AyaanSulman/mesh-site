"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Maximize, CheckCircle2, ShieldAlert } from "lucide-react";

export default function VisualWorkflow() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const phases = [
    {
      id: 1,
      title: "Phase 1: Peer Discovery & PoW",
      desc: "Client broadcasts node availability. Gateway issues a CPU-bound puzzle to drop botnets.",
    },
    {
      id: 2,
      title: "Phase 2: The Handshake Hardening",
      desc: "Initial RSA asymmetric keys map a secure bridge to execute an ephemeral ChaCha20 tunnel.",
    },
    {
      id: 3,
      title: "Phase 3: Onion Transmission",
      desc: "Packet fragmentation routed using multi-layer keys injected with constant dummy background streams.",
    },
    {
      id: 4,
      title: "Phase 4: Final Message Delivery",
      desc: "Edge server yields cryptographic hashes. User client renders fully decrypted payloads.",
    },
  ];

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Play request interrupted by pause call:", error);
          });
      } else {
        setIsPlaying(true);
      }
    }
  };

  const jumpToPhase = (phaseId: number) => {
    if (!videoRef.current) return;
    setCurrentPhase(phaseId);
    // Estimate timeline jump points for a standard video length (e.g. 60s total)
    const seekPoints = [0, 15, 30, 45];
    videoRef.current.currentTime = seekPoints[phaseId - 1];
    
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Play request interrupted:", error);
        });
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-950 text-slate-100 border-b border-slate-800 px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-16">
          <span className="font-mono text-cyan-400 uppercase tracking-widest text-sm font-bold block mb-2">
            Visual Workflow
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-sans uppercase">
            Protocol execution breakdown
          </h2>
          <p className="text-slate-400 font-sans mt-4 max-w-xl mx-auto text-sm">
            Watch how a single client communication string transforms across the distributed stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Video Player */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full aspect-video rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl group">
              <video
                ref={videoRef}
                src="https://ypt5xzkkzjpbi5sz.public.blob.vercel-storage.com/workflow-video.mp4"
                className="w-full h-full object-cover"
                preload="metadata"
                loop
                muted
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onCanPlay={() => {
                  setIsLoading(false);
                  setHasError(false);
                }}
                onWaiting={() => setIsLoading(true)}
                onLoadStart={() => {
                  setIsLoading(true);
                  setHasError(false);
                }}
                onError={(e) => {
                  setIsLoading(false);
                  setHasError(true);
                  console.error("Video element internal load exception:", e);
                }}
              />

              {/* Big Play Button (Bandwidth Saving) */}
              {!isPlaying && !hasError && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] z-20 group-hover:bg-slate-950/20 transition-all">
                  <button
                    onClick={handlePlayPause}
                    className="w-20 h-20 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:scale-110 transition-transform"
                  >
                    <Play className="w-10 h-10 fill-current" />
                  </button>
                </div>
              )}

              {/* Error State */}
              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Video Stream Failed</h3>
                  <p className="text-slate-400 text-xs max-w-xs mb-6">
                    Failed to connect to the video server. This may be due to high traffic or connection issues.
                  </p>
                </div>
              )}

              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
                  <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                </div>
              )}

              {/* Overlay Video Controls */}
              <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 backdrop-blur-sm p-4 border-t border-slate-800 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handlePlayPause}
                  className="p-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-slate-950 font-bold transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <div className="flex gap-2">
                  {phases.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => jumpToPhase(p.id)}
                      className={`px-3 py-1 text-[10px] font-mono font-bold rounded-md border ${
                        currentPhase === p.id
                          ? "bg-cyan-950 border-cyan-500 text-cyan-400"
                          : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      P{p.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Play Button Overlay when paused */}
              {!isPlaying && (
                <div 
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-transform duration-300 hover:scale-105">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Steps Tracker */}
          <div className="lg:col-span-5 space-y-4">
            {phases.map((phase) => {
              const isActive = currentPhase === phase.id;
              return (
                <motion.div
                  key={phase.id}
                  onClick={() => jumpToPhase(phase.id)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 flex gap-4 ${
                    isActive
                      ? "bg-slate-900 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                      : "bg-slate-900/20 border-slate-800/80 hover:border-slate-800"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className={`w-6 h-6 ${isActive ? "text-cyan-400" : "text-slate-700"}`} />
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h4 className={`text-base font-bold font-sans ${isActive ? "text-white" : "text-slate-300"}`}>
                        {phase.title}
                      </h4>
                    </div>
                    <p className={`text-sm mt-2 font-sans ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                      {phase.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
