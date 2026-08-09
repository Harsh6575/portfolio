import type { ReactNode } from "react";
import { OPEN_TO_NEW_OP, APP_NAME, APP_TITLE, TOTAL_EXPERIENCE } from "@/constants";

export type TabName = "profile.json" | "experience.ts" | "interests.py";

export const TAB_NAMES: TabName[] = ["profile.json", "experience.ts", "interests.py"];

export const codeSnippets: Record<TabName, { content: string; lines: ReactNode[] }> = {
  "profile.json": {
    content: `{
  "name": "${APP_NAME}",
  "role": "${APP_TITLE}",
  "experience": "${TOTAL_EXPERIENCE}+ Years",
  "status": "${OPEN_TO_NEW_OP ? "Open to Opportunities" : "Employed"}",
  "specialties": [
    "Scalable API Architectures",
    "High-Performance Frontends",
    "Database Optimization"
  ]
}`,
    lines: [
      <span key="1">{"{"}</span>,
      <span key="2">
        {"  "}
        <span className="text-violet-400">{'"name"'}</span>:{" "}
        <span className="text-cyan-400">
          {'"'}
          {APP_NAME}
          {'"'}
        </span>
        ,
      </span>,
      <span key="3">
        {"  "}
        <span className="text-violet-400">{'"role"'}</span>:{" "}
        <span className="text-cyan-400">
          {'"'}
          {APP_TITLE}
          {'"'}
        </span>
        ,
      </span>,
      <span key="4">
        {"  "}
        <span className="text-violet-400">{'"experience"'}</span>:{" "}
        <span className="text-cyan-400">
          {'"'}
          {TOTAL_EXPERIENCE}
          {'+ Years"'}
        </span>
        ,
      </span>,
      <span key="5">
        {"  "}
        <span className="text-violet-400">{'"status"'}</span>:{" "}
        <span className="text-cyan-400">
          {'"'}
          {OPEN_TO_NEW_OP ? "Available" : "Active"}
          {'"'}
        </span>
        ,
      </span>,
      <span key="6">
        {"  "}
        <span className="text-violet-400">{'"specialties"'}</span>: [
      </span>,
      <span key="7">
        {"    "}
        <span className="text-emerald-400">{'"Scalable API Architectures"'}</span>,
      </span>,
      <span key="8">
        {"    "}
        <span className="text-emerald-400">{'"High-Performance Frontends"'}</span>,
      </span>,
      <span key="9">
        {"    "}
        <span className="text-emerald-400">{'"Database Optimization"'}</span>
      </span>,
      <span key="10">{"  ]"}</span>,
      <span key="11">{"}"}</span>,
    ],
  },
  "experience.ts": {
    content: `import { Developer } from './harsh';

export class Portfolio extends Developer {
  readonly current = {
    company: "Alite Projects",
    role: "Software Developer",
    stack: ["Node.js", "Redis", "Next.js", "PostgreSQL"]
  };

  async init() {
    await this.buildScalableAPIs();
    await this.craftUserInterfaces();
  }
}`,
    lines: [
      <span key="1">
        <span className="text-pink-400">import</span> {"{"} Developer {"}"}{" "}
        <span className="text-pink-400">from</span>{" "}
        <span className="text-emerald-400">{"'./harsh'"}</span>;
      </span>,
      <span key="2" />,
      <span key="3">
        <span className="text-pink-400">export class</span>{" "}
        <span className="text-violet-400">Portfolio</span>{" "}
        <span className="text-pink-400">extends</span>{" "}
        <span className="text-amber-400">Developer</span> {"{"}
      </span>,
      <span key="4">
        {"  "}
        <span className="text-pink-400">readonly</span>{" "}
        <span className="text-cyan-400">current</span> = {"{"}
      </span>,
      <span key="5">
        {"    "}
        company: <span className="text-emerald-400">{'"Alite Projects"'}</span>,
      </span>,
      <span key="6">
        {"    "}
        role: <span className="text-emerald-400">{'"Software Developer"'}</span>,
      </span>,
      <span key="7">
        {"    "}
        stack: [<span className="text-emerald-400">{'"Node.js"'}</span>,{" "}
        <span className="text-emerald-400">{'"Redis"'}</span>,{" "}
        <span className="text-emerald-400">{'"Next.js"'}</span>,{" "}
        <span className="text-emerald-400">{'"PostgreSQL"'}</span>]
      </span>,
      <span key="8">{"  };"}</span>,
      <span key="9" />,
      <span key="10">
        {"  "}
        <span className="text-pink-400">async</span> <span className="text-amber-400">init</span>
        () {"{"}
      </span>,
      <span key="11">
        {"    "}
        <span className="text-pink-400">await</span> <span className="text-cyan-400">this</span>.
        <span className="text-violet-400">buildScalableAPIs</span>();
      </span>,
      <span key="12">
        {"    "}
        <span className="text-pink-400">await</span> <span className="text-cyan-400">this</span>.
        <span className="text-violet-400">craftUserInterfaces</span>();
      </span>,
      <span key="13">{"  }"}</span>,
      <span key="14">{"}"}</span>,
    ],
  },
  "interests.py": {
    content: `class DevInterests:
    def __init__(self):
        self.focus = "High Performance & Clean Code"
        self.databases = ["PostgreSQL", "MongoDB", "Redis"]
        self.fintech = "Algorithmic Trading & Stock Analytics"
        self.philosophy = "Mastering system design & shipping value"

    def is_learning_always(self) -> bool:
        return True`,
    lines: [
      <span key="1">
        <span className="text-pink-400">class</span>{" "}
        <span className="text-violet-400">DevInterests</span>:
      </span>,
      <span key="2">
        {"    "}
        <span className="text-pink-400">def</span> <span className="text-amber-400">__init__</span>(
        <span className="text-cyan-400">self</span>):
      </span>,
      <span key="3">
        {"        "}
        <span className="text-cyan-400">self</span>.focus ={" "}
        <span className="text-emerald-400">{'"High Performance & Clean Code"'}</span>
      </span>,
      <span key="4">
        {"        "}
        <span className="text-cyan-400">self</span>.databases = [
        <span className="text-emerald-400">{'"PostgreSQL"'}</span>,{" "}
        <span className="text-emerald-400">{'"MongoDB"'}</span>,{" "}
        <span className="text-emerald-400">{'"Redis"'}</span>]
      </span>,
      <span key="5">
        {"        "}
        <span className="text-cyan-400">self</span>.fintech ={" "}
        <span className="text-emerald-400">{'"Algorithmic Trading & Stock Analytics"'}</span>
      </span>,
      <span key="6">
        {"        "}
        <span className="text-cyan-400">self</span>.philosophy ={" "}
        <span className="text-emerald-400">{'"Mastering system design & shipping value"'}</span>
      </span>,
      <span key="7" />,
      <span key="8">
        {"    "}
        <span className="text-pink-400">def</span>{" "}
        <span className="text-amber-400">is_learning_always</span>(
        <span className="text-cyan-400">self</span>) -&gt;{" "}
        <span className="text-violet-400">bool</span>:
      </span>,
      <span key="9">
        {"        "}
        <span className="text-pink-400">return</span> <span className="text-amber-400">True</span>
      </span>,
    ],
  },
};
