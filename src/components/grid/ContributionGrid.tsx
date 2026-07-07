"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import {
  contributionCells,
  GRID_WEEKS,
  jumpTargets,
  monthLabels,
  type Cell,
} from "@/data/contributions";
import { navSections } from "@/data/site";
import { scrollToSection } from "@/lib/scroll";
import { useToast } from "@/components/ui/Toast";

const CELL_COLORS = [
  "var(--cell-0)",
  "var(--cell-1)",
  "var(--cell-2)",
  "var(--cell-3)",
  "var(--cell-4)",
] as const;

const DAY_LABELS = ["Mon", "Wed", "Fri"];

interface HoverState {
  cell: Cell;
  /** cell center, relative to the grid wrapper */
  x: number;
  y: number;
  /** top rows flip the tooltip below the cell so it can't overlap content above */
  below: boolean;
}

/**
 * LeetCode-style activity heatmap with a twist:
 *  - milestone cells (career moments) show a commit-style tooltip and jump
 *    to their matching section on click
 *  - every other active cell teleports you to a random section, with a toast
 * Fully keyboard operable; each cell is a focusable button.
 */
export function ContributionGrid() {
  const { showToast } = useToast();
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverState | null>(null);

  const sectionLabel = useCallback(
    (id: string) => navSections.find((s) => s.id === id)?.label ?? id,
    []
  );

  const handleActivate = useCallback(
    (cell: Cell) => {
      if (cell.milestone) {
        showToast(`jumping to ${sectionLabel(cell.milestone.target)}`);
        scrollToSection(cell.milestone.target, { flash: true });
        return;
      }
      if (cell.level === 0) return;
      const target = jumpTargets[Math.floor(Math.random() * jumpTargets.length)];
      showToast(`jumping to ${sectionLabel(target)}`);
      scrollToSection(target, { flash: true });
    },
    [sectionLabel, showToast]
  );

  const handleHover = useCallback(
    (cell: Cell, el: HTMLElement) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = el.getBoundingClientRect();
      const wrapRect = wrapper.getBoundingClientRect();
      const below = rect.top - wrapRect.top < 56; // not enough room above
      // content-space coords (survive horizontal scroll), clamped so the
      // centered tooltip can't be clipped at either edge of the container
      const half = cell.milestone ? 160 : 95;
      const rawX = rect.left - wrapRect.left + wrapper.scrollLeft + rect.width / 2;
      const maxX = Math.max(wrapper.scrollWidth, wrapRect.width) - half;
      setHover({
        cell,
        x: Math.min(Math.max(rawX, half), maxX),
        y:
          (below ? rect.bottom - wrapRect.top : rect.top - wrapRect.top) +
          wrapper.scrollTop,
        below,
      });
    },
    []
  );

  // column-major: 52 weeks × 7 days, like GitHub/LeetCode
  const weeks: Cell[][] = [];
  for (let w = 0; w < GRID_WEEKS; w++) {
    weeks.push(contributionCells.slice(w * 7, w * 7 + 7));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-lg border border-border bg-surface p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs text-muted">
            <span className="text-accent">$</span> git log --oneline — a year
            of shipping, every day
          </p>
          <p className="hidden font-mono text-[11px] text-faint sm:block">
            tip: green squares are clickable · bordered ones are milestones
          </p>
        </div>

        {/* horizontal scroll container so the grid never breaks the layout */}
        <div className="overflow-x-auto pb-1" ref={wrapperRef} style={{ position: "relative" }}>
          {/* tooltip */}
          {hover && (
            <div
              role="tooltip"
              className={
                "pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded border border-border-strong bg-surface-2 px-2.5 py-1.5 font-mono text-[11px] text-foreground shadow-md" +
                (hover.below ? "" : " -translate-y-full")
              }
              style={{ left: hover.x, top: hover.below ? hover.y + 6 : hover.y - 6 }}
            >
              {hover.cell.milestone ? (
                <>
                  <span className="text-accent">●</span>{" "}
                  {hover.cell.milestone.label}{" "}
                  <span className="text-accent">→ {sectionLabel(hover.cell.milestone.target)}</span>
                </>
              ) : hover.cell.level > 0 ? (
                <>
                  {hover.cell.date} · <span className="text-accent">↦ jump somewhere</span>
                </>
              ) : (
                <>{hover.cell.date} · rest day</>
              )}
            </div>
          )}

          <div className="w-max">
            {/* month labels */}
            <div
              className="mb-1.5 grid font-mono text-[10px] text-faint"
              style={{
                gridTemplateColumns: `repeat(${GRID_WEEKS}, 12px)`,
                gap: "3px",
                marginLeft: "30px",
              }}
              aria-hidden="true"
            >
              {Array.from({ length: GRID_WEEKS }, (_, w) => (
                <span key={w} className="overflow-visible whitespace-nowrap">
                  {monthLabels.find((m) => m.week === w)?.label ?? ""}
                </span>
              ))}
            </div>

            <div className="flex">
              {/* day labels */}
              <div
                className="mr-1.5 grid w-[24px] font-mono text-[10px] text-faint"
                style={{ gridTemplateRows: "repeat(7, 12px)", gap: "3px" }}
                aria-hidden="true"
              >
                <span />
                <span className="leading-[12px]">{DAY_LABELS[0]}</span>
                <span />
                <span className="leading-[12px]">{DAY_LABELS[1]}</span>
                <span />
                <span className="leading-[12px]">{DAY_LABELS[2]}</span>
                <span />
              </div>

              {/* the grid itself */}
              <div
                role="group"
                aria-label="Coding activity heatmap. Active squares jump to a random section; milestone squares jump to a specific one."
                className="grid grid-flow-col"
                style={{
                  gridTemplateRows: "repeat(7, 12px)",
                  gridAutoColumns: "12px",
                  gap: "3px",
                }}
              >
                {weeks.map((week, w) =>
                  week.map((cell, d) => {
                    const interactive = cell.level > 0;
                    const label = cell.milestone
                      ? `Milestone: ${cell.milestone.label}. Jumps to ${sectionLabel(cell.milestone.target)}.`
                      : interactive
                        ? `${cell.date}, active day. Jumps to a random section.`
                        : `${cell.date}, rest day.`;
                    return (
                      <button
                        key={`${w}-${d}`}
                        type="button"
                        tabIndex={interactive ? 0 : -1}
                        aria-label={label}
                        disabled={!interactive}
                        onClick={() => handleActivate(cell)}
                        onMouseEnter={(e) => handleHover(cell, e.currentTarget)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={(e) => handleHover(cell, e.currentTarget)}
                        onBlur={() => setHover(null)}
                        className={
                          "h-3 w-3 rounded-[2.5px] transition-transform" +
                          (interactive
                            ? " cursor-pointer" +
                              (reduced ? "" : " hover:scale-125 focus-visible:scale-125")
                            : " cursor-default") +
                          (cell.milestone
                            ? " ring-1 ring-foreground/70 ring-offset-1 ring-offset-surface"
                            : "")
                        }
                        style={{ backgroundColor: CELL_COLORS[cell.level] }}
                      />
                    );
                  })
                )}
              </div>
            </div>

            {/* legend */}
            <div className="mt-3 flex items-center gap-3 font-mono text-[10px] text-faint" style={{ marginLeft: "30px" }}>
              <span className="flex items-center gap-1">
                less
                {CELL_COLORS.map((c) => (
                  <span
                    key={c}
                    className="inline-block h-2.5 w-2.5 rounded-[2px]"
                    style={{ backgroundColor: c }}
                    aria-hidden="true"
                  />
                ))}
                more
              </span>
              <span className="hidden items-center gap-1.5 sm:flex">
                <span className="inline-block h-2.5 w-2.5 rounded-[2px] ring-1 ring-foreground/70" style={{ backgroundColor: "var(--cell-4)" }} aria-hidden="true" />
                milestone
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
