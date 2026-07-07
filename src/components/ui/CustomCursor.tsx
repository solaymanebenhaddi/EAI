"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Hide cursor on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      return
    }

    setIsVisible(true)

    const onMouseMove = (e: MouseEvent) => {
      // Small dot follows instantly
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      })

      // Large ring follows with delay
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      })
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseover", onMouseOver)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseover", onMouseOver)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 border border-eai-olive rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 flex items-center justify-center"
        style={{
          transform: isHovering ? "scale(1.5)" : "scale(1)",
          backgroundColor: isHovering ? "rgba(223, 206, 161, 0.1)" : "transparent",
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-eai-olive rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300"
        style={{
          transform: isHovering ? "scale(0)" : "scale(1)",
        }}
      />
    </>
  )
}
