import type { SectionId } from "./site";

/**
 * LeetCode-style activity grid, curated statically so it renders identically
 * on server and client (fixed seed + fixed end date, no network).
 *
 * The density is calibrated to the real stats on the resume — 870+ problems
 * solved on a 600+ day streak — so almost every day is active.
 *
 * Milestone cells anchor real career moments onto the grid: hovering shows a
 * commit-style label and clicking jumps to the matching section. Every other
 * active cell jumps to a random section (handled in ContributionGrid).
 */

export interface Milestone {
  label: string;
  target: SectionId;
}

export interface Cell {
  /** ISO date, purely informational for the tooltip */
  date: string;
  /** 0 = inactive, 1–4 = activity intensity */
  level: 0 | 1 | 2 | 3 | 4;
  milestone?: Milestone;
}

const WEEKS = 52;
const DAYS = WEEKS * 7;
/** Fixed end date keeps the generated grid deterministic across renders. */
const END_DATE = new Date(Date.UTC(2026, 6, 4)); // Sat, Jul 4 2026

/** Small deterministic PRNG (mulberry32) — no Math.random, no hydration drift. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** date (UTC) → ISO yyyy-mm-dd */
function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const MILESTONES: { date: string; milestone: Milestone }[] = [
  { date: "2025-07-20", milestone: { label: "870+ LeetCode problems solved", target: "about" } },
  { date: "2025-10-06", milestone: { label: "joined Accenture as AI Software Engineer", target: "experience" } },
  { date: "2025-12-10", milestone: { label: "AWS Solutions Architect certified", target: "education" } },
  { date: "2026-02-10", milestone: { label: "shipped ExamChecker", target: "projects" } },
  { date: "2026-04-15", milestone: { label: "MERN + AWS stack in production", target: "skills" } },
  { date: "2026-06-20", milestone: { label: "open to AI/LLM engineering roles", target: "contact" } },
];

function buildCells(): Cell[] {
  const rand = mulberry32(870); // seed = problems solved, naturally
  const milestoneByDate = new Map(MILESTONES.map((m) => [m.date, m.milestone]));
  const cells: Cell[] = [];

  for (let i = 0; i < DAYS; i++) {
    const d = new Date(END_DATE);
    d.setUTCDate(d.getUTCDate() - (DAYS - 1 - i));
    const date = iso(d);

    // A long-streak profile: rare misses, mostly medium-high intensity.
    const r = rand();
    let level: Cell["level"];
    if (r < 0.06) level = 0;
    else if (r < 0.28) level = 1;
    else if (r < 0.62) level = 2;
    else if (r < 0.88) level = 3;
    else level = 4;

    // Contest-style hot weeks: every ~6th week runs hotter.
    if (level > 0 && Math.floor(i / 7) % 6 === 0 && rand() < 0.5) level = 4;

    const milestone = milestoneByDate.get(date);
    if (milestone) level = 4; // milestones are always max intensity

    cells.push(milestone ? { date, level, milestone } : { date, level });
  }
  return cells;
}

export const contributionCells: Cell[] = buildCells();
export const GRID_WEEKS = WEEKS;

/** Month labels positioned by week index, derived from the same fixed range. */
export const monthLabels: { week: number; label: string }[] = (() => {
  const labels: { week: number; label: string }[] = [];
  let last = "";
  for (let w = 0; w < WEEKS; w++) {
    const d = new Date(END_DATE);
    d.setUTCDate(d.getUTCDate() - (DAYS - 1 - w * 7));
    const m = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    if (m !== last) {
      labels.push({ week: w, label: m });
      last = m;
    }
  }
  // Drop a cramped first label if the second follows immediately.
  return labels.filter((l, i) => !(i === 0 && labels[1] && labels[1].week - l.week < 3));
})();

/** Sections eligible for the random-jump easter egg. */
export const jumpTargets: SectionId[] = [
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
];
