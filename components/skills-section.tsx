"use client"

import { BentoCard } from "./bento-card"
import { Code, Database, GitBranch, Layout, Cpu, Globe } from "lucide-react"

const skills = [
  {
    icon: Layout,
    name: "HTML5 & CSS3",
    description: "Semantic markup and modern styling",
  },
  {
    icon: Code,
    name: "JavaScript",
    description: "ES6+, DOM manipulation, async",
  },
  {
    icon: Globe,
    name: "React",
    description: "Component-based UI development",
  },
  {
    icon: Cpu,
    name: "C++ / Python",
    description: "DSA and algorithmic problem-solving",
  },
  {
    icon: GitBranch,
    name: "Git & GitHub",
    description: "Version control and collaboration",
  },
  {
    icon: Database,
    name: "Responsive Design",
    description: "Mobile-first, cross-browser",
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Skills
        </h2>
        <p className="mt-2 text-2xl font-bold text-foreground">Technologies I work with</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <BentoCard key={skill.name} delay={index * 0.1}>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <skill.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{skill.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{skill.description}</p>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  )
}
