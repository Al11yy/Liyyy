"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Instagram, Github, Mail } from "lucide-react"
import { SiDiscord, SiTiktok } from "react-icons/si"
import Link from "next/link"

import { LoadingScreen } from "@/components/ui/loading-screen"
import { ShootingStars } from "@/components/ui/shooting-stars"
import Footer from "@/components/footer"
import { GlowButton } from "@/components/ui/glow-button"

// Social media profiles data
const socialProfiles = [
  {
    platform: "GitHub",
    username: "Al11yy",
    url: "https://github.com/Al11yy",
    icon: Github,
    color: "#ffffff",
    description: "Check out my code repositories and projects",
    backgroundColor: "from-gray-900 to-gray-800",
  },
  {
    platform: "Instagram",
    username: "lliiyyyyyyy",
    url: "https://www.instagram.com/lliiyyyyyyy/",
    icon: Instagram,
    color: "#E1306C",
    description: "Follow me for personal photos and updates",
    backgroundColor: "from-pink-600 to-purple-600",
  },
  {
    platform: "TikTok",
    username: "liyy356",
    url: "https://www.tiktok.com/@liyy356",
    icon: SiTiktok,
    color: "#ffffff",
    description: "Watch my short videos and creative content",
    backgroundColor: "from-black to-gray-900",
  },
  {
    platform: "Discord",
    username: "690856519989985320",
    url: "https://discordapp.com/users/690856519989985320",
    icon: SiDiscord,
    color: "#5865F2",
    description: "Connect with me on Discord for gaming and chat",
    backgroundColor: "from-indigo-600 to-blue-600",
  },
  {
    platform: "Email",
    username: "ghazam.aliy3@gmail.com",
    url: "mailto:ghazam.aliy3@gmail.com",
    icon: Mail,
    color: "#ffffff",
    description: "Contact me directly via email",
    backgroundColor: "from-gray-700 to-gray-600",
  },
]

export default function SocialPage() {
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
            Connect With Me
          </h1>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-12 md:mb-16 text-sm md:text-base">
            Follow me on social media to stay updated with my latest projects, thoughts, and activities. Feel free to
            reach out through any of these platforms!
          </p>

          {/* Social profiles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-16">
            {socialProfiles.map((profile, index) => (
              <motion.div
                key={profile.platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-black rounded-xl overflow-hidden border border-white/20 shadow-lg hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 sm:p-5 md:p-6 h-full"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-black p-3 md:p-4 rounded-full border border-white/20">
                      {profile.platform === "Discord" ? (
                        <SiDiscord size={24} className="md:w-7 md:h-7" style={{ color: profile.color }} />
                      ) : profile.platform === "Instagram" ? (
                        <Instagram size={24} className="md:w-7 md:h-7" style={{ color: profile.color }} />
                      ) : profile.platform === "TikTok" ? (
                        <SiTiktok size={24} className="md:w-7 md:h-7" style={{ color: profile.color }} />
                      ) : profile.platform === "GitHub" ? (
                        <Github size={24} className="md:w-7 md:h-7" style={{ color: profile.color }} />
                      ) : profile.platform === "Email" ? (
                        <Mail size={24} className="md:w-7 md:h-7" style={{ color: profile.color }} />
                      ) : (
                        <profile.icon size={24} className="md:w-7 md:h-7" style={{ color: profile.color }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{profile.platform}</h3>
                      <p className="text-white/70 mb-3 md:mb-4 text-sm md:text-base">@{profile.username}</p>
                      <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base">{profile.description}</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Back to home button */}
          <div className="flex justify-center">
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

