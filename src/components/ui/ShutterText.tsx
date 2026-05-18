"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShutterTextProps {
  text: string;
  className?: string;
  charClassName?: string;
}

export function ShutterText({
  text,
  className = "",
  charClassName = "",
}: ShutterTextProps) {
  const characters = text.split("");

  return (
    <div className={cn("relative flex flex-wrap justify-center items-center select-none", className)}>
      {characters.map((char, i) => (
        <div
          key={i}
          className="relative px-[0.1vw] overflow-hidden group"
        >
          {/* Main Character - fading in and un-blurring */}
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
            className={cn("inline-block text-ink dark:text-lumen font-black leading-none tracking-tighter", charClassName)}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Top Slice Layer (Brushed Gold/Brass Shutter) */}
          <motion.span
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              delay: i * 0.04,
              ease: "easeInOut",
            }}
            className={cn("absolute inset-0 leading-none font-black text-brass pointer-events-none", charClassName)}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
          >
            {char}
          </motion.span>

          {/* Middle Slice Layer (Travertine Shutter) */}
          <motion.span
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "-100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              delay: i * 0.04 + 0.1,
              ease: "easeInOut",
            }}
            className={cn("absolute inset-0 leading-none font-black text-mortar dark:text-stone pointer-events-none", charClassName)}
            style={{
              clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
            }}
          >
            {char}
          </motion.span>

          {/* Bottom Slice Layer (Brushed Gold/Brass Shutter) */}
          <motion.span
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              delay: i * 0.04 + 0.2,
              ease: "easeInOut",
            }}
            className={cn("absolute inset-0 leading-none font-black text-brass pointer-events-none", charClassName)}
            style={{
              clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
            }}
          >
            {char}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

export default ShutterText;
