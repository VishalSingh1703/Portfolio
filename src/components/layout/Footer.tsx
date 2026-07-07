import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-5 py-8 text-center font-mono text-xs text-faint sm:px-8">
        <p>
          {site.name} <span className="text-accent">©</span>{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
