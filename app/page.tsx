"use client";

import { useEffect } from "react";
import HeroPhilosophy from "@/components/HeroPhilosophy";
import TechnicalCore from "@/components/TechnicalCore";
import RoutingMatrix from "@/components/RoutingMatrix";
import VisualWorkflow from "@/components/VisualWorkflow";
import ThreatModeling from "@/components/ThreatModeling";
import RoadmapCTA from "@/components/RoadmapCTA";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-slate-950 font-sans antialiased text-slate-100 min-h-screen">
      <HeroPhilosophy />
      <TechnicalCore />
      <RoutingMatrix />
      <VisualWorkflow />
      <ThreatModeling />
      <RoadmapCTA />
    </main>
  );
}
