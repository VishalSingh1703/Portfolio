"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();

  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        whileHover={reduced ? undefined : { y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "group relative h-full rounded-lg border bg-surface p-6 shadow-sm transition-colors sm:p-7",
          project.featured
            ? "border-accent/40 hover:border-accent"
            : "border-border hover:border-border-strong"
        )}
      >
        {project.featured && (
          <p className="mb-3 inline-block rounded border border-accent/40 bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent">
            ★ featured · AI/LLM
          </p>
        )}
        {project.academic && (
          <p className="mb-3 inline-block rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
            university project
          </p>
        )}

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {project.name}
          </h3>
          {project.period && (
            <p className="font-mono text-xs text-faint">{project.period}</p>
          )}
        </div>
        <p className="mt-0.5 font-mono text-xs text-muted">{project.tagline}</p>

        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-4 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-[2px] shrink-0 font-mono text-xs text-accent" aria-hidden="true">
                ▹
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent underline-offset-4 hover:underline"
              >
                {link.label.toLowerCase()} <ExternalIcon />
              </a>
            ))}
          </div>
        )}
      </motion.article>
    </Reveal>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          slug="projects"
          title="Projects"
          description="Things I've designed, built, and shipped — AI/LLM platforms first."
        />

        <div className="space-y-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
          <div className="grid gap-5 lg:grid-cols-2">
            {rest.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i + featured.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
