"use client"

import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef } from "react"
import { useAnimationFrame } from "framer-motion"

import { cn } from "@/lib/utils"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void
  unregisterElement: (id: string) => void
}

const FloatingContext = createContext<FloatingContextType | null>(null)

interface FloatingProps {
  children: ReactNode
  className?: string
  sensitivity?: number
  easingFactor?: number
}

const Floating = ({ children, className, sensitivity = 1, easingFactor = 0.05, ...props }: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement
        depth: number
        currentPosition: { x: number; y: number }
        targetPosition: { x: number; y: number }
      }
    >(),
  )
  const mousePositionRef = useMousePositionRef(containerRef)
  const isInitializedRef = useRef(false)

  const registerElement = useCallback((id: string, element: HTMLDivElement, depth: number) => {
    elementsMap.current.set(id, {
      element,
      depth,
      currentPosition: { x: 0, y: 0 },
      targetPosition: { x: 0, y: 0 },
    })
  }, [])

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id)
  }, [])

  // Use a more stable animation frame with debouncing
  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return

    // Limit delta to prevent jumps during frame drops
    const safeDelta = Math.min(delta, 100)
    const normalizedDelta = safeDelta / 16.67 // Normalize to 60fps

    // Adjust easing based on frame rate for consistent movement
    const adjustedEasing = easingFactor * normalizedDelta

    // Calculate center of container for relative movement
    const containerRect = containerRef.current.getBoundingClientRect()
    const centerX = containerRect.width / 2
    const centerY = containerRect.height / 2

    // Get relative mouse position from center
    const relativeX = mousePositionRef.current.x - centerX
    const relativeY = mousePositionRef.current.y - centerY

    elementsMap.current.forEach((data) => {
      // Reduce sensitivity for smoother movement
      const effectiveSensitivity = sensitivity * 0.5
      const strength = (data.depth * effectiveSensitivity) / 20

      // Calculate new target position with dampening
      data.targetPosition = {
        x: relativeX * strength,
        y: relativeY * strength,
      }

      // Smooth transition to target with variable easing
      const dx = data.targetPosition.x - data.currentPosition.x
      const dy = data.targetPosition.y - data.currentPosition.y

      // Apply easing with distance-based damping
      // Slower movement for larger distances
      const distance = Math.sqrt(dx * dx + dy * dy)
      const damping = Math.min(1, 10 / (distance + 10))

      // Update position with damping
      data.currentPosition.x += dx * adjustedEasing * damping
      data.currentPosition.y += dy * adjustedEasing * damping

      // Apply transform with hardware acceleration
      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
    })
  })

  // Initialize once to prevent jumps
  useEffect(() => {
    if (!isInitializedRef.current && containerRef.current) {
      isInitializedRef.current = true

      // Set initial positions to prevent jumps on first render
      const containerRect = containerRef.current.getBoundingClientRect()
      mousePositionRef.current = {
        x: containerRect.width / 2,
        y: containerRect.height / 2,
      }
    }
  }, [mousePositionRef])

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div ref={containerRef} className={cn("absolute top-0 left-0 w-full h-full", className)} {...props}>
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

export default Floating

interface FloatingElementProps {
  children: ReactNode
  className?: string
  depth?: number
}

export const FloatingElement = ({ children, className, depth = 1 }: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return

    const nonNullDepth = depth ?? 0.01

    context.registerElement(idRef.current, elementRef.current, nonNullDepth)
    return () => context.unregisterElement(idRef.current)
  }, [depth, context])

  return (
    <div
      ref={elementRef}
      className={cn("absolute will-change-transform", "transition-transform duration-[50ms] ease-out", className)}
    >
      {children}
    </div>
  )
}

