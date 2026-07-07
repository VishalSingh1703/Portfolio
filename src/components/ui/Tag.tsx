import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

/** Small mono chip used for tech stacks and skills. */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border bg-surface-2 px-2 py-1 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
