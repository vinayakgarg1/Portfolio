"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { ReactNode, useRef, useState, useEffect } from "react"

interface SectionTransitionProps {
  children: ReactNode
  id?: string
  className?: string
}

export function SectionTransition({ children, id, className }: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    if (isInView && !hasEntered) {
      setHasEntered(true)
    }
  }, [isInView, hasEntered])

  return (
    <AnimatePresence mode="wait">
      <motion.section
        ref={ref}
        id={id}
        className={className}
        initial={{ opacity: 0, y: -40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  )
}

interface SectionContentProps {
  children: ReactNode
  delay?: number
}

export function SectionContent({ children, delay = 0 }: SectionContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
