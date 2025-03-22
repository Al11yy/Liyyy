"use client"

import { useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  fontSize?: string
  delay?: number
  once?: boolean
  animationType?: "bounce" | "wave" | "reveal" | "typewriter"
  color?: string
}

export function AnimatedText({
  text,
  className,
  fontSize = "text-5xl md:text-7xl",
  delay = 0,
  once = true,
  animationType = "wave",
  color = "text-white",
}: AnimatedTextProps) {
  const controls = useAnimationControls()
  const textArray = Array.from(text)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  }

  const getChildVariant = () => {
    switch (animationType) {
      case "bounce":
        return {
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 200,
            },
          },
          hidden: {
            opacity: 0,
            y: 20,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 200,
            },
          },
        }
      case "reveal":
        return {
          visible: (i: number) => ({
            opacity: 1,
            transition: {
              delay: i * 0.1,
            },
          }),
          hidden: { opacity: 0 },
        }
      case "typewriter":
        return {
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
          hidden: {
            opacity: 0,
            x: -20,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
        }
      case "wave":
      default:
        return {
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
          hidden: {
            opacity: 0,
            y: 20,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
        }
    }
  }

  const child = getChildVariant()

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  return (
    <motion.div
      className={cn("flex overflow-hidden", fontSize, color, className)}
      variants={container}
      initial="hidden"
      animate={controls}
      style={{ display: "inline-block" }}
    >
      {textArray.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          className="font-calendas italic"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

