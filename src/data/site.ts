/**
 * Single source of truth for identity, links and SEO copy.
 *
 * TODO(vishal): replace the placeholder URLs below with your real profiles.
 * Everything else on the site reads from this file.
 */
export const site = {
  name: "Vishal Singh",
  firstName: "Vishal",
  role: "AI Software Engineer",
  company: "Accenture",
  location: "Bangalore, India",
  email: "kvishalin17@gmail.com",
  phone: "+91 9875654910",
  headline:
    "Software engineer building backend systems and AI-powered automation — LangGraph agentic workflows, LLM pipelines, and scalable cloud infrastructure.",
  summary:
    "Software Engineer experienced in backend systems and AI-powered automation. Strong foundation in Python, scalable application development, cloud technologies, and problem-solving with 870+ LeetCode problems solved.",
  resumePath: "/VishalSingh.pdf",
  /** Canonical production URL — update after deploying to Vercel. */
  url: "https://vishalsingh-portfolio.vercel.app",
  links: {
    github: "https://github.com/VishalSingh1703",
    linkedin: "https://www.linkedin.com/in/CHANGE-ME", // TODO(vishal): real LinkedIn URL
    leetcode: "https://leetcode.com/u/CHANGE-ME", // TODO(vishal): real LeetCode URL
  },
} as const;

export type SectionId =
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "contact";

export const navSections: { id: SectionId; label: string }[] = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
];
