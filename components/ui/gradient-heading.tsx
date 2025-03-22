import { cn } from "@/lib/utils"
import type React from "react"

interface GradientHeadingProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "tertiary"
  size?: "sm" | "md" | "lg" | "xl" | "xxl"
}

export function GradientHeading({ children, className, variant = "primary", size = "lg" }: GradientHeadingProps) {
  const variants = {
    primary: "from-blue-600 to-purple-600",
    secondary: "from-purple-600 to-pink-600",
    tertiary: "from-green-600 to-blue-600",
  }

  const sizes = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
    xl: "text-4xl md:text-5xl",
    xxl: "text-5xl md:text-6xl",
  }

  return (
    <h2
      className={cn(
        "font-bold tracking-tight",
        sizes[size],
        "bg-gradient-to-r bg-clip-text text-transparent",
        variants[variant],
        className,
      )}
    >
      {children}
    </h2>
  )
}

