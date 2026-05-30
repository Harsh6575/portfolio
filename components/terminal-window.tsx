"use client";

import React from "react";
import { motion } from "motion/react";
import { Terminal, FileJson, FileCode } from "lucide-react";

interface TerminalWindowProps {
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = "Console",
  icon: Icon = Terminal,
  tabs,
  activeTab,
  onTabChange,
  rightAction,
  children,
  className = "",
}) => {
  return (
    <div
      className={`relative w-full border border-border/40 dark:border-white/10 rounded-2xl overflow-hidden font-mono shadow-2xl flex flex-col bg-slate-950 text-slate-100 ${className}`}
    >
      {/* Window Header Bar */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-slate-900 border-b border-white/5 shrink-0 select-none">
        {/* macOS Control Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/40"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/40"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/40"></span>
        </div>

        {/* Title center/icon (Visible only if no tab list is rendered) */}
        {!tabs && (
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
            <Icon className="w-3.5 h-3.5 text-primary" />
            <span>{title}</span>
          </div>
        )}

        {/* Action button slots or spacing balance */}
        <div className="flex items-center gap-2 shrink-0 select-none">
          {rightAction}
          {!rightAction && !tabs && <div className="w-8"></div>}
        </div>
      </div>

      {/* Tabs navigation panel */}
      {tabs && activeTab && onTabChange && (
        <div className="flex bg-slate-900/60 border-b border-white/5 shrink-0 text-xs overflow-x-auto no-scrollbar select-none">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex items-center gap-1.5 px-4 py-2.5 border-r border-white/5 cursor-pointer font-medium relative transition-colors ${
                activeTab === tab
                  ? "text-primary bg-slate-950 font-semibold"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
              }`}
            >
              {tab.endsWith(".json") && <FileJson className="w-3.5 h-3.5 text-yellow-500" />}
              {tab.endsWith(".ts") && <FileCode className="w-3.5 h-3.5 text-blue-400" />}
              {tab.endsWith(".py") && <FileCode className="w-3.5 h-3.5 text-emerald-400" />}

              <span>{tab}</span>

              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main content body container */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-950">{children}</div>
    </div>
  );
};
