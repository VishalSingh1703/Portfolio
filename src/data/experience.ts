export interface Experience {
  company: string;
  role: string;
  type: string;
  period: string;
  current: boolean;
  highlights: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    company: "Accenture",
    role: "AI Software Engineer",
    type: "On-site",
    period: "Oct 2025 — Present",
    current: true,
    highlights: [
      "Architected a Python/LangGraph agentic orchestration framework transforming SAP Functional Documents into validated CSN v2.0 JSON, processing 500+ documents and cutting manual data-modeling effort by 8+ hours per sprint.",
      "Built an automated entity-extraction and relationship-mapping pipeline achieving 95%+ schema-compliant accuracy, backed by guardrail workflows — LLM-as-a-Judge scoring, confidence thresholds, and human-in-the-loop review — that improved output reliability across downstream systems.",
      "Integrated generated models into the Functional Document → JSON → SAP Datasphere workflow, enabling automated retail analytics across customer, product, store, and transaction domains.",
    ],
    tech: ["Python", "LangGraph", "LLM APIs", "SAP Datasphere", "Agentic Workflows"],
  },
  {
    company: "CEIAmerica",
    role: "Backend Engineer Intern",
    type: "Internship",
    period: "Sep 2023 — Oct 2023",
    current: false,
    highlights: [
      "Built a secure authentication system that hardened access control and closed unauthorized-access gaps across internal tooling.",
      "Improved SQL query performance by 25% through optimized indexing and refined JDBC connection handling on high-traffic queries.",
      "Developed backend services powering three internal applications, reducing manual intervention for the operations team.",
    ],
    tech: ["Java", "SQL", "JDBC", "REST APIs"],
  },
];
