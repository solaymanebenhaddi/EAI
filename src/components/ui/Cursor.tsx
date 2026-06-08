'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    
    // Position starts out of screen
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateCursor = () => {
      // Lerp for smooth lag
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      setPosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for links
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('data-cursor')
      ) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }

      // Check for images (that are not inside a link usually, or specific image containers)
      if (target.tagName.toLowerCase() === 'img' || target.hasAttribute('data-cursor-image')) {
        setIsHoveringImage(true);
      } else {
        setIsHoveringImage(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-brass/50 pointer-events-none z-[9999] flex items-center justify-center transition-colors duration-200 ${
        isHoveringLink ? 'bg-brass/10 border-brass' : 'bg-brass/30'
      }`}
      animate={{
        x: position.x - 20, // center the 40px cursor
        y: position.y - 20,
        scale: isHoveringLink ? 2.5 : isHoveringImage ? 1.5 : 1,
        opacity: position.x === -100 ? 0 : 1, // hide initially
      }}
      transition={{
        scale: { type: 'tween', duration: 0.15 },
        x: { type: 'tween', duration: 0 }, // handle by lerp
        y: { type: 'tween', duration: 0 },
      }}
    />
  );
}
