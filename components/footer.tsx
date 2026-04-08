"use client"

import Link from "next/link"
import { Github, Linkedin, Code } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/vinayakgarg1",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vinayak-garg-893259202/",
    icon: Linkedin,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/Vinayak_Garg12/",
    icon: Code,
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-foreground">VG</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">
              2026 Vinayak Garg. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-secondary hover:text-primary"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
