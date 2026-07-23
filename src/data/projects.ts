export interface Project {
  name: string;
  tagline: string;
  period?: string;
  description: string;
  highlights: string[];
  tech: string[];
  links: { label: string; href: string }[];
  featured: boolean;
  academic?: boolean;
}

export const projects: Project[] = [
  {
    name: "Guardian AI",
    tagline: "Hackathon-Winning · AI-Powered Vehicle Emergency Response",
    description:
      "A zero-install, QR-based emergency response platform letting any bystander scan a vehicle's QR code to instantly trigger crash verification and dispatch — awarded 3rd place at the Amadeus × Contentstack Hackathon.",
    highlights: [
      "Architected a zero-install, QR-based emergency response platform letting any bystander scan a vehicle's QR code to instantly trigger crash verification and dispatch, spanning a Next.js/React PWA, a FastAPI microservice backend, and a native Kotlin Android app across 3 independently deployed services.",
      "Engineered an AI-powered computer vision pipeline using the Gemini API to analyze live-captured accident photos against an 80% confidence threshold, blocking false alarms, and integrated a Twilio + Pipecat voice-AI IVR that autonomously calls up to 5 prioritized emergency contacts with 3× automated retry and DTMF response handling.",
      "Designed a secure PostgreSQL/Supabase schema with Row-Level Security across 3 relational tables to store medical passports and 2–5 emergency contacts per user while enforcing strict PII-privacy invariants — earning 3rd position in the Amadeus × Contentstack Hackathon, judged by a panel including members from Microsoft and Amadeus.",
    ],
    tech: ["Next.js", "FastAPI", "Kotlin", "Gemini AI", "Supabase", "Twilio"],
    links: [],
    featured: true,
  },
  {
    name: "ExamChecker",
    tagline: "AI Handwritten Answer Evaluation Platform",
    period: "Jan 2025 — Mar 2025",
    description:
      "An AI-powered evaluation platform that cuts grading time from 20 minutes to under 2 minutes per paper through automated extraction, grading, and report generation.",
    highlights: [
      "Engineered a single-call multimodal grading workflow using the Gemini API on a browser-based video-to-document pipeline (motion detection, frame-stability analysis), identifying and evaluating scanned answers while cutting API calls, latency, and token costs versus page-wise processing.",
      "Designed a resilient grading engine with multi-level fallback — Gemini, sentence-transformer embeddings, keyword-similarity scoring — supporting offline-first operation and automated PDF reports.",
    ],
    tech: ["Node.js", "React", "Gemini API", "LLM", "Embeddings", "PDF Generation"],
    links: [
      { label: "Live App", href: "https://exam-checker-virid.vercel.app/" },
    ],
    featured: true,
  },
  {
    name: "Aptitude Web App",
    tagline: "Quiz & Assessment Platform",
    period: "Jun 2024 — Jul 2024",
    description:
      "A full-stack assessment platform with 500+ questions, authentication, and analytics — deployed on dedicated AWS infrastructure and engineered for reliability.",
    highlights: [
      "Increased user engagement by 40% with authentication, analytics, and a 500+ question bank.",
      "Reduced query latency by 30% through MongoDB indexing, schema optimization, and efficient API design.",
      "Improved application performance by 75% by migrating to AWS EC2 with dedicated compute — Route 53, Elastic IPs, AMI backups, and EBS snapshots for disaster recovery.",
    ],
    tech: ["MongoDB", "Express.js", "React", "Node.js", "AWS EC2", "Route 53"],
    links: [],
    featured: false,
  },
  {
    name: "COVID-19 Detection using Machine Learning",
    tagline: "University Project · Medical Image Classification",
    description:
      "An image-based COVID-19 detection system that classifies chest X-ray scans using convolutional neural networks, built as a university research project.",
    highlights: [
      "Built a CNN classification pipeline over chest X-ray imagery with preprocessing, normalization, and data augmentation to compensate for limited medical datasets.",
      "Applied transfer learning on pretrained backbones to improve convergence and generalization on scarce labeled data.",
      "Evaluated models on accuracy, precision, recall, and F1 to balance sensitivity against false positives in a diagnostic-support context.",
    ],
    tech: ["Python", "TensorFlow", "Keras", "CNN", "OpenCV", "scikit-learn"],
    links: [],
    featured: false,
    academic: true,
  },
];
