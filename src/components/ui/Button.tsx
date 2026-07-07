"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  download?: boolean;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

/** Terminal-flavored CTA link: [ view work ] */
export function ButtonLink({
  href,
  children,
  variant = "ghost",
  download,
  external,
  onClick,
  className,
}: ButtonLinkProps) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={href}
      download={download}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileHover={reduced ? undefined : { y: -1 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-4 py-2.5 font-mono text-sm transition-colors",
        variant === "primary"
          ? "border-accent bg-accent text-background hover:bg-accent-strong hover:border-accent-strong"
          : "border-border-strong text-foreground hover:border-accent hover:text-accent",
        className
      )}
    >
      {children}
    </motion.a>
  );
}
