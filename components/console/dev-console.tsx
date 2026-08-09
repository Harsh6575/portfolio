"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { TerminalWindow } from "@/components/terminal-window";
import { scrollToSection } from "@/lib/utils";
import type { ProjectSummary } from "@/lib/projects";
import { TAB_NAMES, codeSnippets, type TabName } from "./file-snippets";
import { commandRegistry, type CommandContext } from "./commands";
import { ConsoleOutput, type HistoryEntry } from "./console-output";
import { ConsolePrompt } from "./console-prompt";

export const DevConsole = ({ projectSummaries }: { projectSummaries: ProjectSummary[] }) => {
  const [activeFile, setActiveFile] = useState<TabName>("profile.json");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [inSession, setInSession] = useState(false);
  const [copied, setCopied] = useState(false);

  const commandLogRef = useRef<string[]>([]);
  const context: CommandContext = { projectSummaries };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    commandLogRef.current.push(trimmed);
    setInSession(true);
    setHistory(prev => [...prev, { type: "command", text: trimmed }]);

    if (trimmed.toLowerCase() === "clear") {
      setHistory([]);
      setInSession(false);
      return;
    }

    const catMatch = trimmed.match(/^cat\s+(.+)$/i);
    if (catMatch) {
      const file = catMatch[1].trim();
      const matchedFile = TAB_NAMES.find(tab => tab.toLowerCase() === file.toLowerCase());
      if (matchedFile) {
        setActiveFile(matchedFile);
        setHistory(prev => [...prev, { type: "file", file: matchedFile }]);
      } else {
        setHistory(prev => [...prev, { type: "error", text: `cat: ${file}: no such file` }]);
      }
      return;
    }

    const handler = commandRegistry[trimmed.toLowerCase()];
    if (!handler) {
      setHistory(prev => [
        ...prev,
        {
          type: "error",
          text: `command not found: ${trimmed}. Type 'help' to see available commands.`,
        },
      ]);
      return;
    }

    const result = handler(context);
    setHistory(prev => [...prev, { type: "text", lines: result.lines }]);

    if (result.sideEffect?.type === "scroll") {
      scrollToSection(result.sideEffect.target, 80);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveFile(tab as TabName);
    if (inSession) {
      setHistory(prev => [
        ...prev,
        { type: "command", text: `cat ${tab}` },
        { type: "file", file: tab as TabName },
      ]);
    }
  };

  const copyActiveFile = () => {
    navigator.clipboard.writeText(codeSnippets[activeFile].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TerminalWindow
      tabs={TAB_NAMES}
      activeTab={activeFile}
      onTabChange={handleTabChange}
      rightAction={
        <button
          onClick={copyActiveFile}
          className="text-slate-400 hover:text-slate-100 p-1.5 rounded-md hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          title="Copy Active Code"
          aria-label={copied ? "Copied to clipboard" : "Copy active file contents"}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      }
      footer={<ConsolePrompt onSubmit={runCommand} commandLog={commandLogRef} />}
      className="w-full max-w-[460px] md:max-w-[500px] min-h-[320px] sm:min-h-0 aspect-[4/3] sm:aspect-[4/3.2]"
    >
      <ConsoleOutput
        mode={inSession ? "session" : "file"}
        activeFile={activeFile}
        history={history}
      />
    </TerminalWindow>
  );
};
