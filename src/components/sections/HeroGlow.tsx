"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface Pos {
  x: number; // percent
  y: number; // percent
  size: number; // px
}

function randomPos(): Pos {
  return {
    // keep glows a little inside the edges so they never look clipped
    x: 8 + Math.random() * 84,
    y: 12 + Math.random() * 76,
    size: 260 + Math.random() * 220,
  };
}

/**
 * A single accent glow that fades in at a random spot, pulses, fades out,
 * then reappears somewhere new. Re-mounting on each `tick` restarts the
 * one-shot fade so the glow moves only while invisible — no visible jump.
 */
function Glow({ startDelay }: { startDelay: number }) {
  const [tick, setTick] = useState(0);
  const [pos, setPos] = useState<Pos>(randomPos);

  useEffect(() => {
    let timeout: number;
    const cycle = () => {
      const period = 4200 + Math.random() * 2600;
      timeout = window.setTimeout(() => {
        setPos(randomPos());
        setTick((t) => t + 1);
        cycle();
      }, period);
    };
    const initial = window.setTimeout(cycle, startDelay);
    return () => {
      window.clearTimeout(initial);
      window.clearTimeout(timeout);
    };
  }, [startDelay]);

  return (
    <motion.div
      key={tick}
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: pos.size,
        height: pos.size,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, var(--accent) 0%, transparent 68%)",
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: [0, 0.16, 0.16, 0], scale: [0.7, 1, 1.05, 1.1] }}
      transition={{ duration: 5.2, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
    />
  );
}

/** Two out-of-phase glows drifting around the hero at random. */
export function HeroGlow() {
  const reduced = useReducedMotion();

  if (reduced) {
    // one calm static glow for reduced-motion users
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[18%] h-[360px] w-[360px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 68%)" }}
      />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Glow startDelay={0} />
      <Glow startDelay={2600} />
    </div>
  );
}
