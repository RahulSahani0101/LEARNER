import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

const COLORS = ["124, 58, 237", "37, 99, 235", "6, 182, 212"];

/**
 * Animated fixed canvas background with particles and mouse repulsion.
 */
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 1,
      opacity: Math.random() * 0.3 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let mouseX = -9999;
    let mouseY = -9999;
    let frameId = 0;

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const force = (80 - distance) / 80;
          p.vx += (dx / Math.max(distance, 1)) * force * 0.08;
          p.vy += (dy / Math.max(distance, 1)) * force * 0.08;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        context.beginPath();
        context.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const nx = p.x - q.x;
          const ny = p.y - q.y;
          const dist = Math.sqrt(nx * nx + ny * ny);
          if (dist < 120) {
            context.beginPath();
            context.strokeStyle = `rgba(124, 58, 237, ${0.14 - dist / 900})`;
            context.lineWidth = 1;
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.stroke();
          }
        }
      }

      frameId = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />;
}
