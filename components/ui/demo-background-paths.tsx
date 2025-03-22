import { BackgroundPaths } from "@/components/ui/background-paths"
import { GlowButton } from "@/components/ui/glow-button"

export function DemoBackgroundPaths() {
  return (
    <BackgroundPaths title="Background Paths">
      <div
        className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <GlowButton text="Discover Excellence" className="text-lg" />
      </div>
    </BackgroundPaths>
  )
}

