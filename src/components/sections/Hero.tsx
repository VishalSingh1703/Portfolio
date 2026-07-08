"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { StatBlock } from "@/components/ui/StatBlock";
import { site } from "@/data/site";
import { scrollToSection } from "@/lib/scroll";
import { HeroGlow } from "./HeroGlow";

export function Hero() {
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
  });

  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden">
      {/* subtle animated background: glows that fade in and out at random
          spots, over the global '+' marker grid */}
      <HeroGlow />
      <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-32">
        <motion.p {...fadeUp(0)} className="mb-5 font-mono text-sm text-accent">
          $ whoami
        </motion.p>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {site.name}
        </motion.h1>

        <motion.p
          {...fadeUp(0.16)}
          className="mt-3 font-mono text-lg text-muted sm:text-xl"
        >
          <span aria-hidden="true">{"// "}</span>
          {site.role.toLowerCase()} @ {site.company.toLowerCase()}
        </motion.p>

        <motion.p
          {...fadeUp(0.24)}
          className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base"
        >
          <span className="font-mono text-accent" aria-hidden="true">
            {"> "}
          </span>
          {site.headline}
        </motion.p>

        <motion.div {...fadeUp(0.34)} className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink
            href="#projects"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
          >
            [ view work ]
          </ButtonLink>
          <ButtonLink href={site.resumePath} download>
            resume <span aria-hidden="true">↓</span>
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`}>
            contact <span aria-hidden="true">↗</span>
          </ButtonLink>
        </motion.div>

        <div className="mt-14 sm:mt-16">
          <StatBlock />
        </div>
      </div>
    </section>
  );
}
