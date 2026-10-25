import { useEffect, useRef } from "react";

type GalaxyInteraction = {
  x: number;
  y: number;
  kind: "stardust" | "pointer";
};

type GalaxyProps = {
  density?: number;
  glowIntensity?: number;
  flareIntensity?: number;
  starSpeed?: number;
  mouseRepulsion?: boolean;
  clickWarp?: boolean;
  starColors?: string[];
  hueShift?: number;
  saturation?: number;
  starSize?: number;
  twinkleIntensity?: number;
  speed?: number;
  rotationSpeed?: number;
  layers?: number;
  direction?: "forward" | "backward";
  repulsionStrength?: number;
  mouseInteraction?: boolean;
  intro?: boolean;
  lightMode?: boolean;
  ariaLabel?: string;
  onInteraction?: (interaction: GalaxyInteraction) => void;
};

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  phase: number;
  drift: number;
  color: string;
};

type Dust = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  life: number;
  maxLife: number;
  size: number;
  twist: number;
};

type Meteor = {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  life: number;
  maxLife: number;
  alpha: number;
};

type Ripple = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
};

const DEFAULT_COLORS = ["#F8F7F3", "#D5BE93", "#8B82B8", "#B8C8E8"];

function colorForStar(index: number, starColors: string[], hueShift: number, saturation: number) {
  if (starColors.length > 0) return starColors[index % starColors.length];
  const hue = (hueShift + index * 29) % 360;
  const lightness = 74 + (index % 4) * 6;
  return `hsl(${hue} ${Math.max(0, saturation)}% ${lightness}%)`;
}

function wrap(value: number, size: number) {
  return ((value % size) + size) % size;
}

export default function Galaxy({
  density = 1,
  glowIntensity = 0.3,
  flareIntensity = 1,
  starSpeed = 0.5,
  mouseRepulsion = true,
  clickWarp = true,
  starColors = DEFAULT_COLORS,
  hueShift = 140,
  saturation = 0,
  starSize = 1,
  twinkleIntensity = 0.3,
  speed = 1,
  rotationSpeed = 0.1,
  layers = 4,
  direction = "forward",
  repulsionStrength = 2,
  mouseInteraction = true,
  intro = true,
  lightMode = false,
  ariaLabel = "Interactive starfield. Click the universe to create stardust.",
  onInteraction,
}: GalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onInteractionRef = useRef(onInteraction);

  useEffect(() => {
    onInteractionRef.current = onInteraction;
  }, [onInteraction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let lastTime = performance.now();
    let reducedMotion = false;
    let disposed = false;
    const pointer = { x: 0.5, y: 0.5, active: false };
    const stars: Star[] = [];
    const dust: Dust[] = [];
    const meteors: Meteor[] = [];
    const ripples: Ripple[] = [];
    let nextMeteorAt = performance.now() + 3700;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = media.matches;
    const onMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };
    media.addEventListener?.("change", onMotionPreference);

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const desiredCount = Math.min(1450, Math.max(220, Math.round((width * height) / 11000 * density)));
      stars.length = 0;
      for (let index = 0; index < desiredCount; index += 1) {
        const layer = index % Math.max(1, layers);
        const z = (layer + Math.random()) / Math.max(1, layers);
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          size: (0.35 + Math.random() * 1.6) * (0.55 + z * 0.8) * starSize,
          phase: Math.random() * Math.PI * 2,
          drift: (Math.random() - 0.5) * (0.2 + z * 0.8),
          color: colorForStar(index, starColors, hueShift, saturation),
        });
      }
    };

    const spawnMeteor = (now: number) => {
      if (reducedMotion || meteors.length > 2) return;
      const fromLeft = Math.random() > 0.38;
      meteors.push({
        x: fromLeft ? -100 : width * (0.55 + Math.random() * 0.35),
        y: Math.random() * height * 0.48,
        length: 65 + Math.random() * 160,
        angle: fromLeft ? 0.25 + Math.random() * 0.25 : 2.4 + Math.random() * 0.25,
        speed: 380 + Math.random() * 360,
        life: 0,
        maxLife: 720 + Math.random() * 900,
        alpha: 0.34 + Math.random() * 0.48,
      });
      nextMeteorAt = now + (6500 + Math.random() * 12000) / Math.max(0.2, speed);
    };

    const burst = (x: number, y: number) => {
      const count = reducedMotion ? 5 : 24;
      ripples.push({ x, y, life: 0, maxLife: reducedMotion ? 360 : 760 });
      for (let index = 0; index < count; index += 1) {
        dust.push({
          x,
          y,
          angle: (Math.PI * 2 * index) / count + Math.random() * 0.35,
          speed: 25 + Math.random() * 105,
          life: 0,
          maxLife: 520 + Math.random() * 650,
          size: 0.7 + Math.random() * 1.8,
          twist: (Math.random() - 0.5) * 2,
        });
      }
      onInteractionRef.current?.({ x, y, kind: "stardust" });
    };

    const draw = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.045, (now - lastTime) / 1000);
      lastTime = now;
      const motionScale = reducedMotion ? 0.12 : 1;
      context.clearRect(0, 0, width, height);
      context.fillStyle = lightMode ? "rgba(255,255,255,0.015)" : "rgba(5,4,9,0.13)";
      context.fillRect(0, 0, width, height);

      const pointerX = (pointer.x - 0.5) * (mouseInteraction && pointer.active ? 1 : 0);
      const pointerY = (pointer.y - 0.5) * (mouseInteraction && pointer.active ? 1 : 0);

      for (const star of stars) {
        const depth = 0.25 + star.z * 0.95;
        const driftDirection = direction === "forward" ? 1 : -1;
        star.x += (star.drift + driftDirection * starSpeed * (0.8 + star.z) * 7) * dt * motionScale * speed;
        star.y += Math.sin(now * 0.00018 + star.phase) * dt * starSpeed * 2.3 * motionScale;
        if (mouseRepulsion && pointer.active && !reducedMotion) {
          const dx = star.x / width - pointer.x;
          const dy = star.y / height - pointer.y;
          const distance = Math.max(0.08, Math.sqrt(dx * dx + dy * dy));
          if (distance < 0.28) {
            const force = ((0.28 - distance) / 0.28) * repulsionStrength * dt * 24;
            star.x += (dx / distance) * force * depth;
            star.y += (dy / distance) * force * depth;
          }
        }
        star.x = wrap(star.x, width);
        star.y = wrap(star.y, height);
        const twinkle = 1 + Math.sin(now * (0.00075 + star.z * 0.0008) + star.phase) * twinkleIntensity * 0.38;
        const alpha = Math.min(0.98, (0.2 + star.z * 0.68) * twinkle);
        const rotation = rotationSpeed * now * 0.00002 * depth * motionScale;
        const deltaX = star.x - width / 2;
        const deltaY = star.y - height / 2;
        const rotatedX = width / 2 + deltaX * Math.cos(rotation) - deltaY * Math.sin(rotation);
        const rotatedY = height / 2 + deltaX * Math.sin(rotation) + deltaY * Math.cos(rotation);
        const x = rotatedX + pointerX * depth * -18;
        const y = rotatedY + pointerY * depth * -14;
        const radius = Math.max(0.35, star.size * twinkle);

        context.globalAlpha = alpha;
        context.fillStyle = star.color;
        if (star.z > 0.78 && glowIntensity > 0.05) {
          context.shadowColor = star.color;
          context.shadowBlur = radius * (4 + glowIntensity * 8);
        }
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
        if (star.z > 0.9 && flareIntensity > 0.2) {
          context.globalAlpha = alpha * 0.22 * flareIntensity;
          context.strokeStyle = star.color;
          context.lineWidth = 0.5;
          context.beginPath();
          context.moveTo(x - radius * 6, y);
          context.lineTo(x + radius * 6, y);
          context.moveTo(x, y - radius * 6);
          context.lineTo(x, y + radius * 6);
          context.stroke();
        }
      }

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.life += dt * 1000;
        if (ripple.life >= ripple.maxLife) {
          ripples.splice(index, 1);
          continue;
        }
        const progress = ripple.life / ripple.maxLife;
        context.globalAlpha = (1 - progress) * 0.42;
        context.strokeStyle = progress < 0.3 ? "#F8F7F3" : "#D5BE93";
        context.lineWidth = 1 - progress * 0.55;
        context.shadowColor = "#D5BE93";
        context.shadowBlur = 8;
        context.beginPath();
        context.arc(ripple.x, ripple.y, 10 + progress * 145, 0, Math.PI * 2);
        context.stroke();
        context.shadowBlur = 0;
      }

      for (let index = dust.length - 1; index >= 0; index -= 1) {
        const particle = dust[index];
        particle.life += dt * 1000;
        if (particle.life >= particle.maxLife) {
          dust.splice(index, 1);
          continue;
        }
        const progress = particle.life / particle.maxLife;
        const radius = particle.speed * (particle.life / 1000);
        const x = particle.x + Math.cos(particle.angle + particle.twist * progress) * radius;
        const y = particle.y + Math.sin(particle.angle + particle.twist * progress) * radius;
        const alpha = Math.sin(Math.PI * progress) * 0.78;
        context.globalAlpha = alpha;
        context.fillStyle = progress < 0.2 ? "#F8F7F3" : "#D5BE93";
        context.shadowColor = "#D5BE93";
        context.shadowBlur = 9;
        context.beginPath();
        context.arc(x, y, particle.size * (1 - progress * 0.4), 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      }

      if (now >= nextMeteorAt) spawnMeteor(now);
      for (let index = meteors.length - 1; index >= 0; index -= 1) {
        const meteor = meteors[index];
        meteor.life += dt * 1000;
        if (meteor.life >= meteor.maxLife) {
          meteors.splice(index, 1);
          continue;
        }
        const progress = meteor.life / meteor.maxLife;
        const distance = meteor.speed * meteor.life / 1000;
        const x = meteor.x + Math.cos(meteor.angle) * distance;
        const y = meteor.y + Math.sin(meteor.angle) * distance;
        const fade = Math.sin(Math.PI * progress);
        const tailX = x - Math.cos(meteor.angle) * meteor.length * (0.45 + progress * 0.55);
        const tailY = y - Math.sin(meteor.angle) * meteor.length * (0.45 + progress * 0.55);
        const gradient = context.createLinearGradient(tailX, tailY, x, y);
        gradient.addColorStop(0, "rgba(139,130,184,0)");
        gradient.addColorStop(0.72, `rgba(184,200,232,${fade * meteor.alpha * 0.25})`);
        gradient.addColorStop(1, `rgba(248,247,243,${fade * meteor.alpha})`);
        context.globalAlpha = 1;
        context.strokeStyle = gradient;
        context.lineWidth = 1.1;
        context.beginPath();
        context.moveTo(tailX, tailY);
        context.lineTo(x, y);
        context.stroke();
        context.fillStyle = "#FFFFFF";
        context.shadowColor = "#FFFFFF";
        context.shadowBlur = 12;
        context.beginPath();
        context.arc(x, y, 1.8, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      }

      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / Math.max(1, bounds.width);
      pointer.y = (event.clientY - bounds.top) / Math.max(1, bounds.height);
      pointer.active = true;
      onInteractionRef.current?.({ x: event.clientX, y: event.clientY, kind: "pointer" });
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!clickWarp) return;
      burst(event.clientX, event.clientY);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);
    frame = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      media.removeEventListener?.("change", onMotionPreference);
    };
  }, [clickWarp, density, direction, flareIntensity, glowIntensity, hueShift, layers, lightMode, mouseInteraction, mouseRepulsion, repulsionStrength, rotationSpeed, saturation, speed, starColors, starSize, starSpeed, twinkleIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`galaxy-canvas${intro ? " galaxy-canvas--intro" : ""}`}
      aria-label={ariaLabel}
      role="img"
    />
  );
}
