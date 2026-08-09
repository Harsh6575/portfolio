"use client";

import { useCallback, useLayoutEffect, useEffect, useRef, useState } from "react";

type IndicatorRect = { left: number; width: number };

export function useSlidingIndicator<T extends HTMLElement>(activeKey: string) {
  const containerRef = useRef<T | null>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const [rect, setRect] = useState<IndicatorRect | null>(null);

  const registerItem = useCallback(
    (key: string) => (node: HTMLElement | null) => {
      if (node) itemRefs.current.set(key, node);
      else itemRefs.current.delete(key);
    },
    [],
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    const item = itemRefs.current.get(activeKey);
    if (!container) return;

    // Clear rather than leave the indicator parked on the last matched item.
    if (!item) {
      setRect(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    setRect({ left: itemRect.left - containerRect.left, width: itemRect.width });
  }, [activeKey]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return { containerRef, registerItem, indicatorRect: rect };
}
