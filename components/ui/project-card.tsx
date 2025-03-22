"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
  liveUrl?: string
  comingSoon?: boolean
  className?: string
}

export function ProjectCard({ title, description, imageUrl, tags, liveUrl, comingSoon, className }: ProjectCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-black border border-white/10",
        "transition-all duration-300 hover:border-white/30",
        comingSoon && "border-purple-500/30",
        className,
      )}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110",
            comingSoon && "opacity-60",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />

        {comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-purple-600/80 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-lg text-xl transform rotate-12 shadow-lg">
              Coming Soon
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{title}</h3>
        {description && <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4">{description}</p>}

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "text-xs px-2 py-1 rounded-full text-white/80",
                tag === "Coming Soon" ? "bg-purple-500/30" : "bg-white/10",
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {liveUrl && !comingSoon && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}

          {comingSoon && (
            <span className="flex items-center gap-1 text-xs sm:text-sm text-purple-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>In Development</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

