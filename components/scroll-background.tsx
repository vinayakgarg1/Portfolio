"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

interface ScrollBackgroundProps {
  children: React.ReactNode
}

export function ScrollBackground({ children }: ScrollBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Transition from dark gray (#0a0a0a) to deep midnight blue (#0a1628)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    ["#0a0a0a", "#0a0a0a", "#0a1628", "#0a1628"]
  )

  return (
    <motion.div
      ref={ref}
      style={{ backgroundColor }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
