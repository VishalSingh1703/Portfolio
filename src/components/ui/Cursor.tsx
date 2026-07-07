"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Circular custom cursor that pixel-inverts whatever is underneath it
 * (white dot + mix-blend-difference). Only active for fine pointers;
 * the native cursor is hidden via a class so it always survives JS failures.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const reduced = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // near-instant when reduced motion is on; gentle trail otherwise
  const springConfig = reduced
    ? { stiffness: 4000, damping: 200 }
    : { stiffness: 700, damping: 45, mass: 0.6 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);
  // the halo runs on softer springs so it drifts a beat behind the dot
  const haloConfig = reduced
    ? { stiffness: 4000, damping: 200 }
    : { stiffness: 260, damping: 28, mass: 0.9 };
  const hx = useSpring(x, haloConfig);
  const hy = useSpring(y, haloConfig);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      setHoveringInteractive(
        !!t?.closest?.("a, button, [role='button'], input, textarea, label")
      );
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* halo: a soft radial glow that blends with `difference`, so its
          gradient reads as the pixel-inverse of whatever sits underneath,
          strongest at the center and melting into the background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full mix-blend-difference"
        style={{
          x: hx,
          y: hy,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0) 72%)",
        }}
        animate={{
          width: hoveringInteractive ? 110 : 72,
          height: hoveringInteractive ? 110 : 72,
          scale: pressed ? 0.85 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }}
      />
      {/* dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-white mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hoveringInteractive ? 34 : 18,
          height: hoveringInteractive ? 34 : 18,
          scale: pressed ? 0.8 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: reduced ? 0 : 0.15, ease: "easeOut" }}
      />
    </>
  );
}
