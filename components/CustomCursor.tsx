"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onLinkHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onLinkHoverStart);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onLinkHoverStart);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-4 w-4 rounded-full bg-red-500 mix-blend-difference md:block"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-12 w-12 rounded-full border border-red-500/50 mix-blend-difference md:block"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: clicked ? 1.2 : linkHovered ? 2 : 1,
          opacity: linkHovered ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.8 }}
      />
    </>
  );
}
