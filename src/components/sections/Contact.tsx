import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
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
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              {/* left: direct channels */}
              <div className="flex flex-col">
                <p className="font-mono text-sm text-muted">
                  <span className="text-accent">$</span> echo &quot;hello&quot;{" "}
                  | mail {site.email}
                </p>

                <div className="mt-6">
                  <ButtonLink href={site.resumePath} download>
                    resume <span aria-hidden="true">↓</span>
                  </ButtonLink>
                </div>

                <div className="mt-8 flex flex-col gap-2.5 border-t border-border pt-6 font-mono text-sm lg:mt-auto">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {s.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                  <a
                    href={`mailto:${site.email}`}
                    className="w-fit text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {site.email}
                  </a>
                </div>
              </div>

              {/* right: message form */}
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
