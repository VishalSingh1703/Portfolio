import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          slug="skills"
          title="Skills"
          description="The stack I reach for — from agentic LLM pipelines down to the databases and infrastructure they run on."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.slug} delay={(i % 2) * 0.08}>
              <div className="h-full rounded-lg border border-border bg-surface p-5 transition-colors hover:border-border-strong">
                <p className="font-mono text-xs text-accent" aria-hidden="true">
                  {"// "}
                  {group.slug}
                </p>
                <h3 className="mt-1 text-[15px] font-semibold tracking-tight">
                  {group.category}
                </h3>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
