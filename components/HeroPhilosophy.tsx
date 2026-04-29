"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldAlert, Globe, Database, ServerCrash } from "lucide-react";

export default function HeroPhilosophy() {
  const stats = [
    {
      id: 1,
      title: "Privacy Crisis",
      value: "87%",
      desc: "of internet users feel their personal data is harvested without consent.",
      icon: <ShieldAlert className="w-6 h-6 text-cyan-400" />,
    },
    {
      id: 2,
      title: "Metadata Leaks",
      value: "99.9%",
      desc: "of legacy messaging apps leave communication metadata completely unencrypted.",
      icon: <Database className="w-6 h-6 text-cyan-400" />,
    },
    {
      id: 3,
      title: "Mass Censorship",
      value: "4.2B",
      desc: "people live under oppressive firewalls that restrict standard web access.",
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden border-b border-slate-800 px-6 pt-12 pb-24 md:pb-32">
      {/* Background visual accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left: The Why - Hero content */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-900/50 backdrop-blur shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Image
                src="/logo.png"
                alt="MESH Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="h-0.5 w-12 bg-cyan-500/50 rounded" />
            <span className="font-mono text-cyan-400 uppercase tracking-widest text-sm font-bold">
              Protocol v1.0
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 font-sans"
          >
            MESH (formerly ObscuraNet): The End of Digital Surveillance.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl font-mono leading-relaxed"
          >
            A modular, decentralized messaging protocol built on the principle of total anonymity through multi-layer encryption and traffic obfuscation.
          </motion.p>

          {/* The Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex gap-4 items-start">
              <ServerCrash className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-cyan-400 font-sans mb-2">
                  The Mission
                </h3>
                <p className="text-slate-300 font-sans leading-relaxed">
                  Transitioning from centralized vulnerabilities to a decentralized mesh network. By dismantling the reliance on centralized corporate authorities, MESH ensures that your right to private expression is mathematically secure and naturally resilient.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: The Problem - Stats Scroller/Cards */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center md:text-left mb-6"
          >
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">
              THE PROBLEM
            </h3>
            <h2 className="text-2xl font-bold text-white font-sans">
              Why Legacy Architectures Fail
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-sm flex items-center gap-6 hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 group-hover:bg-cyan-950/20 group-hover:border-cyan-500/30 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-mono">
                      {stat.value}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                      {stat.title}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-sans mt-1">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
