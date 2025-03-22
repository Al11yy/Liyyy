"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Quote {
  text: string
  author: string
}

interface RotatingQuotesProps {
  quotes: Quote[]
  interval?: number
  className?: string
}

export function RotatingQuotes({ quotes, interval = 8000, className }: RotatingQuotesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, interval)

    return () => clearInterval(timer)
  }, [quotes.length, interval])

  return (
    <div className={cn("relative h-auto min-h-[120px] overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-2"
        >
          <p className="text-white/95 text-lg md:text-xl italic mb-3 max-w-xl font-light leading-relaxed">
            "{quotes[currentIndex].text}"
          </p>
          <p className="text-white/80 text-sm md:text-base font-medium">— {quotes[currentIndex].author}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

