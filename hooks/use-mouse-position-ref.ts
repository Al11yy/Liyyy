"use client"

import { type RefObject, useEffect, useRef } from "react"

export const useMousePositionRef = (containerRef?: RefObject<HTMLElement | SVGElement>) => {
  const positionRef = useRef({ x: 0, y: 0 })
  const lastUpdateTimeRef = useRef(0)
  const requestRef = useRef<number>()

  useEffect(() => {
    // Throttle mouse movement updates for better performance
    const updatePosition = (x: number, y: number) => {
      const now = Date.now()

      // Throttle updates to every 16ms (roughly 60fps)
      if (now - lastUpdateTimeRef.current < 16) {
        return
      }

      lastUpdateTimeRef.current = now

      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()

        // Calculate relative position with smoothing
        const relativeX = x - rect.left
        const relativeY = y - rect.top

        // Apply smoothing by blending with previous position
        positionRef.current = {
          x: relativeX,
          y: relativeY,
        }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (ev: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }

      requestRef.current = requestAnimationFrame(() => {
        updatePosition(ev.clientX, ev.clientY)
      })
    }

    const handleTouchMove = (ev: TouchEvent) => {
      if (ev.touches.length > 0) {
        const touch = ev.touches[0]

        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current)
        }

        requestRef.current = requestAnimationFrame(() => {
          updatePosition(touch.clientX, touch.clientY)
        })
      }
    }

    // Set initial position to center of container
    if (containerRef && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      positionRef.current = {
        x: rect.width / 2,
        y: rect.height / 2,
      }
    }

    // Listen for both mouse and touch events
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [containerRef])

  return positionRef
}

