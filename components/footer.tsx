import Link from "next/link"
import { Github, Instagram, Mail } from "lucide-react"
import { SiDiscord, SiTiktok } from "react-icons/si"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10 py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* About section */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Ghazam Al Aliy Ravandy</h3>
            <p className="text-white/70 mb-3 md:mb-4 text-sm md:text-base">
              Web developer and designer creating beautiful, functional websites and applications.
            </p>
            <p className="text-white/70 text-sm md:text-base">Based in Indonesia</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-white/70 hover:text-white transition-colors text-sm md:text-base"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a
                href="https://github.com/Al11yy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-2 rounded-full border border-white/20 hover:border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/lliiyyyyyyy/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-2 rounded-full border border-white/20 hover:border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@liyy356"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-2 rounded-full border border-white/20 hover:border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
                aria-label="TikTok"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://discordapp.com/users/690856519989985320"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-2 rounded-full border border-white/20 hover:border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
                aria-label="Discord"
              >
                <SiDiscord className="w-5 h-5" />
              </a>
              <a
                href="mailto:ghazam.aliy3@gmail.com"
                className="bg-black p-2 rounded-full border border-white/20 hover:border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-5 md:pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-0">
            &copy; {currentYear} Ghazam Al Aliy Ravandy. All rights reserved.
          </p>
          <p className="text-white/60 text-xs sm:text-sm">Designed and built with ❤️</p>
        </div>
      </div>
    </footer>
  )
}

