import { GITHUB_URL } from "@/constants";

export const projectsData: {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: "In Progress" | "Completed" | "Professional Project" | "Freelance";
  date: string;
  features: string[];
  links?: {
    type?: "github" | "live";
    label?: string;
    url?: string;
  }[];
}[] = [
  {
    title: "Shortify - URL Shortener",
    description:
      "A high-throughput URL shortening platform engineered to demonstrate advanced system design principles and scalable backend architecture. Features a collision-resistant custom hashing generator, scalable MongoDB persistence, and an optimized Redis caching hierarchy to achieve sub-millisecond redirect lookups.",
    technologies: ["Python", "FastAPI", "MongoDB", "Redis", "Docker"],
    category: "Backend",
    status: "Completed",
    date: "Nov 2025",
    features: [
      "Hash-based short ID generation using SHA-256 + Base62 encoding",
      "Three-tier caching architecture with Redis (7-day TTL)",
      "Async database operations using Motor (MongoDB async driver)",
      "RESTful API with automatic documentation (Swagger/OpenAPI)",
      "Deterministic URL shortening with collision detection",
      "Real-time cache invalidation and TTL management",
      "Scalable MongoDB document storage for long-term URL mapping",
      "Horizontal scalability with stateless API design",
    ],
    links: [
      {
        type: "github",
        label: "View Source",
        url: `${GITHUB_URL}/shortify`,
      },
    ],
  },
  {
    title: "Tailor Management System",
    description:
      "A modern full-stack SaaS platform designed for garment and tailor shop business automation. Integrates a rich, highly responsive Next.js frontend with a secure Express backend via type-safe Drizzle ORM, orchestrating customer measurements, order lifecycles, real-time inventory, and invoice generation.",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "TypeScript",
      "Tailwind CSS",
      "JWT",
      "Docker",
      "Vitest",
      "Drizzle ORM",
    ],
    category: "Full Stack",
    status: "In Progress",
    date: "Oct - Nov 2025",
    features: [
      "Customer order & measurement tracking",
      "Real-time inventory management",
      "Billing & invoice generation",
      "RESTful API architecture",
      "JWT authentication & role-based access",
      "Responsive modern UI design",
    ],
    links: [
      {
        type: "github",
        label: "Code",
        url: GITHUB_URL + "/tailor-track-frontend",
      },
    ],
  },
  {
    title: "Patient Management System",
    description:
      "A highly available, distributed healthcare operations system built on a modern Spring Boot microservices architecture. Implements enterprise integration patterns including an API Gateway with rate limiting, secure gRPC inter-service communication, and real-time Kafka event streaming for asynchronous healthcare analytics.",
    technologies: [
      "Java",
      "Spring Boot",
      "Microservices",
      "gRPC",
      "Kafka",
      "PostgreSQL",
      "Docker",
      "JWT",
    ],
    category: "Backend",
    status: "Completed",
    date: "2025",
    features: [
      "5-service microservices architecture",
      "API Gateway with request routing & auth",
      "gRPC inter-service communication",
      "Kafka event streaming for analytics",
      "JWT authentication & authorization",
      "Docker containerized deployment",
    ],
    links: [
      {
        type: "github",
        label: "Code",
        url: GITHUB_URL + "/patient-management-spring-boot",
      },
    ],
  },
  {
    title: "Algorithmic Trading Platform",
    description:
      "A professional-grade algorithmic trading workstation tailored for the Indian equities market. Features real-time stock market data ingestion pipelines, automated strategy executions, detailed backtesting simulators, and multi-dimensional portfolio risk analytics.",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "pandas",
      "NumPy",
      "yfinance",
      "Next.js",
      "GraphQL",
    ],
    category: "FinTech",
    status: "Professional Project",
    date: "2023-2025",
    features: [
      "Real-time market data integration",
      "Automated trading algorithm execution",
      "Comprehensive backtesting system",
      "Portfolio performance analytics",
      "Risk management tools",
      "Custom algorithm development interface",
    ],
    links: [],
  },
  {
    title: "Hotel Reservation Platform",
    description:
      "A high-fidelity full-stack hospitality marketplace inspired by Airbnb. Powered by Next.js and Prisma, the platform includes complete session management, dynamic property listing grids, interactive geospatial map searching, and real-time booking reservation workflows.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "NextAuth.js",
      "React-Leaflet",
      "Cloudinary",
    ],
    category: "Full-Stack",
    status: "Completed",
    date: "2022",
    features: [
      "User authentication and authorization system",
      "Property listing with image galleries",
      "Advanced search and filtering options",
      "Interactive maps integration",
      "Booking system with date selection",
      "Responsive design across all devices",
    ],
    links: [
      {
        type: "github",
        label: "Code",
        url: GITHUB_URL + "/airbnb-clone",
      },
    ],
  },
];
