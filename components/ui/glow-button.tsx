"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  className?: string
  glowIntensity?: "low" | "medium" | "high"
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ text = "Button", className, glowIntensity = "medium", ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false)

    // Define glow intensity levels
    const glowIntensityMap = {
      low: "0px 0px 10px",
      medium: "0px 0px 20px",
      high: "0px 0px 30px",
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative overflow-visible rounded-full py-2.5 px-6", // Changed overflow-hidden to overflow-visible
          "font-medium bg-black text-white",
          "border border-white/20 backdrop-blur-sm",
          "transition-all duration-300",
          className,
        )}
        initial={{ boxShadow: `${glowIntensityMap[glowIntensity]} rgba(255, 255, 255, 0.1)` }}
        whileHover={{
          boxShadow: `${glowIntensityMap[glowIntensity]} rgba(255, 255, 255, 0.3)`,
          scale: 1.03,
        }}
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...props}
      >
        {/* Subtle glow background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/5"
          animate={
            isHovered
              ? {
                  opacity: [0.05, 0.1, 0.05],
                }
              : {}
          }
          transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
        />

        {/* Pulse rings - positioned with negative margins to avoid cutoff */}
        {isHovered && (
          <motion.div
            className="absolute -inset-4 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-white/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.4, opacity: [0, 0.3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
                delay: 0.2,
              }}
            />
          </motion.div>
        )}

        {/* Text with subtle scale effect */}
        <motion.span
          className="relative z-10 block"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.span>
      </motion.button>
    )
  },
)

GlowButton.displayName = "GlowButton"

export { GlowButton }

