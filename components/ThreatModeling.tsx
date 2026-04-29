"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Fingerprint, KeyRound, Check } from "lucide-react";

export default function ThreatModeling() {
  const threats = [
    {
      id: "traffic",
      attack: "Traffic Analysis",
      vector: "Adversaries monitoring network throughput looking for timing correlations.",
      mitigation: "Dummy Packet Injection",
      solution: "MESH pumps constant, uniform fake noise streams across active relay interfaces, ensuring payload data is mathematically indistinguishable from background filler.",
      icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
    },
    {
      id: "metadata",
      attack: "Metadata Harvesting",
      vector: "Compiling node relationships to build an identity hierarchy map.",
      mitigation: "Randomized Onion Paths",
      solution: "Hop sequencing is completely state-independent. No singular node holds insight into both client source identity and delivery endcap logic.",
      icon: <Fingerprint className="w-6 h-6 text-red-400" />,
    },
    {
      id: "bruteforce",
      attack: "Brute Force / Interception",
      vector: "Capturing protocol packets on long timeline clusters for decryption.",
      mitigation: "Ephemeral Key Rotation",
      solution: "Handshake credentials drop cleanly upon session validation timeouts. Even historical leaks yield absolutely zero decryption access.",
      icon: <KeyRound className="w-6 h-6 text-red-400" />,
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-950 text-slate-100 border-b border-slate-800 px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <span className="font-mono text-red-500 uppercase tracking-widest text-sm font-bold block mb-2">
            Resilience & Threat Modeling
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-sans uppercase">
            Stress-testing the architecture
          </h2>
          <p className="text-slate-400 font-sans mt-4 max-w-xl mx-auto text-sm">
            Evaluating multi-threat execution metrics against sophisticated cryptographic adversaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {threats.map((threat, idx) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl border border-slate-800/80 bg-slate-900/10 backdrop-blur-sm relative group hover:border-red-500/30 transition-colors duration-300"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 p-3 bg-slate-950 border border-slate-800 rounded-xl">
                {threat.icon}
              </div>

              <div className="space-y-4">
                <span className="font-mono text-red-400 font-bold text-xs uppercase tracking-wider block">
                  Threat Class #{idx + 1}
                </span>
                <h3 className="text-2xl font-bold text-white font-sans">
                  {threat.attack}
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed border-b border-slate-800/50 pb-4">
                  <strong className="text-slate-300 font-mono text-[10px] uppercase block mb-1">Vector:</strong> 
                  {threat.vector}
                </p>

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="font-sans font-bold text-green-400 text-sm">
                      {threat.mitigation}
                    </span>
                  </div>
                  <p className="text-slate-300 font-sans text-sm leading-relaxed">
                    {threat.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
