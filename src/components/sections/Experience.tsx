import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading slug="experience" title="Experience" />

        <ol className="relative space-y-12 border-l border-border pl-6 sm:pl-8">
          {experience.map((job, i) => (
            <li key={job.company} className="relative">
              {/* timeline node */}
              <span
                className={
                  "absolute -left-6 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 sm:-left-8 " +
                  (job.current
                    ? "border-accent bg-accent"
                    : "border-border-strong bg-background")
                }
                aria-hidden="true"
              />
              <Reveal delay={i * 0.08}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {job.role}{" "}
                    <span className="font-normal text-muted">· {job.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-faint">
                    {job.period}
                    {job.current && (
                      <span className="ml-2 rounded border border-accent/40 bg-accent-soft px-1.5 py-0.5 text-accent">
                        current
                      </span>
                    )}
                  </p>
                </div>
                <p className="mt-0.5 font-mono text-xs text-faint">{job.type}</p>

                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-[15px] leading-relaxed text-muted"
                    >
                      <span className="mt-[3px] shrink-0 font-mono text-xs text-accent" aria-hidden="true">
                        ▹
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
