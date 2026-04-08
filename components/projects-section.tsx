"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { BentoCard } from "./bento-card"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Expense Tracker",
    description:
      "A responsive web application built with HTML, CSS, and JavaScript to help users log and analyze their daily expenses with interactive charts and data persistence.",
    image: "/images/expense_demo.png",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Real-Time ASL Tracker",
    description:
      "A Python-based machine learning application that detects and translates American Sign Language alphabets in real-time using computer vision and deep learning.",
    image: "/images/asl_demo.png",
    tags: ["Python", "Machine Learning", "OpenCV"],
  },
]

function ProjectCard({ 
  project, 
  index 
}: { 
  project: typeof projects[0]
  index: number 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Slide in from left for even index, right for odd index
  const direction = index % 2 === 0 ? -1 : 1
  const x = useTransform(scrollYProgress, [0, 0.3, 0.5], [direction * 150, direction * 50, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0.5, 1])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.8, 0.95, 1])
  const rotateY = useTransform(scrollYProgress, [0, 0.3, 0.5], [direction * 15, direction * 5, 0])

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity, scale, rotateY }}
      className="perspective-1000"
    >
      <BentoCard className="p-0 overflow-hidden" delay={0}>
        <div className="group cursor-pointer">
          <div className="relative aspect-video overflow-hidden bg-secondary">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </BentoCard>
    </motion.div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const titleX = useTransform(scrollYProgress, [0, 0.2], [-100, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <section id="projects" ref={sectionRef} className="mx-auto max-w-6xl px-6 py-12">
      <motion.div 
        className="mb-8"
        style={{ x: titleX, opacity: titleOpacity }}
      >
        <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Projects
        </h2>
        <p className="mt-2 text-2xl font-bold text-foreground">Selected work</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
