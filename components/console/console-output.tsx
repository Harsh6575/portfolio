"use client";

import { useEffect, useRef } from "react";
import { codeSnippets, type TabName } from "./file-snippets";

export type HistoryEntry =
  | { type: "command"; text: string }
  | { type: "text"; lines: string[] }
  | { type: "file"; file: TabName }
  | { type: "error"; text: string };

export const ConsoleOutput = ({
  mode,
  activeFile,
  history,
}: {
  mode: "file" | "session";
  activeFile: TabName;
  history: HistoryEntry[];
}) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== "session") return;
    const node = logRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [mode, history]);

  if (mode === "file") {
    const snippet = codeSnippets[activeFile];
    return (
      <div className="p-5 flex-1 overflow-y-auto text-[11px] sm:text-xs text-slate-300 leading-relaxed custom-scrollbar bg-slate-950">
        <pre className="flex w-full max-w-full overflow-hidden">
          <div className="text-slate-600 text-right pr-4 select-none shrink-0 font-medium border-r border-white/5">
            {snippet.lines.map((_, i) => (
              <div key={i} className="h-5">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="pl-4 flex-1 select-text overflow-x-auto min-w-0 no-scrollbar">
            {snippet.lines.map((line, idx) => (
              <div key={idx} className="h-5 whitespace-pre">
                {line}
              </div>
            ))}
          </div>
        </pre>
      </div>
    );
  }

  return (
    <div
      ref={logRef}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      className="p-4 flex-1 overflow-y-auto text-[11px] sm:text-xs leading-relaxed custom-scrollbar bg-slate-950 space-y-1.5"
    >
      {history.map((entry, idx) => {
        if (entry.type === "command") {
          return (
            <p key={idx} className="text-slate-100 whitespace-pre-wrap break-words">
              <span aria-hidden="true" className="text-emerald-400">
                ${" "}
              </span>
              <span className="sr-only">Command entered: </span>
              {entry.text}
            </p>
          );
        }
        if (entry.type === "error") {
          return (
            <p key={idx} className="text-red-400/90 whitespace-pre-wrap break-words">
              {entry.text}
            </p>
          );
        }
        if (entry.type === "file") {
          return (
            <div key={idx} className="pl-3.5 py-0.5">
              {codeSnippets[entry.file].lines.map((line, lineIdx) => (
                <p key={lineIdx} className="text-slate-300 whitespace-pre">
                  {line}
                </p>
              ))}
            </div>
          );
        }
        return (
          <div key={idx} className="pl-3.5 text-slate-400">
            {entry.lines.map((line, lineIdx) => (
              <p key={lineIdx} className="whitespace-pre-wrap break-words">
                {line}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};
