"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { ProjectCard } from "@/components/ui/project-card"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { ShootingStars } from "@/components/ui/shooting-stars"
import Footer from "@/components/footer"
import { exampleImages } from "@/utils/demo-images"
import { GlowButton } from "@/components/ui/glow-button"

// Full projects array with all projects
const allProjects = [
  {
    title: "Personal Portfolio",
    description:
      "My personal portfolio website built with Next.js and Tailwind CSS.",
    imageUrl: exampleImages[2].url,
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
  },
  {
    title: "ExproTravel",
    description:
      "Travel website showcasing destinations and travel packages with booking functionality.",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ExproTravel-8fBbxe7IznIDzr1gRwx7LzQLagcoFB.png",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl:
      "https://al11yy.github.io/Modul-3-Sertikom-Pertama-web-traveling-/#home",
  },
  {
    title: "Wedding Invitation",
    description:
      "Digital wedding invitation with countdown timer and event details.",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding-zCdGiQAdb93eUJ7oI6Gh1kRw3OBUl4.png",
    tags: ["Bootstrap", "JavaScript", "Responsive Design"],
    liveUrl:
      "https://al11yy.github.io/Modulo-5-Bootstrap-2-Wedding-invitation-page/",
  },
  {
    title: "TechEduca",
    description:
      "Educational platform website for technology courses and learning resources.",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/techeduca-UB4to89uR6FLCBtp4x2FHoW7gekdRZ.png",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://al11yy.github.io/Modul-2-Web-1-tech-educa/",
  },
  {
    title: "Friend's Portfolio",
    description: "Portfolio website designed for my friend Kyoz",
    imageUrl:
      "https://sjc.microlink.io/o8n6Lusd2IWCWmnQbeXPRutCLhJBgEyZqlUWwL8t3ixB-SMlcQ7rUAUF9KPNuAyjpyvnMnpV4zHL2pnwGN9ifg.jpeg",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://hadifawwaz.github.io/Personal_Website/",
  },
  {
    title: "Friend's Portfolio",
    description: "Portfolio website designed for my friend...",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portoXEON-HbyiJkUe5SAw34cxyUi1KilNPY9dmP.png",
    tags: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "#",
  },
  {
    title: "Coming Soon",
    description: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    tags: ["Coming Soon"],
    liveUrl: "#",
    comingSoon: true,
  },
  {
    title: "Coming Soon",
    description: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    tags: ["Coming Soon"],
    liveUrl: "#",
    comingSoon: true,
  },
  {
    title: "Coming Soon",
    description: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    tags: ["Coming Soon"],
    liveUrl: "#",
    comingSoon: true,
  },
  {
    title: "Coming Soon",
    description: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    tags: ["Coming Soon"],
    liveUrl: "#",
    comingSoon: true,
  },
];

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Scroll to top when page loads and show loading screen
  useEffect(() => {
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Shorter loading time for better UX

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="bg-black text-white min-h-screen custom-scrollbar">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen duration={5000} />}

      {/* Background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]"></div>
        <div className="stars absolute inset-0"></div>

        {/* Shooting stars */}
        <ShootingStars
          starColor="#9E00FF"
          trailColor="#2EB9DF"
          minSpeed={15}
          maxSpeed={35}
          minDelay={1000}
          maxDelay={3000}
        />
        <ShootingStars
          starColor="#FF0099"
          trailColor="#FFB800"
          minSpeed={10}
          maxSpeed={25}
          minDelay={2000}
          maxDelay={4000}
        />
      </div>

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

      {/* Main content */}
      <div className="container mx-auto px-4 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 text-center">
            All Projects
          </h1>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-12 md:mb-16 text-sm md:text-base">
            A collection of my web development projects, showcasing my skills and experience in creating responsive and
            interactive websites.
          </p>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  tags={project.tags}
                  liveUrl={project.liveUrl}
                  comingSoon={project.comingSoon}
                />
              </motion.div>
            ))}
          </div>

          {/* Back to home button */}
          <div className="flex justify-center mt-12 md:mt-16">
            <Link href="/">
              <GlowButton text="Back to Home" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Stars animation styles */}
      <style jsx global>{`
        .stars {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s ease-in-out infinite;
          opacity: 0.5;
        }

        @keyframes twinkle {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </main>
  )
}

