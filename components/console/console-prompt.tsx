"use client";

import { useRef, useState, type KeyboardEvent, type RefObject } from "react";

const SUGGESTED_COMMANDS = ["whoami", "skills", "projects", "help"];

export const ConsolePrompt = ({
  onSubmit,
  commandLog,
}: {
  onSubmit: (command: string) => void;
  commandLog: RefObject<string[]>;
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const recallIndexRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (command: string) => {
    onSubmit(command);
    setValue("");
    recallIndexRef.current = null;
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.trim()) submit(value);
      return;
    }

    const log = commandLog.current;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!log.length) return;
      const nextIndex =
        recallIndexRef.current === null ? log.length - 1 : Math.max(0, recallIndexRef.current - 1);
      recallIndexRef.current = nextIndex;
      setValue(log[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (recallIndexRef.current === null) return;
      const nextIndex = recallIndexRef.current + 1;
      if (nextIndex >= log.length) {
        recallIndexRef.current = null;
        setValue("");
      } else {
        recallIndexRef.current = nextIndex;
        setValue(log[nextIndex]);
      }
    }
  };

  return (
    <div className="px-4 py-2.5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor="dev-console-input" className="sr-only">
          Console command input
        </label>
        <span aria-hidden="true" className="text-emerald-400 text-xs font-mono shrink-0">
          $
        </span>
        <div className="relative flex-1 min-w-0">
          <input
            ref={inputRef}
            id="dev-console-input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="type 'help'"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-xs font-mono text-slate-100 placeholder:text-slate-600 outline-none"
          />
          {!isFocused && !value && (
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3.5 bg-emerald-400/70 motion-safe:animate-caret-blink"
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTED_COMMANDS.map(cmd => (
          <button
            key={cmd}
            type="button"
            onClick={() => submit(cmd)}
            className="text-[10px] font-semibold px-2.5 py-1.5 rounded-full border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
