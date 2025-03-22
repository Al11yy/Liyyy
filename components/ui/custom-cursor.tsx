"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  size?: number
  ringSize?: number
}

export function CustomCursor({ size = 8, ringSize = 40 }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorColor, setCursorColor] = useState("#ffffff")
  const [ringColor, setRingColor] = useState("rgba(255, 255, 255, 0.3)")
  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (isInitializedRef.current) return
    isInitializedRef.current = true

    // Throttle function to limit execution frequency
    const throttle = (callback: Function, limit: number) => {
      let waiting = false
      return function (...args: any[]) {
        if (!waiting) {
          callback.apply(this, args)
          waiting = true
          setTimeout(() => {
            waiting = false
          }, limit)
        }
      }
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorType = throttle((e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement
      if (target) {
        const computedStyle = window.getComputedStyle(target)
        setIsPointer(computedStyle.cursor === "pointer")

        // Simple color detection based on background
        const isDarkMode =
          document.documentElement.classList.contains("dark") ||
          window.matchMedia("(prefers-color-scheme: dark)").matches

        setCursorColor(isDarkMode ? "#ffffff" : "#000000")
        setRingColor(isDarkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)")
      }
    }, 100)

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousemove", updateCursorType)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Hide default cursor
    document.documentElement.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousemove", updateCursorType)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)

      // Restore default cursor
      document.documentElement.style.cursor = ""
    }
  }, [])

  // Skip rendering on server
  if (typeof window === "undefined") return null

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none"
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.1,
          stiffness: 400,
        }}
        style={{
          width: size,
          height: size,
          backgroundColor: cursorColor,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] rounded-full pointer-events-none"
        animate={{
          x: position.x - ringSize / 2,
          y: position.y - ringSize / 2,
          scale: isPointer ? 1.2 : isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          mass: 0.2,
          stiffness: 300,
        }}
        style={{
          width: ringSize,
          height: ringSize,
          border: `1px solid ${ringColor}`,
          backgroundColor: isPointer ? "rgba(59, 130, 246, 0.1)" : "transparent",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}

