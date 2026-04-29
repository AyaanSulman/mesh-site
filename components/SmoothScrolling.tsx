"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
