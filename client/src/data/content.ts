// All site content lives here. Edit this file to update the site.
// Fields marked TODO are placeholders — fill in your real data.

export interface Perspective {
  id: string;
  label: string;
}

export interface Area {
  title: string;
  items: string[];
}

export interface CaseStudy {
  title: string;
  status?: string;
  link?: string;
  featured?: boolean;
  areas?: string[];
  summary?: string;
  problem?: string;
  built?: string;
  decisions?: string;
  challenges?: string;
  result?: string;
  tech?: string[];
}

export interface Experiment {
  title: string;
  story: string;
  status: "shipped" | "in progress" | "idea" | "paused";
  link?: string;
  tech?: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  context: string;
  workedOn: string[];
  techAreas: string[];
  challenge: string;
  result: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Principle {
  title: string;
  text: string;
}

export const profile = {
  name: "Hanif",
  title: "Technology Builder",
  location: "", // TODO: e.g. "Jakarta, ID"
  email: "you@example.com", // TODO: your email
  socials: {
    github: "https://github.com/muhammadhnf97",
    linkedin: "https://linkedin.com/in/", // TODO
    twitter: "",
    resume: "", // TODO: link to CV PDF, e.g. "/cv.pdf" in public/
  },
};

export const hero = {
  headline: "I build things with technology.",
  supporting:
    "Software, systems, digital products, and occasionally things that probably didn't need to be built.",
};

export const perspectives: Perspective[] = [
  { id: "engineering", label: "Engineering" },
  { id: "digital-growth", label: "Digital & Growth" },
  { id: "technical-growth", label: "Technical Growth" },
  { id: "experiments", label: "Experiments" },
];

export const engineering = {
  title: "Me, as an engineer.",
  description:
    "I build and operate software systems, from backend services and APIs to infrastructure, connected devices, and intelligent processing.",
  areas: [
    {
      title: "Backend Engineering",
      items: [
        "Python",
        "FastAPI",
        "Go",
        "REST APIs",
        "Auth / RBAC",
        "Databases",
        "Data processing",
      ],
    },
    {
      title: "Systems & Infrastructure",
      items: [
        "Linux",
        "Service deployment",
        "systemd",
        "Nginx",
        "Networking",
        "Performance",
        "Production troubleshooting",
        "Edge deployment",
      ],
    },
    {
      title: "Connected Systems",
      items: [
        "CCTV / IP cameras",
        "RTSP",
        "Telemetry",
        "Edge devices",
        "Device health monitoring",
        "Streaming systems",
      ],
    },
    {
      title: "Computer Vision & AI",
      items: [
        "Object detection",
        "YOLO",
        "Face embeddings",
        "Vector search",
        "CV experiments",
        "Inference pipelines",
      ],
    },
  ] as Area[],
};

export const projects: CaseStudy[] = [
  {
    title: "Dataset Collector",
    status: "in progress",
    featured: true,
    link: "https://github.com/muhammadhnf97/dataset-collector",
    areas: ["Backend Engineering", "Computer Vision & AI"],
    summary:
      "End-to-end tool for collecting, annotating, and exporting person-attribute datasets — built to make annotation work dramatically easier.",
    problem:
      "Annotating person-attribute datasets from scratch is slow and error-prone, and near-duplicate images leaking across train/val/test splits silently inflates validation scores.",
    built:
      "A full pipeline tool — upload, batch, crop, assign, pre-label, annotate, split, export — with model-assisted pre-labeling (PULC person-attribute model + YOLO person crops), multi-user annotation with per-user leaderboards and resume-where-you-left-off, and bit-level correction tracking of who changed what.",
    decisions:
      "Model pre-labels so annotators correct rather than label from zero; group-aware splitting using 64-bit perceptual hashing so near-duplicates can't leak across splits; atomic per-row upserts with SQLite WAL for concurrency-safe annotation writes.",
    challenges:
      "Keeping multi-user annotation correct and concurrent — coverage tracking, overlap warnings, safe writes — on a single-machine SQLite deployment.",
    result: "", // TODO
    tech: ["Python", "FastAPI", "React", "SQLite", "YOLO", "PaddleClas"],
  },
  {
    title: "Visitor Management System",
    status: "production",
    featured: false,
    areas: ["Backend Engineering", "Connected Systems"],
    summary:
      "Fullstack work on a visitor/access management platform — dashboard, device management, and device-level authorization.",
    problem:
      "The product needed a more polished operator experience and a way to control which people are authorized on which access devices — on top of an existing system already ingesting high volumes of device reports.",
    built:
      "A refined dashboard, an overhauled person page, a devices view, and a new feature for grouping devices — plus a feature authorizing specific people on specific devices.",
    challenges:
      "Once in production, devices sending reports simultaneously over an extended period caused responsiveness problems. We ruled out device behavior, database write performance, RAM/CPU usage, and local network stability one by one — the real issue was that a single service handled both high-volume device ingestion and user-facing frontend/API traffic at once.",
    decisions:
      "We split the service in two: one dedicated to receiving device reports, another dedicated to frontend/API operations.",
    result:
      "Workload isolation significantly improved responsiveness and let both traffic patterns scale independently.",
    tech: ["Backend", "Frontend", "Device APIs", "Authorization"],
  },
  {
    title: "Data Center Infrastructure Management (DCIM)",
    status: "production",
    featured: false,
    areas: ["Backend Engineering", "Connected Systems"],
    summary:
      "Backend engineering for a DCIM platform — device data ingestion, aggregation, and monitoring APIs, wired together with VMS and an AI monitoring platform.",
    problem:
      "A data center needed infrastructure monitoring that could ingest and aggregate device data across systems and expose it through reliable APIs.",
    built:
      "Backend services for device data ingestion, aggregation, and monitoring APIs, plus deployment and integration work connecting DCIM with the Vessel/Visitor-style VMS and an AI monitoring platform.",
    tech: ["Backend", "APIs", "Data aggregation", "Deployment"],
  },
  {
    title: "Vessel Management System",
    status: "production",
    featured: true,
    areas: ["Backend Engineering", "Connected Systems"],
    summary:
      "Led architecture and backend for a vessel management platform — real-time fleet telemetry, satellite integration, and operational reporting.",
    problem:
      "The project wasn't about writing new features from scratch — it was ensuring critical workflows from a legacy system kept working correctly in a new one, while improving them. That meant reverse-engineering how the old system actually behaved in production, not just how it was supposed to behave.",
    built:
      "As Technical Lead and Backend Engineer, I led the team, designed the system architecture, and implemented real-time fleet telemetry processing and operational reporting — including vessel tracking with satellite integration: a satellite comms client, a background scheduler polling a mailbox and generating “laporan-inmarsat” reports, and a geotrack scheduler for position sync.",
    decisions:
      "Rather than a straight migration, we reverse-engineered legacy behaviors and hidden business rules first, then rebuilt them in a cleaner, more maintainable architecture — improving weak points without breaking what operators already relied on.",
    challenges:
      "Preserving operational continuity while replacing the legacy system underneath it, without disrupting established user expectations.",
    result: "", // TODO: measurable outcome
    tech: ["Python", "FastAPI", "SQL", "RBAC", "Telemetry", "Satellite comms"],
  },
  {
    title: "Visibel.ai",
    status: "production",
    featured: true,
    link: "", // TODO: link if public
    areas: ["Backend Engineering", "Computer Vision & AI"],
    summary:
      "Fullstack + ML platform for AI service registration, execution management, and monitoring — plus research and training of models for various tasks.",
    problem:
      "The platform needed to run AI services reliably in production while also supporting ongoing model research — and do both on edge machines with limited storage, memory, and processing headroom.",
    built:
      "Both frontend and backend for a platform handling AI service registration, execution management, monitoring, and operational reliability, alongside research and training of models for various tasks.",
    challenges:
      "Keeping the platform, models, and services correct and efficient on edge hardware with real resource constraints — storage, memory, and processing — without sacrificing performance or reliability.",
    tech: ["Backend", "Frontend", "Model training", "Edge deployment"],
  },
];

export const digitalGrowth = {
  title: "Me, in digital & growth.",
  description:
    "I also work on the technical side of digital marketing — connecting websites, tracking, analytics, search, and conversion data.",
  positioning: "I understand how technology supports digital growth.",
  areas: [
    {
      title: "Analytics & Tracking",
      items: [
        "Google Tag Manager",
        "Google Analytics 4",
        "Event tracking",
        "Conversion tracking",
        "Meta Pixel",
        "Tag implementation",
      ],
    },
    {
      title: "SEO",
      items: [
        "Technical SEO",
        "Search visibility",
        "Website structure",
        "Metadata",
        "Performance",
      ],
    },
    {
      title: "Digital Products",
      items: [
        "Landing pages",
        "Marketing websites",
        "Conversion-focused builds",
        "Analytics instrumentation",
      ],
    },
  ] as Area[],
};

export const technicalGrowth = {
  title: "Where engineering meets growth.",
  description:
    "I like working at the intersection of technology, users, and business — building products that can be measured, understood, and improved.",
  proof:
    "Not just “I built this website.” — I built the website, implemented measurement, tracked user behavior, and used the data to decide what to improve.",
  areas: [
    {
      title: "Measurement",
      items: [
        "Analytics architecture",
        "Conversion instrumentation",
        "Tracking implementation",
      ],
    },
    {
      title: "Optimization",
      items: [
        "Technical SEO",
        "Website performance",
        "Data-driven improvements",
      ],
    },
    {
      title: "Systems",
      items: [
        "Product experimentation",
        "Automation",
        "Technical marketing systems",
      ],
    },
  ] as Area[],
};

export const experiments = {
  title: "Me, when nobody asked me to build it.",
  description: "Things I'm building because I want to find out what happens.",
  note: "Some of these are unfinished. That's fine — the story is the point.",
  items: [
    {
      title: "Computer vision playground",
      story:
        "YOLO object detection, face embeddings, and vector search — figuring out how far off-the-shelf models can go before things get weird.",
      status: "in progress",
      tech: ["YOLO", "Embeddings", "Vector search"],
    },
    {
      title: "This website",
      story:
        "Astro frontend + a small FastAPI contact service. Mostly an excuse to build something end-to-end the way I'd want it.",
      status: "shipped",
      tech: ["Astro", "React", "FastAPI", "Tailwind CSS"],
    },
    {
      title: "Untitled game prototype", // TODO: replace with a real experiment
      story: "Because everyone needs one abandoned game idea.", // TODO
      status: "idea",
      tech: [],
    },
  ] as Experiment[],
};

export const experience: ExperienceEntry[] = [
  {
    role: "Fullstack Engineer — Visitor Management System",
    company: "", // TODO: company name
    period: "", // TODO: e.g. "2023 — present"
    context:
      "Visitor/access management platform handling reports from access devices in production.",
    workedOn: [
      "Dashboard refinement",
      "Person page",
      "Devices view",
      "Device grouping",
      "Device-level authorization",
    ],
    techAreas: ["Backend", "Frontend", "Device APIs"],
    challenge:
      "Simultaneous high-volume device reporting degraded responsiveness; the same service handled both device ingestion and frontend/API traffic.",
    result:
      "Split ingestion and frontend/API into separate services — improved responsiveness and let each scale independently.",
  },
  {
    role: "Backend Engineer — Data Center Infrastructure Management",
    company: "", // TODO: company name
    period: "", // TODO: e.g. "2023 — present"
    context:
      "DCIM platform integrated with a VMS and an AI monitoring platform.",
    workedOn: [
      "Deployment",
      "Device data ingestion",
      "Data aggregation",
      "Monitoring APIs",
    ],
    techAreas: ["Backend", "APIs", "Deployment"],
    challenge: "", // TODO
    result: "", // TODO
  },
  {
    role: "Technical Lead / Backend Engineer — Vessel Management System",
    company: "", // TODO: company name
    period: "", // TODO: e.g. "2023 — present"
    context:
      "Real-time fleet operations platform replacing a legacy vessel-management system while preserving its operational rules.",
    workedOn: [
      "System architecture",
      "Team leadership",
      "Vessel telemetry",
      "Satellite integration",
      "RBAC",
      "Data processing",
      "Export systems",
      "Frontend coordination",
    ],
    techAreas: [
      "FastAPI",
      "Python",
      "Databases",
      "Satellite comms",
      "CSV / XLSX / PDF generation",
      "Telemetry integration",
    ],
    challenge:
      "Reverse-engineering legacy behavior and hidden business rules, then rebuilding them without disrupting critical operational workflows.",
    result: "", // TODO: concrete outcome
  },
  {
    role: "Fullstack Engineer — Visibel.ai",
    company: "", // TODO: company name
    period: "", // TODO: e.g. "2023 — present"
    context:
      "AI platform for service registration, execution management, and monitoring, alongside model research.",
    workedOn: [
      "Frontend",
      "Backend",
      "AI service registration",
      "Execution management",
      "Monitoring",
      "Model research & training",
    ],
    techAreas: ["Backend", "Frontend", "Model training", "Edge deployment"],
    challenge:
      "Keeping models and services efficient and reliable on edge machines with limited storage, memory, and processing power.",
    result: "", // TODO: concrete outcome
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Software",
    items: ["Python", "Go", "TypeScript", "React", "FastAPI", "Gin", "REST APIs"],
  },
  {
    title: "Systems",
    items: [
      "Linux",
      "Nginx",
      "systemd",
      "Networking",
      "Deployment",
      "Edge computing",
    ],
  },
  {
    title: "Data",
    items: ["SQL", "SQLite", "Data processing", "Analytics", "Telemetry"],
  },
  {
    title: "AI / Computer Vision",
    items: [
      "YOLO",
      "Object detection",
      "Embeddings",
      "Vector search",
      "Inference pipelines",
    ],
  },
  {
    title: "Digital",
    items: [
      "Google Tag Manager",
      "Google Analytics 4",
      "SEO",
      "Conversion tracking",
      "Meta Pixel",
    ],
  },
];

export const principles: Principle[] = [
  {
    title: "Build before overthinking",
    text: "I learn best by building something real and solving the problems that appear.",
  },
  {
    title: "Understand the system",
    text: "I don't want to only know which function to call. I want to understand how the pieces interact.",
  },
  {
    title: "Keep things practical",
    text: "Solutions that are understandable, maintainable, and appropriate for the actual problem.",
  },
  {
    title: "Curiosity is a feature",
    text: "Some of my projects exist simply because I wanted to know how something works.",
  },
];

export const about = {
  title: "About",
  text: "I'm a technology-focused builder with experience across software engineering, backend systems, infrastructure, connected devices, computer vision, and digital analytics. I enjoy problems where software meets the real world — and I tend to learn by building things.",
};

export const contact = {
  heading: "Have something interesting to build?",
};
