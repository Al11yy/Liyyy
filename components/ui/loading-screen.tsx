"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  duration?: number
  minDuration?: number
}

export function LoadingScreen({ duration = 5000, minDuration = 3000 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0)

  // Expanded list of greetings in different languages
  const greetings = [
    { text: "Hello", language: "English" },
    { text: "你好", language: "Chinese" },
    { text: "Bonjour", language: "French" }, // Replaced "Halo" with "Bonjour"
    { text: "こんにちは", language: "Japanese" },
    { text: "안녕하세요", language: "Korean" },
    { text: "Hola", language: "Spanish" },
    { text: "Ciao", language: "Italian" },
    { text: "Olá", language: "Portuguese" },
    { text: "Привет", language: "Russian" },
    { text: "مرحبا", language: "Arabic" },
    { text: "नमस्ते", language: "Hindi" },
    { text: "Hallo", language: "German" },
    { text: "Sawubona", language: "Zulu" },
    { text: "Namaste", language: "Nepali" },
    { text: "Salut", language: "Romanian" }, // Added another greeting
  ]

  useEffect(() => {
    // Cycle through greetings more slowly
    const greetingInterval = setInterval(() => {
      setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length)
    }, 1000) // Increased from 700 to 1000ms for slower transitions

    // Set timeout to hide loading screen
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, duration)

    return () => {
      clearInterval(greetingInterval)
      clearTimeout(loadingTimeout)
    }
  }, [duration, greetings.length])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }} // Increased exit duration from 0.5 to 0.8
        >
          <div className="relative flex flex-col items-center">
            {/* Greeting animation */}
            <div className="h-40 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGreetingIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }} // Increased from 0.4 to 0.6
                  className="flex flex-col items-center"
                >
                  <h1 className="text-6xl font-bold text-white mb-2">{greetings[currentGreetingIndex].text}</h1>
                  <p className="text-sm text-gray-400">{greetings[currentGreetingIndex].language}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Loading indicator */}
            <motion.div
              className="mt-8 flex space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-3 h-3 rounded-full bg-white"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: dot * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

