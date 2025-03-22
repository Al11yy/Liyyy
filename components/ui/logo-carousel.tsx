"use client"

import React, { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface Logo {
  name: string
  id: number
  img: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

// Improve LogoCarousel for tablet display
const LogoColumn: React.FC<LogoColumnProps> = React.memo(({ logos, index, currentTime }) => {
  const cycleInterval = 3000 // Increased for better performance
  const columnDelay = index * 200
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length)
  const currentIndex = Math.floor(adjustedTime / cycleInterval)
  const CurrentLogo = logos[currentIndex].img

  return (
    <motion.div
      className="relative h-10 w-14 sm:h-12 sm:w-16 md:h-14 md:w-24 lg:h-24 lg:w-48 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${logos[currentIndex].id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "10%", opacity: 0 }}
          animate={{
            y: "0%",
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 200, // Reduced for better performance
              damping: 20,
              mass: 1,
              bounce: 0.2,
              duration: 0.5,
            },
          }}
          exit={{
            y: "-20%",
            opacity: 0,
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: 0.3,
            },
          }}
        >
          <CurrentLogo className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 max-h-[80%] max-w-[80%] object-contain" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
})

LogoColumn.displayName = "LogoColumn"

interface LogoCarouselProps {
  columnCount?: number
  logos: Logo[]
}

export function LogoCarousel({ columnCount = 3, logos }: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  // Optimized time update with less frequent updates
  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 200) // Increased time step for better performance
  }, [])

  useEffect(() => {
    const intervalId = setInterval(updateTime, 200) // Reduced update frequency
    return () => clearInterval(intervalId)
  }, [updateTime])

  // Distribute logos once on mount or when props change
  useEffect(() => {
    // Ensure we always show at least 3 columns (or the specified number)
    const effectiveColumnCount = Math.min(columnCount, 3) // Limit to max 3 columns

    // Simple distribution - each column gets a subset of logos
    const distributedLogos: Logo[][] = Array.from({ length: effectiveColumnCount }, () => [])

    logos.forEach((logo, index) => {
      distributedLogos[index % effectiveColumnCount].push(logo)
    })

    setLogoSets(distributedLogos)
  }, [logos, columnCount])

  return (
    <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4">
      {logoSets.map((logos, index) => (
        <LogoColumn key={index} logos={logos} index={index} currentTime={currentTime} />
      ))}
    </div>
  )
}

