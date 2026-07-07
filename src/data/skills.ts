export interface SkillGroup {
  category: string;
  /** mono comment-style label rendered above the category */
  slug: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "AI & LLM Engineering",
    slug: "ai-llm",
    skills: [
      "LangGraph",
      "Agentic Workflows",
      "LLM APIs",
      "Prompt Engineering",
      "LLM Evaluation",
      "Structured Output Generation",
      "Embeddings",
      "OCR",
      "Document Intelligence",
    ],
  },
  {
    category: "Programming & Backend",
    slug: "backend",
    skills: [
      "Python",
      "C++",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
    ],
  },
  {
    category: "Frontend & Web",
    slug: "frontend",
    skills: ["React.js", "Next.js", "Vite", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Databases & Data",
    slug: "data",
    skills: [
      "SQL",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Firebase",
      "Database Indexing",
      "Query Optimization",
      "Data Modeling",
    ],
  },
  {
    category: "Cloud & DevOps",
    slug: "cloud",
    skills: [
      "AWS (EC2, IAM, Route 53)",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Vercel",
      "Deployment Automation",
    ],
  },
  {
    category: "Software Engineering",
    slug: "fundamentals",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "Design Patterns",
      "System Design",
    ],
  },
];
