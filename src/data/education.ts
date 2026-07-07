export const education = {
  institution: "Vellore Institute of Technology",
  location: "Tamil Nadu, India",
  degree: "Bachelor of Technology in Computer Science Engineering",
  period: "2021 — 2025",
  cgpa: "8.4",
};

export interface Certification {
  title: string;
  issuer?: string;
  href?: string;
}

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
  },
  {
    title: "870+ LeetCode Problems Solved · 600+ Day Streak",
    issuer: "LeetCode",
    href: "https://leetcode.com/u/CHANGE-ME", // TODO(vishal): real LeetCode URL (kept in sync with site.ts)
  },
];

export const stats = [
  { value: "870+", label: "LeetCode problems solved" },
  { value: "600+", label: "day coding streak" },
  { value: "95%+", label: "schema-compliant LLM accuracy" },
  { value: "2×", label: "AWS certified" },
];
