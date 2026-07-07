import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  /** mono comment label, e.g. "about" renders as `// about` */
  slug: string;
  title: string;
  description?: string;
}

export function SectionHeading({ slug, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <p className="mb-2 font-mono text-sm text-accent" aria-hidden="true">
        {"// "}
        {slug}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      )}
      <div className="mt-5 h-px w-16 bg-accent" aria-hidden="true" />
    </Reveal>
  );
}
