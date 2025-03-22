"use client"

import type React from "react"
import { Instagram, Github, Mail } from "lucide-react"
import { SiDiscord, SiTiktok } from "react-icons/si"

interface SocialLink {
  icon: React.ComponentType<any>
  href: string
  label: string
  color: string
}

export const socialLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com/Al11yy", label: "GitHub", color: "#ffffff" },
  { icon: Instagram, href: "https://www.instagram.com/lliiyyyyyyy/", label: "Instagram", color: "#ffffff" },
  { icon: SiTiktok, href: "https://www.tiktok.com/@liyy356", label: "TikTok", color: "#ffffff" },
  { icon: SiDiscord, href: "https://discordapp.com/users/690856519989985320", label: "Discord", color: "#ffffff" },
  { icon: Mail, href: "mailto:ghazam.aliy3@gmail.com", label: "Gmail", color: "#ffffff" },
]

interface SocialLinksProps {
  className?: string
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={`flex flex-col gap-2 sm:gap-3 md:gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/90 transition-colors duration-300 flex items-center gap-2 sm:gap-3 group"
          aria-label={social.label}
        >
          <div className="bg-black p-1.5 sm:p-2 rounded-full border border-white/20 group-hover:border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300">
            <social.icon
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-125 transition-transform"
              style={{ color: social.color }}
            />
          </div>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg">{social.label}</span>
        </a>
      ))}
    </div>
  )
}

