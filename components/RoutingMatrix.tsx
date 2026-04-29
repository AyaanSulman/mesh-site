"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Zap, Shield, HelpCircle } from "lucide-react";

interface ModeDetail {
  id: string;
  name: string;
  description: string;
  latency: "Low" | "Moderate" | "High";
  anonymity: "Low" | "Moderate" | "High";
  resilience: "Low" | "Moderate" | "High";
  bestFor: string;
  icon: any;
  latencyScore: number; // 1-5
  anonScore: number; // 1-5
  resScore: number; // 1-5
}

export default function RoutingMatrix() {
  const modes: ModeDetail[] = [
    {
      id: "direct",
      name: "Direct P2P",
      description: "Direct socket binding between two trusted peers. Optimized for performance where public exposure is not a threat.",
      latency: "Low",
      anonymity: "Low",
      resilience: "Low",
      bestFor: "Fast local network syncing & public non-sensitive chats.",
      icon: Zap,
      latencyScore: 5,
      anonScore: 1,
      resScore: 2,
    },
    {
      id: "multihop",
      name: "Multi-Hop",
      description: "Relays packets across secondary hops. Masks client IPs but does not encrypt node payload traversal.",
      latency: "Moderate",
      anonymity: "Moderate",
      resilience: "High",
      bestFor: "Reliable medium-privacy transmissions.",
      icon: Shuffle,
      latencyScore: 3,
      anonScore: 3,
      resScore: 4,
    },
    {
      id: "onion",
      name: "Onion Routing",
      description: "The gold standard. Encapsulates messages in multiple cryptographic layers peeled back only at specific destination hops.",
      latency: "High",
      anonymity: "High",
      resilience: "Moderate",
      bestFor: "Total defensive stealth across hostile networks.",
      icon: Shield,
      latencyScore: 2,
      anonScore: 5,
      resScore: 3,
    },
    {
      id: "dtn",
      name: "Delay-Tolerant",
      description: "Disruptive communication mode that caches messages in transit. Circumvents total localized firewall blackouts.",
      latency: "High",
      anonymity: "Moderate",
      resilience: "High",
      bestFor: "Highly unreliable, monitored nodes or network drops.",
      icon: HelpCircle,
      latencyScore: 1,
      anonScore: 3,
      resScore: 5,
    },
  ];

  const [activeMode, setActiveMode] = useState<ModeDetail>(modes[2]); // Default Onion

  const renderMetricBar = (score: number, label: string, color: string) => (
    <div className="space-y-1">
      <div className="flex justify-between font-mono text-xs text-slate-400">
        <span>{label}</span>
        <span className="text-cyan-400 font-bold">{score}/5</span>
      </div>
      <div className="h-2 w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color}`} 
          initial={{ width: 0 }}
          animate={{ width: `${(score / 5) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-950 text-slate-100 border-b border-slate-800 px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-16">
          <span className="font-mono text-cyan-400 uppercase tracking-widest text-sm font-bold block mb-2">
            Adaptive Secure Routing (ASR) Matrix
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-sans uppercase">
            Dynamically adjust anonymity depth
          </h2>
          <p className="text-slate-400 text-sm font-mono mt-2 max-w-xl mx-auto">
            Switch protocol execution paths in real-time depending on risk profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Mode selectors */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {modes.map((mode) => {
              const IconComp = mode.icon;
              const isActive = activeMode.id === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode)}
                  className={`p-5 rounded-xl border text-left flex items-center gap-4 transition-all duration-300 ${
                    isActive
                      ? "bg-slate-900/60 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)] text-white"
                      : "bg-slate-900/20 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className={`p-3 rounded-lg border transition-colors ${
                    isActive ? "bg-cyan-950/20 border-cyan-500/30 text-cyan-400" : "bg-slate-950 border-slate-800 text-slate-500"
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-sans font-bold block">{mode.name}</span>
                    <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                      latency: {mode.latency}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Mode Deep Dive */}
          <div className="lg:col-span-8 p-8 md:p-12 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,#0ea5e9,transparent_40%)]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-500/20 text-cyan-400">
                      <activeMode.icon className="w-8 h-8 animate-pulse" />
                    </div>
                    <h3 className="text-3xl font-bold text-white font-sans tracking-tight">
                      {activeMode.name}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-base leading-relaxed font-sans max-w-2xl">
                    {activeMode.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {renderMetricBar(activeMode.latencyScore, "Speed / Latency", "bg-cyan-500")}
                  {renderMetricBar(activeMode.anonScore, "Anonymity Tier", "bg-blue-500")}
                  {renderMetricBar(activeMode.resScore, "Network Resilience", "bg-indigo-500")}
                </div>

                <div className="border-t border-slate-800/80 pt-6 mt-4">
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="font-mono text-xs uppercase text-slate-400">
                      <span className="text-slate-500 mr-2">Use Case:</span> 
                      {activeMode.bestFor}
                    </div>
                    <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                      Routing Tag: ASR-{activeMode.id.toUpperCase()}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
