"use client";

import { useEffect } from "react";
<<<<<<< HEAD
import HeroPhilosophy from "@/components/HeroPhilosophy";
import TechnicalCore from "@/components/TechnicalCore";
import RoutingMatrix from "@/components/RoutingMatrix";
import VisualWorkflow from "@/components/VisualWorkflow";
import ThreatModeling from "@/components/ThreatModeling";
import RoadmapCTA from "@/components/RoadmapCTA";
=======
import HeroSequence from "@/components/HeroSequence";
import ProblemSpace from "@/components/ProblemSpace";
import VisionStage from "@/components/VisionStage";
import MotivationStage from "@/components/MotivationStage";
import WorkflowStage from "@/components/WorkflowStage";
import DeepDiveStage from "@/components/DeepDiveStage";
import ProtocolLifecycle from "@/components/ProtocolLifecycle";
>>>>>>> a07ce9936b1b5bbca92c207f0759e37c9840d39a

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
<<<<<<< HEAD
    <main className="bg-slate-950 font-sans antialiased text-slate-100 min-h-screen">
      <HeroPhilosophy />
      <TechnicalCore />
      <RoutingMatrix />
      <VisualWorkflow />
      <ThreatModeling />
      <RoadmapCTA />
=======
    <main className="bg-[#020617]">
      <HeroSequence />
      <ProblemSpace />
      <VisionStage />
      <MotivationStage />
      <WorkflowStage />
      <DeepDiveStage />
      <ProtocolLifecycle />
>>>>>>> a07ce9936b1b5bbca92c207f0759e37c9840d39a
    </main>
  );
}
