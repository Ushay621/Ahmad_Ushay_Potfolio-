"use client";

import { useEffect, useState, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const lastTrailTimeRef = useRef(0);

  useEffect(() => {
    // Only show cursor on devices that support hover
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasHover) return;

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add trail point every 15ms for smoother line
      const now = Date.now();
      if (now - lastTrailTimeRef.current > 15) {
        lastTrailTimeRef.current = now;
        setTrail((prev) => {
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, timestamp: now }];
          // Keep only last 30 points for performance
          return newTrail.slice(-30);
        });
      }
    };

    // Check for interactive elements on mouse move
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = Boolean(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"
      );
      setIsHovering(isInteractive);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]); // Clear trail when mouse leaves
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousemove", checkHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Clean up old trail points
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((point) => now - point.timestamp < 600));
    }, 50);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(cleanupInterval);
    };
  }, []);

  if (!isVisible || trail.length < 2) {
    return (
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isHovering ? "32px" : "16px",
            height: isHovering ? "32px" : "16px",
            backgroundColor: "#39ff14",
            boxShadow: `0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14`,
          }}
        />
      </div>
    );
  }

  // Create SVG path from trail points with smooth curves
  const createPath = () => {
    if (trail.length < 2) return "";
    
    let path = `M ${trail[0].x} ${trail[0].y}`;
    for (let i = 1; i < trail.length; i++) {
      const prev = trail[i - 1];
      const curr = trail[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      path += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
    }
    // Add final point
    const last = trail[trail.length - 1];
    path += ` L ${last.x} ${last.y}`;
    return path;
  };

  const path = createPath();
  const now = Date.now();
  
  // Calculate average opacity for the trail
  const avgAge = trail.length > 0 
    ? trail.reduce((sum, p) => sum + (now - p.timestamp), 0) / trail.length 
    : 0;
  const trailOpacity = Math.max(0.3, 1 - avgAge / 600);

  return (
    <>
      {/* Trail line - SVG path */}
      <svg
        className="fixed pointer-events-none z-[9997]"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path
          d={path}
          fill="none"
          stroke="#39ff14"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity={trailOpacity}
          style={{
            filter: "drop-shadow(0 0 3px #39ff14) drop-shadow(0 0 6px #39ff14)",
            transition: "stroke-opacity 0.1s ease-out",
          }}
        />
      </svg>

      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isHovering ? "32px" : "16px",
            height: isHovering ? "32px" : "16px",
            backgroundColor: "#39ff14",
            boxShadow: `0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14`,
          }}
        />
      </div>
    </>
  );
}

