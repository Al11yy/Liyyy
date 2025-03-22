"use client"

import type React from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[20rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6",
        className,
      )}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  style = {},
  hoverStyle = {},
}: {
  name: string
  className: string
  background: ReactNode
  Icon: any
  description: string
  href: string
  cta: string
  style?: React.CSSProperties
  hoverStyle?: React.CSSProperties
}) => (
  <motion.div
    key={name}
    className={cn(
      "group relative flex flex-col overflow-hidden rounded-xl",
      "transform-gpu border border-gray-800",
      "transition-all duration-300 bg-black",
      className,
    )}
    whileHover={{
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div
      className={cn(
        "relative z-10 overflow-hidden pointer-events-auto",
        name === "Connect with me" ? "h-auto min-h-[60%] md:h-3/4" : "h-3/4",
      )}
    >
      <motion.div
        className="w-full h-full pointer-events-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {background}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>

    <div className="z-10 flex transform-gpu flex-col gap-1 p-4 sm:p-5 md:p-6 mt-auto">
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 origin-left transform-gpu text-white group-hover:text-blue-400 transition-colors duration-300" />
      </motion.div>
      <motion.h3
        className="text-base sm:text-lg md:text-lg font-semibold text-white mt-1 group-hover:text-blue-400 transition-colors duration-300"
        initial={{ y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {name}
      </motion.h3>
      <motion.p
        className="max-w-lg text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors duration-300"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        {description}
      </motion.p>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
      />
    </div>
  </motion.div>
)

export { BentoCard, BentoGrid }

