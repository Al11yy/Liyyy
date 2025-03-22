"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { type LucideIcon, Menu, X } from "lucide-react"

interface NavItem {
  title: string
  icon: LucideIcon
  id: string
  onClick?: () => void
}

interface ModernNavbarProps {
  items: NavItem[]
  className?: string
  activeSection: string
}

interface DesktopNavItemProps {
  item: NavItem
  isActive: boolean
}

// Improve ModernNavbar for tablet display
export function ModernNavbar({ items, className, activeSection }: ModernNavbarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMenuOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  // Desktop navbar
  if (!isMobile) {
    return (
      <div
        className={cn(
          "flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-full backdrop-blur-md border border-white/10 bg-black/60",
          className,
        )}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          {items.map((item) => (
            <DesktopNavItem key={item.id} item={item} isActive={activeSection === item.id} />
          ))}
        </div>
      </div>
    )
  }

  // Mobile navbar
  return (
    <div className={cn("z-[9999]", className)}>
      {/* Mobile menu button */}
      <button
        className="menu-button fixed top-8 right-4 z-[9999] p-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu fixed inset-0 z-[9998] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, staggerChildren: 0.1 }}
            >
              {items.map((item, index) => (
                <MobileNavItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  index={index}
                  onClick={() => {
                    item.onClick?.()
                    setIsMenuOpen(false)
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DesktopNavItem({ item, isActive }: DesktopNavItemProps) {
  const Icon = item.icon

  return (
    <motion.button
      onClick={item.onClick}
      className={cn(
        "relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all",
        isActive ? "bg-white text-black" : "text-white/70 hover:text-white hover:bg-white/10",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />

      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{item.title}</span>

      {isActive && (
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white rounded-full"
          layoutId="activeIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  )
}

interface MobileNavItemProps {
  item: NavItem
  isActive: boolean
  index: number
  onClick: () => void
}

function MobileNavItem({ item, isActive, index, onClick }: MobileNavItemProps) {
  const Icon = item.icon

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 px-6 py-3 rounded-xl w-64 transition-all",
        isActive ? "bg-white text-black" : "text-white hover:bg-white/10",
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      whileHover={{ scale: 1.05, x: 10 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-6 h-6" />
      <span className="text-lg font-medium">{item.title}</span>

      {isActive && (
        <motion.div className="absolute left-0 w-1 h-full bg-white rounded-r-full" layoutId="mobileActiveIndicator" />
      )}
    </motion.button>
  )
}

