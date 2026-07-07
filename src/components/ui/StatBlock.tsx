"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stats } from "@/data/education";

/** Animated stat strip — the LeetCode/accuracy numbers under the hero. */
export function StatBlock() {
  const reduced = useReducedMotion();

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
          className="bg-surface px-4 py-4 sm:px-5"
        >
          <dt className="order-2 font-mono text-[11px] leading-snug text-muted">
            {stat.label}
          </dt>
          <dd className="order-1 mb-1 font-mono text-xl font-semibold text-accent sm:text-2xl">
            {stat.value}
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}
