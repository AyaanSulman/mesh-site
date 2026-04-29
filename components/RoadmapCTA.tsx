"use client";

import { motion } from "framer-motion";
import { Github, FileText, Download, Code, ArrowRight } from "lucide-react";

export default function RoadmapCTA() {
  const futureTech = [
    {
      title: "DHT Kademlia Mapping",
      desc: "Upgrading node discovery from federated gateways to complete peer distributed hash rings.",
    },
    {
      title: "NAT Traversal Engine",
      desc: "Punching secure hole boundaries through multi-ISP symmetric routers without relay reliance.",
    },
    {
      title: "AI Threat Mitigation",
      desc: "Localized ML models monitoring node packet signatures for state manipulation.",
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-950 text-slate-100 px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Roadmap */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="font-mono text-cyan-400 uppercase tracking-widest text-sm font-bold block mb-2">
              Roadmap & Contribution
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-sans uppercase">
              The Protocol Horizon
            </h2>
            <p className="text-slate-400 font-sans mt-4">
              Where MESH transitions next in building absolute infrastructure resilience.
            </p>
          </div>

          <div className="space-y-6">
            {futureTech.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-slate-900 bg-slate-900/20 backdrop-blur-sm hover:border-slate-800 transition-colors"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-bold">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white font-sans text-lg">{tech.title}</h4>
                  <p className="text-sm text-slate-400 mt-1 font-sans">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: CTA Portal */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md relative overflow-hidden flex flex-col items-center text-center group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <Code className="w-12 h-12 text-cyan-400 mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold text-white font-sans uppercase mb-2">
              Deploy MESH
            </h3>
            <p className="text-slate-400 font-sans text-sm max-w-sm mb-8">
              Open-source, decentralized core architecture. Contribute your compute or integrate the client layer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
              <a
                href="https://github.com/example/mesh"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/40 text-slate-200 transition-all font-mono text-sm uppercase tracking-wider group"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                GitHub Repo
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href="/docs"
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/40 text-slate-200 transition-all font-mono text-sm uppercase tracking-wider group"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                Read Docs
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 w-full max-w-md">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mb-4">
                Available Downloads
              </span>
              <div className="flex justify-center gap-6 text-slate-400 font-sans text-sm">
                <a href="#" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Download className="w-4 h-4" />
                  PyQt6 GUI
                </a>
                <span className="text-slate-800">|</span>
                <a href="#" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Download className="w-4 h-4" />
                  CLI Client
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
