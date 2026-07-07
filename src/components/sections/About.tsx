import { ContributionGrid } from "@/components/grid/ContributionGrid";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading slug="about" title="About" />

        <Reveal>
          <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
              <p>
                I&apos;m a software engineer in {site.location.split(",")[0]},
                currently building AI-powered automation at{" "}
                <span className="text-foreground">{site.company}</span> — where
                I architect LangGraph-based agentic systems that turn messy
                enterprise documents into validated, production-grade data
                models.
              </p>
              <p>
                My work sits at the intersection of{" "}
                <span className="text-foreground">backend engineering</span>{" "}
                and <span className="text-foreground">LLM systems</span>:
                designing orchestration frameworks, building evaluation
                guardrails (LLM-as-a-Judge, confidence thresholds,
                human-in-the-loop), and shipping pipelines that hold up at 95%+
                schema-compliant accuracy in production.
              </p>
              <p>
                Before that: hardened auth systems and tuned high-traffic SQL
                as a backend intern, and shipped full-stack products end to end
                — from MongoDB schema design to AWS EC2 deployment with
                disaster-recovery baked in. Under it all, a habit of daily
                problem-solving:{" "}
                <a
                  href={site.links.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  870+ LeetCode problems on a 600+ day streak
                </a>
                .
              </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <Reveal delay={0.1}>
            <ContributionGrid />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
