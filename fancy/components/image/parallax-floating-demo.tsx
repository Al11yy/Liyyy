"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "framer-motion"
import { Instagram, Github, Linkedin, Facebook, Mail } from "lucide-react"

import Floating, { FloatingElement } from "@/fancy/components/image/parallax-floating"
import { GlowButton } from "@/components/ui/glow-button"

import { exampleImages } from "@/utils/demo-images"

const Preview = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [animate])

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
    { icon: Github, href: "https://github.com/", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/", label: "LinkedIn" },
    { icon: Facebook, href: "https://facebook.com/", label: "Facebook" },
    { icon: Mail, href: "mailto:example@gmail.com", label: "Email" },
  ]

  return (
    <div className="flex w-dvw h-dvh justify-center items-center bg-black overflow-hidden" ref={scope}>
      <motion.div
        className="z-50 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl z-50 text-white font-calendas italic">Ghazam Al Aliy Ravandy</p>

        <motion.div
          className="flex space-x-4 my-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 md:w-6 md:h-6 hover:scale-125 transition-transform" />
              <span className="sr-only">{social.label}</span>
            </a>
          ))}
        </motion.div>

        <GlowButton text="About Me" className="z-50" />
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            className="w-24 h-24 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
            alt="Floating image 1"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[10%] left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[1].url}
            className="w-28 h-40 md:w-40 md:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
            alt="Floating image 2"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[2%] left-[53%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[2].url}
            className="w-32 h-48 md:w-48 md:h-64 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
            alt="Floating image 3"
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
        <FloatingElement depth={2} className="top-[70%] left-[77%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[7].url}
            className="w-32 h-44 md:w-44 md:h-60 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
            alt="Floating image 6"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="top-[73%] left-[15%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[5].url}
            className="w-44 md:w-60 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
            alt="Floating image 7"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[80%] left-[50%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[6].url}
            className="w-28 h-28 md:w-40 md:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-xl shadow-lg"
            alt="Floating image 8"
          />
        </FloatingElement>
      </Floating>
    </div>
  )
}

export default Preview

