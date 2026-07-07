import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading slug="education" title="Education & Certifications" />

        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-lg border border-border bg-surface p-6 sm:p-7">
              <p className="font-mono text-xs text-accent" aria-hidden="true">
                {"// degree"}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">
                {education.institution}
              </h3>
              <p className="mt-1 text-[15px] text-muted">{education.degree}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-faint">
                <span>{education.period}</span>
                <span>{education.location}</span>
                <span className="text-accent">CGPA {education.cgpa}/10</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-lg border border-border bg-surface p-6 sm:p-7">
              <p className="font-mono text-xs text-accent" aria-hidden="true">
                {"// certifications & achievements"}
              </p>
              <ul className="mt-3 space-y-3">
                {certifications.map((cert) => (
                  <li key={cert.title} className="flex gap-3">
                    <span className="mt-[3px] shrink-0 font-mono text-xs text-accent" aria-hidden="true">
                      ✓
                    </span>
                    <div>
                      {cert.href ? (
                        <a
                          href={cert.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[15px] font-medium underline-offset-4 hover:text-accent hover:underline"
                        >
                          {cert.title}
                        </a>
                      ) : (
                        <p className="text-[15px] font-medium">{cert.title}</p>
                      )}
                      {cert.issuer && (
                        <p className="font-mono text-xs text-faint">{cert.issuer}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
