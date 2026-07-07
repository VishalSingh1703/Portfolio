"use client";

import { useEffect, useState } from "react";
import { navSections } from "@/data/site";

/** Track which section currently dominates the viewport, for nav highlighting. */
export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // fire when a section crosses the upper-middle band of the viewport
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const { id } of navSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}
