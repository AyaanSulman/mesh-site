"use client";

<<<<<<< HEAD
import { ReactLenis } from "@studio-freight/react-lenis";
=======
import { ReactLenis } from "lenis/react";
>>>>>>> a07ce9936b1b5bbca92c207f0759e37c9840d39a

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ duration: 1.2, smoothWheel: true }}>
<<<<<<< HEAD
      {children as any}
=======
      {children}
>>>>>>> a07ce9936b1b5bbca92c207f0759e37c9840d39a
    </ReactLenis>
  );
}
