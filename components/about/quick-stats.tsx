import type { ReactNode } from "react";
import { FileCode } from "lucide-react";
import { TerminalWindow } from "@/components/terminal-window";
import { TOTAL_EXPERIENCE, APP_TITLE, CURRENT_COMPANY, OPEN_TO_NEW_OP } from "@/constants";
import { skillsData } from "@/constants/skills";

export const QuickStats = ({ projectsCount }: { projectsCount: number }) => {
  const focusAreas = skillsData.filter(skill => skill.priority).map(skill => skill.category);
  const status = OPEN_TO_NEW_OP ? "open_to_new_roles" : "not_actively_looking";

  const lines: ReactNode[] = [
    <span key="1">
      <span className="text-pink-400">const</span> <span className="text-cyan-400">whoami</span> ={" "}
      {"{"}
    </span>,
    <span key="2">
      {"  "}
      experience: <span className="text-emerald-400">{`"${TOTAL_EXPERIENCE}+ years"`}</span>,
    </span>,
    <span key="3">
      {"  "}
      role: <span className="text-emerald-400">{`"${APP_TITLE}"`}</span>,
    </span>,
    <span key="4">
      {"  "}
      currentlyAt: <span className="text-emerald-400">{`"${CURRENT_COMPANY}"`}</span>,
    </span>,
    <span key="5">{"  focus: ["}</span>,
    ...focusAreas.map((area, i) => (
      <span key={`focus-${i}`}>
        {"    "}
        <span className="text-emerald-400">{`"${area}"`}</span>,
      </span>
    )),
    <span key="6">{"  ],"}</span>,
    <span key="7">
      {"  "}
      projectsShipped: <span className="text-amber-400">{projectsCount}</span>,
    </span>,
    <span key="8">
      {"  "}
      status: <span className="text-emerald-400">{`"${status}"`}</span>,
    </span>,
    <span key="9">{"};"}</span>,
    <span key="10" />,
    <span key="11">
      <span className="text-pink-400">export default</span> whoami;
    </span>,
  ];

  return (
    <TerminalWindow title="whoami.ts" icon={FileCode} className="min-h-[280px]">
      <div className="p-5 flex-1 text-[11px] sm:text-xs text-slate-300 leading-relaxed bg-slate-950">
        <pre className="flex w-full max-w-full overflow-x-auto no-scrollbar">
          <div className="text-slate-600 text-right pr-4 select-none shrink-0 font-medium border-r border-white/5">
            {lines.map((_, i) => (
              <div key={i} className="h-5">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="pl-4 flex-1 select-text min-w-0">
            {lines.map((line, idx) => (
              <div key={idx} className="h-5 whitespace-pre">
                {line}
              </div>
            ))}
          </div>
        </pre>
      </div>
    </TerminalWindow>
  );
};
