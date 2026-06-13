import React, { useEffect, useRef } from "react";

export default function Fireworks({ run }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!run) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    const colors = ["#ff0", "#ff3", "#f80", "#f00", "#0ff", "#0f0"];

    const createExplosion = (x, y) => {
      for (let i = 0; i < 120; i++) {
        particles.push({
          x,
          y,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 7 + 2,
          radius: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 120
        });
      }
    };

    // 🎆 multiple explosions
    let count = 0;
    const interval = setInterval(() => {
      createExplosion(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.6
      );

      count++;
      if (count > 6) clearInterval(interval);
    }, 200);

   const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  });

  frameRef.current = requestAnimationFrame(animate);
};

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      particles = [];
    };
  }, [run]);

  if (!run) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        pointerEvents: "none"
      }}
    />
  );
}