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
    document.documentElement.classList.add("custom-cursor");

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
      document.documentElement.classList.remove("custom-cursor");
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
      {/* halo: a soft ring that also blends with `difference`, so its
          gradient is the pixel-inverse of whatever sits underneath — the
          opposite of the solid dot, fading out at both edges */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full mix-blend-difference"
        style={{
          x: hx,
          y: hy,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0) 38%, rgba(255,255,255,0.45) 58%, rgba(255,255,255,0) 78%)",
        }}
        animate={{
          width: hoveringInteractive ? 84 : 56,
          height: hoveringInteractive ? 84 : 56,
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
