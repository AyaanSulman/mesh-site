export default function TechnicalDeepDive() {
  return (
    <section className="bg-black text-white py-24 px-6 font-mono relative z-10 border-t border-white/10">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* Literature Review & Motivation */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl text-cyan-400 font-bold mb-6 tracking-wide">LITERATURE REVIEW</h2>
            <div className="space-y-6 text-white/70">
              <div>
                <h3 className="text-xl text-white font-semibold mb-2">Tor</h3>
                <p>Vulnerable to exit node surveillance and traffic correlation attacks.</p>
              </div>
              <div>
                <h3 className="text-xl text-white font-semibold mb-2">Signal</h3>
                <p>Centralized architecture. Susceptible to outages and government data requests.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
            <h2 className="text-2xl text-cyan-400 font-bold mb-4">Our Innovation: ObscuraNet</h2>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>Fully decentralized</li>
              <li>No central dependency</li>
              <li>Adaptive routing strategies</li>
            </ul>
          </div>
        </div>

        {/* Security & Threat Model */}
        <div>
          <h2 className="text-3xl text-red-400 font-bold mb-8 tracking-wide">SECURITY & THREAT MODEL</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-white/10">
              <thead className="bg-white/5 text-white/90">
                <tr>
                  <th className="p-4 border-b border-white/10">Threat</th>
                  <th className="p-4 border-b border-white/10">Example Attack</th>
                  <th className="p-4 border-b border-white/10">Defense</th>
                </tr>
              </thead>
              <tbody className="text-white/70 divide-y divide-white/10">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">Traffic Analysis</td>
                  <td className="p-4">Packet timing correlation</td>
                  <td className="p-4 text-cyan-400">Dummy traffic</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">Sybil Attack</td>
                  <td className="p-4">Fake peers flooding</td>
                  <td className="p-4 text-cyan-400">Proof-of-Work</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">Metadata Leakage</td>
                  <td className="p-4">IP exposure</td>
                  <td className="p-4 text-cyan-400">Onion routing</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">Relay Node Compromise</td>
                  <td className="p-4">Logging nodes</td>
                  <td className="p-4 text-cyan-400">Limited route visibility</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">DoS / Replay</td>
                  <td className="p-4">Message reuse</td>
                  <td className="p-4 text-cyan-400">Session caching</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">Key Theft</td>
                  <td className="p-4">Compromised keys</td>
                  <td className="p-4 text-cyan-400">Ephemeral ECDH</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">Side-channel UI</td>
                  <td className="p-4">Metadata leaks</td>
                  <td className="p-4 text-cyan-400">Encrypted sessions, disabled logs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Routing Comparison */}
        <div>
          <h2 className="text-3xl text-purple-400 font-bold mb-8 tracking-wide">ROUTING COMPARISON</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { mode: "P2P", lat: "Low", anon: "Low", res: "Low" },
              { mode: "DTN", lat: "High", anon: "Low", res: "High" },
              { mode: "Multi-Hop", lat: "High", anon: "High", res: "High" },
              { mode: "Onion", lat: "Moderate", anon: "High", res: "Moderate" },
            ].map((route, idx) => (
              <div key={idx} className="border border-white/10 bg-white/5 p-6 rounded-lg text-center hover:border-purple-500/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-4">{route.mode}</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between text-white/60"><span>Latency</span> <span className={route.lat === "High" ? "text-red-400" : "text-green-400"}>{route.lat}</span></p>
                  <p className="flex justify-between text-white/60"><span>Anonymity</span> <span className={route.anon === "High" ? "text-green-400" : "text-red-400"}>{route.anon}</span></p>
                  <p className="flex justify-between text-white/60"><span>Resilience</span> <span className={route.res === "High" ? "text-green-400" : (route.res === "Low" ? "text-red-400" : "text-yellow-400")}>{route.res}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture, Limitations & Future Work */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-t border-cyan-500/30 pt-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Technical Layers</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><strong className="text-white">Application:</strong> CLI/GUI, Discovery, Msg Mgmt</li>
              <li><strong className="text-white">Network:</strong> TCP/UDP, Routing Execution</li>
              <li><strong className="text-white">Routing:</strong> P2P, Onion, DTN, Multi-hop</li>
            </ul>
          </div>
          <div className="border-t border-red-500/30 pt-6">
            <h3 className="text-xl font-bold text-red-400 mb-4">Limitations</h3>
            <ul className="space-y-2 text-white/70 text-sm list-disc pl-4">
              <li>Increased latency (multi-hop)</li>
              <li>Scalability challenges</li>
              <li>Limited platform support</li>
              <li>PoW weakness at low difficulty</li>
              <li>Private key management risks</li>
            </ul>
          </div>
          <div className="border-t border-green-500/30 pt-6">
            <h3 className="text-xl font-bold text-green-400 mb-4">Future Work</h3>
            <ul className="space-y-2 text-white/70 text-sm list-disc pl-4">
              <li>Adaptive Secure Routing (ASR)</li>
              <li>Global peer discovery (IP-based)</li>
              <li>File sharing support</li>
              <li>Mobile applications</li>
              <li>Blockchain integration</li>
              <li>AI-driven threat detection</li>
            </ul>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-black border border-white/10 p-8 md:p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">CONCLUSION</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            ObscuraNet represents a modular decentralized design with advanced security features. It demonstrates proven technical feasibility in fighting censorship and surveillance, maintaining strong real-world relevance and high future potential.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="w-16 h-1 bg-cyan-500/50 rounded-full" />
            <div className="w-16 h-1 bg-purple-500/50 rounded-full" />
            <div className="w-16 h-1 bg-red-500/50 rounded-full" />
          </div>
        </div>

      </div>
    </section>
  );
}
