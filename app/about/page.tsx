"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiPhp, SiWordpress } from "react-icons/si"
import { SocialLinks } from "@/components/social-links"
import Footer from "@/components/footer"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { GlowButton } from "@/components/ui/glow-button"

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()

    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)

    // Show loading screen for longer
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen duration={5000} />}

      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </Link>
          <Link href="/">
            <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
              <Home className="w-5 h-5" />
              <span className="sr-only">Home</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Main content with Background Paths */}
      <BackgroundPaths title="About Me" className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Profile section with 2x2 grid layout */}
            <div className="relative mb-24 md:mb-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* First row - Left: Profile image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-xl overflow-hidden border-2 border-white/20 shadow-xl shadow-purple-500/10"
                >
                  <div className="relative aspect-[4/3]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-500/10 to-teal-500/20 mix-blend-overlay"></div>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/orang%20ganteng.jpg-Xd0rihlkdEEIqEA7uVINmu1EcaeySz.jpeg"
                      alt="Ghazam Al Aliy Ravandy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </motion.div>

                {/* First row - Right: Development Focus card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-black/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-purple-500/30 transform hover:scale-[1.02] transition-transform flex flex-col justify-center h-full"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-purple-400">
                    Development Focus
                  </h3>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    As a Vocational High School student in Informatics, I focus on developing effective and innovative
                    technology solutions. I strive to apply theoretical knowledge to practical projects, with the goal
                    of creating useful applications and enhancing user experience.
                  </p>
                </motion.div>

                {/* Second row - Left: Batman image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="rounded-xl overflow-hidden border-2 border-white/20 shadow-xl shadow-blue-500/10"
                >
                  <div className="relative aspect-[4/3]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-teal-500/20 mix-blend-overlay"></div>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250316-WA0003.jpg-eTn7eoxdkIlYHN6bI4OCCh2Syns046.jpeg"
                      alt="Batman on Phone"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </motion.div>

                {/* Second row - Right: Skill Development card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-black/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-blue-500/30 transform hover:scale-[1.02] transition-transform flex flex-col justify-center h-full"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-blue-400">
                    Skill Development
                  </h3>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    With a strong foundation in web development, I continuously expand my technical knowledge and
                    skills. I actively follow the latest technology trends and strive to integrate them into my projects
                    to improve efficiency and functionality.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Skills section - increased gap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-24 md:mb-32"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-8 md:mb-10 text-center">My Skills</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8">
                <SkillCard icon={<SiHtml5 className="text-[#E34F26]" />} name="HTML" />
                <SkillCard icon={<SiCss3 className="text-[#1572B6]" />} name="CSS" />
                <SkillCard icon={<SiJavascript className="text-[#F7DF1E]" />} name="JavaScript" />
                <SkillCard icon={<SiReact className="text-[#61DAFB]" />} name="React" />
                <SkillCard icon={<SiTailwindcss className="text-[#06B6D4]" />} name="Tailwind CSS" />
                <SkillCard icon={<SiBootstrap className="text-[#7952B3]" />} name="Bootstrap" />
                <SkillCard icon={<SiPhp className="text-[#777BB4]" />} name="PHP" />
                <SkillCard icon={<SiWordpress className="text-[#21759B]" />} name="WordPress" />
              </div>
            </motion.div>

            {/* Education section - increased gap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-32"
            >
              <h3 className="text-2xl font-bold mb-10 text-center">Education</h3>

              <div className="space-y-10">
                <TimelineItem
                  year="2024 - now"
                  title="Vocational High School"
                  institution="SMK Informatika"
                  description="Currently studying Computer Science and Information Technology with a focus on web development."
                />
                <TimelineItem
                  year="2021 - 2024"
                  title="Junior High School"
                  institution="SMP SWASTA"
                  description="Completed junior high school education with focus on general studies."
                />
                <TimelineItem
                  year="2015 - 2021"
                  title="Elementary School"
                  institution="SD SWASTA"
                  description="Completed elementary education with excellent academic performance."
                />
              </div>
            </motion.div>

            {/* Connect section - increased gap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-center mb-16"
            >
              <h3 className="text-2xl font-bold mb-10">Let's Connect</h3>
              <p className="text-white/80 mb-12 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                Feel free to reach out to me through any of the platforms below.
              </p>

              <div className="flex justify-center mb-12">
                <SocialLinks className="flex-col sm:flex-row items-center justify-center" />
              </div>

              <Link href="/">
                <GlowButton text="Back to Home" className="w-48" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </BackgroundPaths>

      {/* Footer */}
      <Footer />
    </main>
  )
}

// Skill Card Component
function SkillCard({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      className="bg-white/5 rounded-lg p-4 flex flex-col items-center text-center border border-white/10"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h4 className="font-medium">{name}</h4>
    </motion.div>
  )
}

// Timeline Item Component
function TimelineItem({
  year,
  title,
  institution,
  description,
}: {
  year: string
  title: string
  institution: string
  description: string
}) {
  return (
    <div className="relative pl-8 border-l border-white/20">
      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500 -translate-x-1/2"></div>
      <div className="mb-1 text-sm text-white/60">{year}</div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="text-white/80 mb-1">{institution}</div>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  )
}

