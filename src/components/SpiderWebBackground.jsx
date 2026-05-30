import { useEffect, useRef } from 'react';

const nodeColors = [
  { fill: 'rgba(56, 189, 248, 0.85)', glow: 'rgba(56, 189, 248, 0.28)' },
  { fill: 'rgba(59, 130, 246, 0.82)', glow: 'rgba(59, 130, 246, 0.28)' },
  { fill: 'rgba(34, 197, 94, 0.78)', glow: 'rgba(34, 197, 94, 0.2)' },
  { fill: 'rgba(236, 72, 153, 0.72)', glow: 'rgba(236, 72, 153, 0.18)' },
];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export default function SpiderWebBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY };
    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];

    const makeNode = () => {
      const color = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      const speed = reduceMotion ? 0 : randomBetween(0.08, 0.34);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: randomBetween(-speed, speed),
        vy: randomBetween(-speed, speed),
        radius: randomBetween(1.2, 2.4),
        color,
        drift: randomBetween(0, Math.PI * 2),
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nodeCount = Math.min(88, Math.max(34, Math.floor((width * height) / 18000)));
      nodes = Array.from({ length: nodeCount }, makeNode);
    };

    const drawLine = (a, b, opacity, lineWidth = 1) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const updateNode = (node, time) => {
      if (reduceMotion) return;

      const pointerDx = node.x - pointer.x;
      const pointerDy = node.y - pointer.y;
      const pointerDistance = Math.hypot(pointerDx, pointerDy);
      if (pointerDistance < 120) {
        const push = (120 - pointerDistance) / 120;
        node.x += (pointerDx / pointerDistance) * push * 1.25 || 0;
        node.y += (pointerDy / pointerDistance) * push * 1.25 || 0;
      }

      node.x += node.vx + Math.sin(time / 1400 + node.drift) * 0.08;
      node.y += node.vy + Math.cos(time / 1500 + node.drift) * 0.08;

      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = -20;
    };

    const render = (time = 0) => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => updateNode(node, time));

      const maxDistance = width < 700 ? 122 : 168;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            drawLine(a, b, opacity);
          }
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2);
        ctx.fillStyle = node.color.glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color.fill;
        ctx.fill();
      });

      if (!reduceMotion) rafId = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const handlePointerLeave = () => {
      pointer.x = Number.POSITIVE_INFINITY;
      pointer.y = Number.POSITIVE_INFINITY;
    };

    resize();
    render();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="cyber-web-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="cyber-web-canvas" />
    </div>
  );
}
