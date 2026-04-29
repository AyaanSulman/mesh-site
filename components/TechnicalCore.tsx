"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Lock, Workflow } from "lucide-react";

export default function TechnicalCore() {
  const sections = [
    {
      title: "The Cryptographic Stack",
      subtitle: "Asymmetric to Symmetric Transition",
      description:
        "The handshake leverages RSA-4096 for identity attestation, which subsequently switches to ephemeral X25519 Elliptic Curve Diffie-Hellman keys. Payload encryption is then locked down using symmetric ChaCha20-Poly1305 streams.",
      icon: <Lock className="w-8 h-8 text-cyan-400" />,
      features: [
        "RSA-4096 Identity Binding",
        "X25519 Ephemeral Key Exchange",
        "ChaCha20-Poly1305 Fast Stream Encryption",
        "Zero-Trust key lifespan",
      ],
    },
    {
      title: "Network Hardening",
      subtitle: "Anti-Sybil & Anti-DDoS",
      description:
        "To mitigate distributed spam and Sybil node spamming, the gateway forces peers to resolve a customizable CPU-bound Proof-of-Work (PoW) puzzle before granting access to network resources.",
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      features: [
        "Dynamic puzzle difficulty adjustments",
        "Pre-routing resource gatekeeping",
        "Protection against computational exhaustion",
        "Threshold verification on client limits",
      ],
    },
    {
      title: "Local Privacy (State Caching)",
      subtitle: "Fernet-Secured Local Storage",
      description:
        "All data resting on user clients (session variables, keymaps, cached peers) is wrapped in AES-128 Fernet encryption keys tied securely to local device keychains.",
      icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
      features: [
        "OS Keychain credential integration",
        "Instant RAM data zeroization",
        "Automated cache expiry parameters",
        "Cryptographically sealed cache logs",
      ],
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-950 text-slate-100 overflow-hidden border-b border-slate-800 px-6 py-24 md:py-32">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Workflow className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-cyan-400 uppercase tracking-widest text-sm font-bold">
              Technical Core & Security
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans uppercase"
          >
            The &quot;How&quot; of multi-layer anonymity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 font-sans mt-4 max-w-2xl mx-auto"
          >
            A deep-dive overview of the underlying security logic making surveillance structurally impossible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="p-8 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col justify-between group hover:border-cyan-500/40 hover:bg-slate-900/50 transition-all duration-300"
            >
              <div>
                <div className="p-4 w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-8 group-hover:border-cyan-500/30 group-hover:bg-cyan-950/10 transition-all duration-300">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-white font-sans tracking-tight mb-2">
                  {section.title}
                </h3>
                <span className="font-mono text-cyan-400 text-xs uppercase font-bold tracking-wider block mb-4">
                  {section.subtitle}
                </span>
                <p className="text-slate-400 text-sm font-sans leading-relaxed mb-6">
                  {section.description}
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-6 mt-auto">
                <ul className="space-y-3">
                  {section.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80 flex-shrink-0" />
                      <span className="text-xs font-mono text-slate-300 uppercase tracking-wide">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
