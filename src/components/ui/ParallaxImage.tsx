'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  offset?: number;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  fill = true,
  width,
  height,
  className = '',
  containerClassName = '',
  offset = 60,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <motion.div
        style={{ y }}
        className="relative w-full h-full scale-110" // scale up to avoid gaps on parallax
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          priority={priority}
          className={`object-cover ${className}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  );
}
