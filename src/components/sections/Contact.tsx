import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

const socials = [
  { label: "github", href: site.links.github },
  { label: "linkedin", href: site.links.linkedin },
  { label: "leetcode", href: site.links.leetcode },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          slug="contact"
          title="Get in touch"
          description="I'm open to AI Software Engineer, LLM Engineer, and Backend Engineer roles. If you're building something interesting with agents, LLM pipelines, or hard backend problems — my inbox is open."
        />

        <Reveal>
          <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
            <p className="font-mono text-sm text-muted">
              <span className="text-accent">$</span> echo &quot;hello&quot; |
              mail {site.email}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${site.email}`} variant="primary">
                say hello <span aria-hidden="true">↗</span>
              </ButtonLink>
              <ButtonLink href={site.resumePath} download>
                resume <span aria-hidden="true">↓</span>
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-sm">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {site.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
