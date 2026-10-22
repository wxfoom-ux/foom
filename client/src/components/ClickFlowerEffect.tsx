import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";

type BloomBurst = {
  id: number;
  x: number;
  y: number;
};

type BloomStyle = CSSProperties & {
  "--bloom-x": string;
  "--bloom-y": string;
  "--bloom-rotate": string;
  "--bloom-delay": string;
};

const BLOOMS = [
  { glyph: "✿", color: "#fff5fb" },
  { glyph: "❀", color: "#ffd0e4" },
  { glyph: "✽", color: "#f6c0df" },
  { glyph: "✳", color: "#ffffff" },
  { glyph: "❀", color: "#f4b7d8" },
  { glyph: "✿", color: "#fff5fb" },
];

export default function ClickFlowerEffect() {
  const [bursts, setBursts] = useState<BloomBurst[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, number>());

  useEffect(() => {
    const garden = document.querySelector<HTMLElement>(".garden-shell");
    if (!garden) return;

    const handleClick = (event: MouseEvent) => {
      const clickedElement = event.target instanceof Element ? event.target : null;
      let x = event.clientX;
      let y = event.clientY;

      if (event.detail === 0 && clickedElement) {
        const rect = clickedElement.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }

      const id = nextId.current++;
      const burst = { id, x, y };
      setBursts((current) => [...current.slice(-5), burst]);

      const timer = window.setTimeout(() => {
        setBursts((current) => current.filter((item) => item.id !== id));
        timers.current.delete(id);
      }, 1150);
      timers.current.set(id, timer);
    };

    garden.addEventListener("click", handleClick, true);
    return () => {
      garden.removeEventListener("click", handleClick, true);
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  if (typeof document === "undefined" || bursts.length === 0) return null;

  return createPortal(
    <div className="flower-pulse-layer" aria-hidden="true">
      {bursts.map((burst) => (
        <div className="flower-pulse" key={burst.id} style={{ left: burst.x, top: burst.y }}>
          {BLOOMS.map((bloom, index) => {
            const angle = (Math.PI * 2 * index) / BLOOMS.length + (burst.id % 5) * 0.18;
            const radius = 42 + (index % 2) * 14;
            const style: BloomStyle = {
              "--bloom-x": `${Math.cos(angle) * radius}px`,
              "--bloom-y": `${Math.sin(angle) * radius}px`,
              "--bloom-rotate": `${index * 54 - 35}deg`,
              "--bloom-delay": `${index * 24}ms`,
              color: bloom.color,
              fontSize: `${21 + (index % 3) * 2}px`,
            };

            return (
              <span className="flower-pulse__bloom" key={`${burst.id}-${index}`} style={style}>
                {bloom.glyph}
              </span>
            );
          })}
        </div>
      ))}
    </div>,
    document.body,
  );
}
