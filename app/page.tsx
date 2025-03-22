"use client";

import { useEffect, useState, useRef } from "react";
import { motion, stagger, useAnimate, AnimatePresence } from "framer-motion";
import { Home, User, FolderGit2, Code, BookOpen, Share2 } from "lucide-react";
import { SiReact } from "react-icons/si";
import Link from "next/link";

import { ModernNavbar } from "@/components/ui/modern-navbar";
import { GlowButton } from "@/components/ui/glow-button";
import Floating, {
  FloatingElement,
} from "@/fancy/components/image/parallax-floating";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { exampleImages } from "@/utils/demo-images";
import { Globe as GlobeComponent } from "@/components/ui/globe";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { techIcons } from "@/components/ui/tech-icons";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { SocialLinks } from "@/components/social-links";
import { Globe } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import Footer from "@/components/footer";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Squares } from "@/components/ui/squares-background";

// Updated quotes data with the new quotes
const inspirationalQuotes = [
  {
    text: "Yesterday is history, tomorrow is a mystery, but today is a gift.",
    author: "Wise old Turtle (Kung Fu Panda)",
  },
  {
    text: "One often meets his destiny on the road he takes to avoid it.",
    author: "Wise old Turtle (Kung Fu Panda)",
  },
  {
    text: "It is not our abilities that show what we truly are… it is our choices.",
    author: "Harry Potter and the Chamber of Secrets (2002)",
  },
  {
    text: "With great power comes great responsibility.",
    author: "Spider-Man (2002)",
  },
  {
    text: "Armed and Dangerous!",
    author: "Winter Soldier",
  },
  {
    text: "I'm Ready to Put on a Show!",
    author: "Luna Snow",
  },
  {
    text: "현실에 따라 살아라, 소문에 따라 살지 말고.",
    author: "도깨비 (Goblin)",
  },
];

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl: string;
}

const projects: Project[] = [
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
];

export default function HomePage() {
  const [canScroll, setCanScroll] = useState(false);
  const [showScrollNotification, setShowScrollNotification] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTriedToScroll, setHasTriedToScroll] = useState(false);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);

  // Check if user has previously unlocked scrolling
  useEffect(() => {
    const hasUnlockedScroll =
      localStorage.getItem("hasUnlockedScroll") === "true";

    if (hasUnlockedScroll) {
      // If user has previously unlocked scrolling, enable it
      setCanScroll(true);
      document.body.style.overflow = "";
    } else {
      // Otherwise, lock scrolling
      document.body.style.overflow = "hidden";
      setCanScroll(false);
    }

    // Detect scroll attempts
    const handleScrollAttempt = () => {
      if (!canScroll) {
        setShowScrollNotification(true);
        setHasTriedToScroll(true);

        // Hide notification after 6 seconds
        setTimeout(() => {
          setShowScrollNotification(false);
        }, 6000);
      }
    };

    // Use multiple event listeners to ensure we catch all scroll attempts
    window.addEventListener("wheel", handleScrollAttempt, { passive: true });
    window.addEventListener("touchmove", handleScrollAttempt, {
      passive: true,
    });
    window.addEventListener("keydown", (e) => {
      // Detect arrow keys, Page Up/Down, Space, etc.
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          " ",
          "Space",
          "Spacebar",
          "Home",
          "End",
        ].includes(e.key)
      ) {
        handleScrollAttempt();
      }
    });

    // Also show notification on initial load
    if (!canScroll && !hasTriedToScroll) {
      // Show notification after a short delay on page load
      setTimeout(() => {
        setShowScrollNotification(true);
        setHasTriedToScroll(true);

        // Hide after 6 seconds
        setTimeout(() => {
          setShowScrollNotification(false);
        }, 6000);
      }, 2000); // Show 2 seconds after page load
    }

    return () => {
      window.removeEventListener("wheel", handleScrollAttempt);
      window.removeEventListener("touchmove", handleScrollAttempt);
      window.removeEventListener("keydown", handleScrollAttempt);
    };
  }, [canScroll, hasTriedToScroll]);

  // Add click handler for hero section
  useEffect(() => {
    if (!canScroll) {
      const handleHeroClick = (e: MouseEvent) => {
        // Check if the click is within the hero section
        const heroSection = document.getElementById("home");
        if (heroSection && heroSection.contains(e.target as Node)) {
          // Check if the click is NOT on the About Me button
          if (
            aboutButtonRef.current &&
            !aboutButtonRef.current.contains(e.target as Node)
          ) {
            setShowScrollNotification(true);

            // Hide notification after 5 seconds
            setTimeout(() => {
              setShowScrollNotification(false);
            }, 5000);
          }
        }
      };

      window.addEventListener("click", handleHeroClick);

      return () => {
        window.removeEventListener("click", handleHeroClick);
      };
    }
  }, [canScroll]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add this effect to rotate quotes with reduced frequency
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(
        (prevIndex) => (prevIndex + 1) % inspirationalQuotes.length
      );
    }, 8000); // Increased interval time

    return () => clearInterval(interval);
  }, []);

  // Track scroll position with throttling for better performance
  useEffect(() => {
    if (!canScroll) return; // Don't track scroll if scrolling is disabled

    let ticking = false;
    let lastScrollY = 0;
    const scrollThreshold = 50; // Only update if scrolled more than this amount

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only process if we've scrolled significantly
      if (
        !ticking &&
        Math.abs(currentScrollY - lastScrollY) > scrollThreshold
      ) {
        window.requestAnimationFrame(() => {
          setScrollPosition(currentScrollY);
          lastScrollY = currentScrollY;

          // Update active section based on scroll position
          const sections = ["home", "about", "projects", "social"];
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom >= 100) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [canScroll]);

  // Add this code to detect scrolling and add the 'scrolling' class
  useEffect(() => {
    if (!canScroll) return; // Don't add scrolling class if scrolling is disabled

    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      // Add scrolling class to body
      document.body.classList.add("scrolling");

      // Clear previous timeout
      clearTimeout(scrollTimer);

      // Set a timeout to remove the class after scrolling stops
      scrollTimer = setTimeout(() => {
        document.body.classList.remove("scrolling");
      }, 1000); // Remove class after 1 second of no scrolling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [canScroll]);

  // Update body overflow and save scroll state when canScroll changes
  useEffect(() => {
    if (canScroll) {
      document.body.style.overflow = "";
      setShowScrollNotification(false);
      // Save scroll state to localStorage when About Me is clicked
      localStorage.setItem("hasUnlockedScroll", "true");
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [canScroll]);

  // Simplified animation with fewer items
  useEffect(() => {
    if (isLoaded) {
      animate(
        "img",
        { opacity: [0, 1] },
        { duration: 0.5, delay: stagger(0.2) }
      );
    }
  }, [animate, isLoaded]);

  // Mark as loaded after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNavClick = (id: string) => {
    // Only allow navigation if scrolling is enabled
    if (canScroll) {
      setActiveSection(id);

      // Scroll to the section if it exists
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If scrolling is not enabled, show notification
      setShowScrollNotification(true);

      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowScrollNotification(false);
      }, 5000);
    }
  };

  // Function to scroll to About section and enable scrolling
  const scrollToAbout = () => {
    setCanScroll(true);

    // Small delay to ensure scrolling is enabled before scrolling
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
        setActiveSection("about");
      }
    }, 100);
  };

  // Define the navigation items
  const navItems = [
    {
      title: "Home",
      icon: Home,
      id: "home",
      onClick: () => handleNavClick("home"),
    },
    {
      title: "About",
      icon: User,
      id: "about",
      onClick: () => handleNavClick("about"),
    },
    {
      title: "Projects",
      icon: FolderGit2,
      id: "projects",
      onClick: () => handleNavClick("projects"),
    },
    {
      title: "Social",
      icon: Share2,
      id: "social",
      onClick: () => handleNavClick("social"),
    },
  ];

  // Determine if we should show the navbar (only after hero section)
  const showNavbar = scrollPosition > window.innerHeight * 0.5 || canScroll;

  // Define the bento features - restored "Currently Learning" section
  const bentoFeatures = [
    {
      Icon: Globe,
      name: "Where I'm From",
      description:
        "Born and raised in Indonesia, bringing a unique perspective to my work",
      href: "#",
      cta: "Learn more",
      background: (
        <div className="flex justify-center items-center h-full w-full p-6 relative">
          <GlobeComponent className="top-0" />
        </div>
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-3",
    },
    {
      Icon: Code,
      name: "Connect with me",
      description: "Let's connect and collaborate",
      href: "#",
      cta: "Reach out",
      background: (
        <div className="flex flex-col justify-center items-start h-full w-full p-4 sm:p-6 pt-8 sm:pt-12 overflow-y-auto">
          <SocialLinks className="mt-2 sm:mt-4" />
        </div>
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-3 lg:col-end-4",
    },
    {
      Icon: Code,
      name: "Framework and Languages I Use",
      description: "My tech stack and tools",
      href: "#",
      cta: "See projects",
      background: (
        <div className="flex justify-center items-center h-full w-full p-6">
          <LogoCarousel columnCount={3} logos={techIcons} />
        </div>
      ),
      className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-3",
    },
    {
      Icon: BookOpen,
      name: "Currently Learning",
      description: "Always expanding my knowledge with React.js",
      href: "#",
      cta: "Learn with me",
      background: (
        <div className="flex justify-center items-center h-full w-full p-6">
          <SiReact className="text-[#61DAFB] w-20 h-20" />
        </div>
      ),
      className: "lg:row-start-3 lg:row-end-4 lg:col-start-3 lg:col-end-4",
    },
  ];

  return (
    <main className="relative bg-black text-white custom-scrollbar">
      {/* Global star background for the entire page */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]"></div>
        <div className="stars absolute inset-0"></div>
      </div>

      {/* Loading Screen - increased duration */}
      <LoadingScreen duration={5000} />

      {/* Modern Navbar - Only visible after hero section */}
      <div
        className={`fixed top-8 ${
          isMobile ? "right-4" : "left-1/2 transform -translate-x-1/2"
        } z-[9997] transition-all duration-500 ${
          showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        <ModernNavbar
          items={navItems}
          activeSection={activeSection}
          className="shadow-lg shadow-black/20"
        />
      </div>

      {/* Scroll notification that appears when user tries to scroll - UPDATED TO DARK THEME AND BOTTOM POSITION */}
      {showScrollNotification && !canScroll && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <motion.div
            className="px-6 py-3 bg-black/90 backdrop-blur-md rounded-full border-2 border-white/20 text-white text-sm font-medium shadow-[0_0_15px_rgba(0,0,0,0.7)] flex items-center space-x-2"
            animate={{
              y: [0, -8, 0],
              boxShadow: [
                "0 0 15px rgba(255, 255, 255, 0.2)",
                "0 0 25px rgba(255, 255, 255, 0.3)",
                "0 0 15px rgba(255, 255, 255, 0.2)",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 animate-pulse text-white/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>
              Click{" "}
              <span className="text-white font-bold underline">About Me</span>{" "}
              to unlock scrolling
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Section - Restored all floating images */}
      <section
        id="home"
        className="h-screen w-full bg-black relative overflow-hidden">
        <div
          className="flex w-full h-screen justify-center items-center overflow-hidden"
          ref={scope}>
          <motion.div
            className="z-50 text-center space-y-6 items-center flex flex-col px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.88, delay: 0.5 }}>
            {/* Enhanced animated name with letter-by-letter animation but no hover effect */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                initial={{ y: 100, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.2,
                  },
                }}>
                <div className="overflow-hidden flex flex-wrap justify-center">
                  {/* First part: "Ghazam Al Aliy" */}
                  <div className="w-full md:w-auto flex justify-center">
                    {Array.from("Ghazam Al Aliy").map((letter, index) => (
                      <motion.span
                        key={`first-${index}`}
                        initial={{
                          y: 100,
                          opacity: 0,
                          textShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          textShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + index * 0.05,
                          type: "spring",
                          damping: 12,
                          stiffness: 100,
                        }}
                        className="inline-block text-white font-serif"
                        style={{
                          fontFamily: "'Times New Roman', serif",
                          display: letter === " " ? "inline" : "inline-block",
                          width: letter === " " ? "0.5em" : "auto",
                        }}>
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                  </div>

                  {/* Second part: "Ravandy" on a new line for mobile */}
                  <div className="w-full md:w-auto md:ml-3 flex justify-center">
                    {Array.from("Ravandy").map((letter, index) => (
                      <motion.span
                        key={`second-${index}`}
                        initial={{
                          y: 100,
                          opacity: 0,
                          textShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          textShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + index * 0.05,
                          type: "spring",
                          damping: 12,
                          stiffness: 100,
                        }}
                        className="inline-block text-white font-serif"
                        style={{
                          fontFamily: "'Times New Roman', serif",
                          display: "inline-block",
                        }}>
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.h1>

              {/* Animated underline effect */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: "100%",
                  opacity: 1,
                  transition: {
                    delay: 1.5,
                    duration: 0.8,
                    ease: "easeOut",
                  },
                }}
                className="h-0.5 bg-white/50 mt-2 mx-auto max-w-3xl"
              />
            </div>

            {/* Enhanced quotes section with better styling and fixed positioning */}
            <div className="relative z-50 mt-6 mb-8 w-full max-w-2xl">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-5 lg:p-6 border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex flex-col items-center justify-center text-center">
                    <p className="text-white/95 text-base md:text-lg lg:text-xl italic mb-3 font-light leading-relaxed">
                      "{inspirationalQuotes[currentQuoteIndex].text}"
                    </p>
                    <p className="text-white/80 text-xs md:text-sm lg:text-base font-medium">
                      — {inspirationalQuotes[currentQuoteIndex].author}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* About Me button with pulsing animation to draw attention - REMOVED BLACK BOX */}
            <motion.div
              animate={
                !canScroll
                  ? {
                      scale: [1, 1.05, 1],
                    }
                  : {}
              }
              transition={{
                repeat: !canScroll ? Number.POSITIVE_INFINITY : 0,
                duration: 2,
                ease: "easeInOut",
              }}
              className="z-50 relative">
              <GlowButton
                ref={aboutButtonRef}
                text="About Me"
                className="z-50 mt-4"
                glowIntensity="medium"
                onClick={scrollToAbout}
              />
            </motion.div>
          </motion.div>

          {/* Restored all floating images */}
          <Floating sensitivity={-0.3} className="overflow-hidden">
            <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[0].url}
                className="w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Floating image 1"
              />
            </FloatingElement>
            <FloatingElement
              depth={1}
              className="top-[10%] left-[32%] md:left-[28%] lg:left-[32%]">
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[1].url}
                className="w-28 h-40 md:w-32 md:h-44 lg:w-40 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Floating image 2"
              />
            </FloatingElement>
            <FloatingElement depth={2} className="top-[2%] left-[53%]">
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[2].url}
                className="w-32 h-48 md:w-48 md:h-64 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Anime character with blue hair"
              />
            </FloatingElement>
            <FloatingElement depth={1} className="top-[0%] left-[83%]">
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[3].url}
                className="w-28 h-28 md:w-40 md:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Floating image 4"
              />
            </FloatingElement>
            <FloatingElement depth={1} className="top-[40%] left-[2%]">
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[4].url}
                className="w-32 h-32 md:w-44 md:h-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Floating image 5"
              />
            </FloatingElement>
            <FloatingElement depth={2} className="top-[30%] left-[77%]">
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[5].url}
                className="w-32 h-32 md:w-44 md:h-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Close-up portrait"
              />
            </FloatingElement>
            <FloatingElement depth={2} className="top-[70%] left-[77%]">
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[6].url}
                className="w-32 h-32 md:w-44 md:h-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Another close-up portrait"
              />
            </FloatingElement>
            <FloatingElement depth={4} className="top-[73%] left-[15%]">
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[7].url}
                className="w-44 md:w-60 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Floating image 8"
              />
            </FloatingElement>
            <FloatingElement depth={1} className="top-[80%] left-[50%]">
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[8].url}
                className="w-28 h-28 md:w-40 md:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Floating image 9"
              />
            </FloatingElement>

            {/* New floating images */}
            <FloatingElement
              depth={1.5}
              className="top-[15%] left-[75%] hidden md:block">
              <motion.img
                initial={{ opacity: 0 }}
                src="/images/my-face-1.jpg"
                className="w-32 h-32 md:w-44 md:h-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="My face 1"
              />
            </FloatingElement>
            <FloatingElement
              depth={2}
              className="top-[55%] left-[15%] hidden md:block">
              <motion.img
                initial={{ opacity: 0 }}
                src="/images/my-face-2.jpg"
                className="w-36 h-36 md:w-48 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="My face 2"
              />
            </FloatingElement>

            {/* Additional floating images */}
            <FloatingElement
              depth={1.5}
              className="top-[25%] left-[95%] hidden md:block">
              <motion.img
                initial={{ opacity: 0 }}
                src="/images/raviel.jpg"
                className="w-32 h-32 md:w-44 md:h-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Raviel"
              />
            </FloatingElement>
            <FloatingElement
              depth={2}
              className="top-[65%] left-[35%] hidden md:block">
              <motion.img
                initial={{ opacity: 0 }}
                src="/images/uhhhh.jpg"
                className="w-36 h-36 md:w-48 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
                alt="Uhhhh"
              />
            </FloatingElement>
          </Floating>
        </div>
      </section>

      {/* About Me Section with simplified background */}
      <section
        id="about"
        ref={secondSectionRef}
        className="min-h-screen relative overflow-hidden bg-black">
        {/* Squares background */}
        <div className="absolute inset-0 z-0">
          <Squares
            direction="diagonal"
            speed={0.3}
            squareSize={40}
            borderColor="#333"
            hoverFillColor="#222"
          />
        </div>

        {/* Shooting stars effect */}
        <div className="absolute inset-0 overflow-hidden">
          <ShootingStars
            starColor="#9E00FF"
            trailColor="#2EB9DF"
            minSpeed={20}
            maxSpeed={40}
            minDelay={3000}
            maxDelay={8000}
            className="opacity-30"
          />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen py-32 px-4 relative z-10">
          {/* Reduced font size for About me heading to match Projects */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            About me
          </motion.h1>

          <div className="max-w-5xl w-full mx-auto">
            <BentoGrid className="lg:grid-rows-3">
              {bentoFeatures.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>

            <div className="flex justify-center mt-16">
              <Link href="/about">
                <GlowButton text="More About Me" className="z-10 w-48" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Shooting Stars */}
      <section
        id="projects"
        className="min-h-screen bg-black relative overflow-hidden py-32 px-4 mt-0">
        {/* Shooting Stars Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
          <div className="stars absolute inset-0" />

          {/* Multiple shooting star layers with different colors and speeds */}
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
          <ShootingStars
            starColor="#00FF9E"
            trailColor="#00B8FF"
            minSpeed={20}
            maxSpeed={40}
            minDelay={1500}
            maxDelay={3500}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-12 md:mb-16 text-center">
            Projects
          </h1>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={project.tags}
                liveUrl={project.liveUrl}
              />
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link href="/projects">
              <GlowButton text="View All Projects" className="z-10 w-48" />
            </Link>
          </div>
        </div>
      </section>

      {/* Want to work with me section */}
      <section id="social" className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              Want to work with me?
            </motion.h2>

            <motion.p
              className="text-xl text-white/60 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}>
              Reach Out Now
            </motion.p>

            <motion.a
              href="mailto:ghazam.aliy3@gmail.com"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-300 transition-colors block mb-12 md:mb-16 break-all sm:break-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              ghazam.aliy3@gmail.com
            </motion.a>

            <motion.div
              className="flex flex-wrap gap-8 md:gap-16 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}>
              <a
                href="https://github.com/Al11yy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors text-lg">
                GitHub
              </a>
              <a
                href="https://www.instagram.com/lliiyyyyyyy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors text-lg">
                Instagram
              </a>
              <a
                href="https://discordapp.com/users/690856519989985320"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors text-lg">
                Discord
              </a>
              <a
                href="https://www.tiktok.com/@liyy356"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors text-lg">
                TikTok
              </a>
            </motion.div>

            <motion.div
              className="flex justify-center mt-16 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}>
              <Link href="/social">
                <GlowButton
                  text="View All Social Links"
                  className="z-10 w-64"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <style jsx global>
        {`
          .stars {
            background-image: radial-gradient(
                2px 2px at 20px 30px,
                #eee,
                rgba(0, 0, 0, 0)
              ),
              radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
              radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0, 0, 0, 0)),
              radial-gradient(2px 2px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
              radial-gradient(2px 2px at 130px 80px, #fff, rgba(0, 0, 0, 0)),
              radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0, 0, 0, 0));
            background-repeat: repeat;
            background-size: 200px 200px;
            animation: twinkle 5s ease-in-out infinite;
            opacity: 0.5;
          }

          @keyframes twinkle {
            0% {
              opacity: 0.5;
            }
            50% {
              opacity: 0.8;
            }
            100% {
              opacity: 0.5;
            }
          }

          /* Modern Custom Scrollbar Styles */
          .custom-scrollbar {
            --scrollbar-width: 8px;
            --scrollbar-track-color: rgba(0, 0, 0, 0.2);
            --scrollbar-thumb-color-start: #9e00ff;
            --scrollbar-thumb-color-end: #2eb9df;
            --scrollbar-thumb-hover-color-start: #ff0099;
            --scrollbar-thumb-hover-color-end: #00b8ff;
            --scrollbar-border-radius: 10px;
            --scrollbar-padding: 2px;

            /* Firefox */
            scrollbar-width: thin;
            scrollbar-color: var(--scrollbar-thumb-color-start)
              var(--scrollbar-track-color);
          }

          /* Chrome, Edge, Safari */
          .custom-scrollbar::-webkit-scrollbar {
            width: var(--scrollbar-width);
            height: var(--scrollbar-width);
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: var(--scrollbar-track-color);
            border-radius: var(--scrollbar-border-radius);
            margin: 4px 0;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(
              45deg,
              var(--scrollbar-thumb-color-start),
              var(--scrollbar-thumb-color-end)
            );
            border-radius: var(--scrollbar-border-radius);
            border: var(--scrollbar-padding) solid transparent;
            background-clip: padding-box;
            transition: all 0.3s ease;
            box-shadow: 0 0 10px rgba(158, 0, 255, 0.3);
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(
              45deg,
              var(--scrollbar-thumb-hover-color-start),
              var(--scrollbar-thumb-hover-color-end)
            );
            box-shadow: 0 0 15px rgba(255, 0, 153, 0.5);
          }

          /* Active state with glow effect */
          .custom-scrollbar::-webkit-scrollbar-thumb:active {
            background: linear-gradient(
              45deg,
              var(--scrollbar-thumb-hover-color-end),
              var(--scrollbar-thumb-hover-color-start)
            );
            box-shadow: 0 0 20px rgba(255, 0, 153, 0.7);
            animation: scrollGlow 1.5s infinite;
          }

          /* Scrollbar corner */
          .custom-scrollbar::-webkit-scrollbar-corner {
            background: transparent;
          }

          /* Glow animation for active scrolling */
          @keyframes scrollGlow {
            0% {
              box-shadow: 0 0 10px rgba(158, 0, 255, 0.3);
            }
            50% {
              box-shadow: 0 0 20px rgba(255, 0, 153, 0.7);
            }
            100% {
              box-shadow: 0 0 10px rgba(158, 0, 255, 0.3);
            }
          }

          /* Add a subtle pulse animation when scrolling */
          .custom-scrollbar.scrolling::-webkit-scrollbar-thumb {
            animation: scrollPulse 1.5s ease-in-out infinite;
          }

          @keyframes scrollPulse {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </main>
  );
}
