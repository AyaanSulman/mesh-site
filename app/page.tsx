"use client";

import { useEffect } from "react";
import HeroSequence from "@/components/HeroSequence";
import ProblemSpace from "@/components/ProblemSpace";
import VisionStage from "@/components/VisionStage";
import MotivationStage from "@/components/MotivationStage";
import WorkflowStage from "@/components/WorkflowStage";
import DeepDiveStage from "@/components/DeepDiveStage";
import ProtocolLifecycle from "@/components/ProtocolLifecycle";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#020617]">
      <HeroSequence />
      <ProblemSpace />
      <VisionStage />
      <MotivationStage />
      <WorkflowStage />
      <DeepDiveStage />
      <ProtocolLifecycle />
    </main>
  );
}
