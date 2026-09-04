export type TechLayerName = "Frontend" | "Mobile" | "Backend" | "Data" | "Infra" | "Other";

const LAYER_ORDER: TechLayerName[] = ["Frontend", "Mobile", "Backend", "Data", "Infra", "Other"];

const LAYER_BY_TECH: Record<string, TechLayerName> = {
  "next.js": "Frontend",
  react: "Frontend",
  typescript: "Frontend",
  javascript: "Frontend",
  "javascript (es6+)": "Frontend",
  "tailwind css": "Frontend",
  "shadcn/ui": "Frontend",
  mui: "Frontend",
  zustand: "Frontend",
  "tanstack query": "Frontend",
  axios: "Frontend",
  "react-leaflet": "Frontend",
  vite: "Frontend",
  "radix ui": "Frontend",

  expo: "Mobile",
  "react native": "Mobile",

  "node.js": "Backend",
  express: "Backend",
  "express.js": "Backend",
  fastapi: "Backend",
  django: "Backend",
  "spring boot": "Backend",
  graphql: "Backend",
  "rest api": "Backend",
  "rest apis": "Backend",
  grpc: "Backend",
  microservices: "Backend",
  "c#": "Backend",
  ".net core": "Backend",
  java: "Backend",
  n8n: "Backend",
  "n8n automation": "Backend",
  celery: "Backend",
  bullmq: "Backend",
  "nextauth.js": "Backend",
  "jwt authentication": "Backend",
  jwt: "Backend",
  zod: "Backend",
  stripe: "Backend",
  cloudinary: "Backend",
  pusher: "Backend",
  supabase: "Backend",
  python: "Backend",

  postgresql: "Data",
  mongodb: "Data",
  redis: "Data",
  prisma: "Data",
  kafka: "Data",
  "sql server": "Data",
  sql: "Data",
  pandas: "Data",
  numpy: "Data",
  matplotlib: "Data",
  seaborn: "Data",
  yfinance: "Data",
  "jupyter notebooks": "Data",
  "data analysis": "Data",

  docker: "Infra",
  "docker compose": "Infra",
  turborepo: "Infra",
  pnpm: "Infra",
  vercel: "Infra",
  "aws ec2": "Infra",
  "aws s3": "Infra",
  "aws iam": "Infra",
  "ci/cd": "Infra",
  linux: "Infra",
  git: "Infra",
  github: "Infra",
  bitbucket: "Infra",
  postman: "Infra",
};

export function groupByLayer(technologies: string[]): { layer: TechLayerName; items: string[] }[] {
  const buckets = new Map<TechLayerName, string[]>();

  for (const tech of technologies) {
    const layer = LAYER_BY_TECH[tech.trim().toLowerCase()] ?? "Other";
    const list = buckets.get(layer) ?? [];
    list.push(tech);
    buckets.set(layer, list);
  }

  return LAYER_ORDER.filter(layer => buckets.has(layer)).map(layer => ({
    layer,
    items: buckets.get(layer)!,
  }));
}
