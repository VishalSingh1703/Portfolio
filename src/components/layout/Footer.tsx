import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 font-mono text-xs text-faint sm:flex-row sm:px-8">
        <p>
          <span className="text-accent">©</span> {new Date().getFullYear()}{" "}
          {site.name} · Bangalore, India
        </p>
        <p>
          built with Next.js + Tailwind + Framer Motion ·{" "}
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
