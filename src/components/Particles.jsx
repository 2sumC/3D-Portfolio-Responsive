import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef, useState } from "react";

function MousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

export const Particles = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  // Shooting star options
  shootingStars = true,
  shootingStarInterval = 1500,
  ...props
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const shootingStarsRef = useRef([]);
  const mousePosition = MousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef(null);
  const resizeTimeout = useRef(null);
  const shootingStarTimer = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();

    if (shootingStars) {
      scheduleShootingStar();
    }

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvas();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      if (shootingStarTimer.current) {
        clearTimeout(shootingStarTimer.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  // --- Shooting Star Logic ---
  const scheduleShootingStar = () => {
    const randomDelay =
      shootingStarInterval * 0.5 + Math.random() * shootingStarInterval;
    shootingStarTimer.current = setTimeout(() => {
      createShootingStar();
      scheduleShootingStar();
    }, randomDelay);
  };

  const createShootingStar = () => {
    const { w, h } = canvasSize.current;
    if (w === 0 || h === 0) return;

    // Start from random position along the top or right edge
    const startFromTop = Math.random() > 0.3;
    const startX = startFromTop
      ? Math.random() * w * 0.8 + w * 0.1
      : w * 0.7 + Math.random() * w * 0.3;
    const startY = startFromTop
      ? -10
      : Math.random() * h * 0.3;

    // Angle: mostly going down-left, with some variation
    const angle = Math.PI * (0.55 + Math.random() * 0.25);
    const speed = 6 + Math.random() * 6;

    shootingStarsRef.current.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      decay: 0.008 + Math.random() * 0.008,
      tailLength: 40 + Math.random() * 60,
      size: 1 + Math.random() * 1.5,
    });
  };

  const drawShootingStars = () => {
    if (!context.current) return;
    const ctx = context.current;

    shootingStarsRef.current.forEach((star, i) => {
      // Update position
      star.x += star.vx;
      star.y += star.vy;
      star.life -= star.decay;

      if (star.life <= 0) {
        shootingStarsRef.current.splice(i, 1);
        return;
      }

      // Draw the tail as a gradient line
      const tailX = star.x - star.vx * (star.tailLength / Math.hypot(star.vx, star.vy)) * star.life;
      const tailY = star.y - star.vy * (star.tailLength / Math.hypot(star.vx, star.vy)) * star.life;

      const gradient = ctx.createLinearGradient(
        tailX,
        tailY,
        star.x,
        star.y
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(0.6, `rgba(200, 180, 255, ${star.life * 0.3})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${star.life * 0.9})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(star.x, star.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = star.size;
      ctx.lineCap = "round";
      ctx.stroke();

      // Draw bright head glow
      const glowRadius = star.size * 2.5 * star.life;
      const headGlow = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, glowRadius
      );
      headGlow.addColorStop(0, `rgba(255, 255, 255, ${star.life * 0.8})`);
      headGlow.addColorStop(0.4, `rgba(180, 160, 255, ${star.life * 0.3})`);
      headGlow.addColorStop(1, `rgba(180, 160, 255, 0)`);

      ctx.beginPath();
      ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = headGlow;
      ctx.fill();
    });
  };

  // --- Original Particle Logic ---
  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);

      circles.current = [];
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams();
        drawCircle(circle);
      }
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (value, start1, end1, start2, end2) => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;

      drawCircle(circle, true);

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });

    // Draw shooting stars on top of particles
    drawShootingStars();

    rafID.current = window.requestAnimationFrame(animate);
  };

  return (
    <div
      className={twMerge("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};