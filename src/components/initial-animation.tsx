"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function InitialAnimation() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null
  
  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      onAnimationComplete={() => setIsVisible(false)}
    >
      <motion.h1
        className="text-6xl font-bold text-gray-800 font-['Reenie_Beanie']"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Polines Bercerita
      </motion.h1>
    </motion.div>
  )
}
