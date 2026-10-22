import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";

type Flower = {
  src: string;
  alt: string;
  title: string;
  note: string;
};

type InfiniteSpiralProps = {
  flowers: Flower[];
  onSelect: (index: number) => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const modulo = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;
const smoothstep = (min: number, max: number, value: number) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

export default function InfiniteSpiral({ flowers, onSelect }: InfiniteSpiralProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const speedRef = useRef(0);
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || flowers.length === 0) return;

    let frame = 0;
    let previous = performance.now();
    let bounds = root.getBoundingClientRect();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resizeObserver = new ResizeObserver(() => {
      bounds = root.getBoundingClientRect();
    });
    resizeObserver.observe(root);

    const render = (time: number) => {
      const delta = Math.min((time - previous) / 1000, 0.05);
      previous = time;
      const paused = draggingRef.current || hoveredRef.current || reducedMotion.matches;
      const desiredSpeed = paused ? 0 : 0.34;
      speedRef.current += (desiredSpeed - speedRef.current) * (1 - Math.exp(-delta * 7));
      targetRef.current += speedRef.current * delta;
      progressRef.current += (targetRef.current - progressRef.current) *
        (1 - Math.exp(-delta * (draggingRef.current ? 22 : 11)));

      const count = flowers.length;
      const half = count / 2;
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);
      const fit = Math.min(1, width / 510, height / 505);
      const radius = Math.min(178, width * 0.35) * fit;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        let offset = index - progressRef.current;
        offset = modulo(offset + half, count) - half;
        const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1);
        const opacity = 1 - smoothstep(0.76, 1, edge);
        const focus = 1 - Math.min(Math.abs(offset) / 5.1, 1);
        const angle = offset * (360 / Math.max(7, count)) - 90;
        const radians = (angle * Math.PI) / 180;
        const x = Math.sin(radians) * radius;
        const z = Math.cos(radians) * radius;
        const depthScale = clamp(1000 / Math.max(1000 - z, 1), 0.78, 1.32);
        const scale = (0.82 + focus * 0.2) * fit * depthScale;
        const blur = 5 * smoothstep(0.43, 1, edge);

        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${offset * 65 * fit}px, 0) scale(${scale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : "none";
        card.style.zIndex = String(Math.round(((z / Math.max(radius, 1) + 1) / 2) * 1000) + index);
        card.style.pointerEvents = opacity > 0.25 ? "auto" : "none";
      });
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [flowers]);

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.style.cursor = "grab";
  };

  const moveBy = (direction: number) => {
    const current = Math.round(targetRef.current);
    const next = modulo(current + direction, flowers.length);
    targetRef.current = current + direction;
    onSelect(next);
  };

  return (
    <div
      ref={rootRef}
      className="spiral"
      onMouseEnter={() => { hoveredRef.current = true; }}
      onMouseLeave={() => { hoveredRef.current = false; }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        draggingRef.current = true;
        movedRef.current = false;
        lastYRef.current = event.clientY;
        targetRef.current = progressRef.current;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.style.cursor = "grabbing";
      }}
      onPointerMove={(event) => {
        if (!draggingRef.current) return;
        const delta = event.clientY - lastYRef.current;
        lastYRef.current = event.clientY;
        if (Math.abs(delta) > 1) movedRef.current = true;
        targetRef.current -= delta / 65;
      }}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onClickCapture={(event) => {
        if (!movedRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        movedRef.current = false;
      }}
      role="group"
      aria-label="A moving spiral of photographs for Abeer"
    >
      <div className="spiral__glow" aria-hidden="true" />
      <div className="spiral__stage" role="list">
        {flowers.map((flower, index) => (
          <button
            key={flower.src}
            ref={(node) => { cardRefs.current[index] = node; }}
            className="spiral__card"
            type="button"
            role="listitem"
            aria-label={`${flower.title}. Select to read a note.`}
            onClick={() => {
              targetRef.current = index;
              onSelect(index);
            }}
          >
            <img src={flower.src} alt={flower.alt} draggable={false} loading={index < 4 ? "eager" : "lazy"} />
            <span className="spiral__card-wash" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="spiral__controls" aria-label="Choose a photograph">
        <button type="button" onClick={() => moveBy(-1)} aria-label="Previous photograph">←</button>
        <span>DRAG TO WANDER</span>
        <button type="button" onClick={() => moveBy(1)} aria-label="Next photograph">→</button>
      </div>
    </div>
  );
}
