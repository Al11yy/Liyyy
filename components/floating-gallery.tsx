"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "framer-motion"

import Floating, { FloatingElement } from "@/fancy/components/image/parallax-floating"

import { exampleImages } from "@/utils/demo-images"

const FloatingGallery = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [animate])

  return (
    <div className="flex w-full h-screen justify-center items-center bg-black overflow-hidden" ref={scope}>
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

export default FloatingGallery

