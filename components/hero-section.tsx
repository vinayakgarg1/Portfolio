"use client"

import { BentoCard } from "./bento-card"
import { ParticleNetwork } from "./particle-network"
import { GitHubActivity } from "./github-activity"
import { SpotifyPlayer } from "./spotify-player"
import { Github, Linkedin, Mail, MapPin, Code2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 pt-28 pb-12">
      <ParticleNetwork />
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Profile Card - Large */}
        <BentoCard className="md:col-span-2 lg:col-span-2 lg:row-span-2" delay={0}>
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary/20">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Vinayak Garg"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Vinayak Garg</h1>
                  <p className="text-muted-foreground">Software Developer</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-secondary-foreground">
                <span className="font-mono text-primary">{">"}</span> Crafting digital experiences.
                Building polished software and web applications with a focus on clean code and
                user-centric design.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>VIT Vellore, India</span>
            </div>
          </div>
        </BentoCard>

        {/* About Card */}
        <BentoCard className="md:col-span-1 lg:col-span-2" delay={0.1}>
          <div className="flex h-full flex-col">
            <span className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              About
            </span>
            <p className="text-sm leading-relaxed text-secondary-foreground">
              Second-year Computer Science student at VIT Vellore, building a robust foundation in
              software development and algorithmic problem-solving. Passionate about React,
              JavaScript, Python, and creating efficient, user-centric projects.
            </p>
          </div>
        </BentoCard>

        {/* Currently Building */}
        <BentoCard className="md:col-span-1 lg:col-span-2" delay={0.2}>
          <div className="flex h-full flex-col">
            <span className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Building
            </span>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Web Applications</p>
                <p className="text-sm text-muted-foreground">React, Next.js, TypeScript</p>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Social Links */}
        <BentoCard className="md:col-span-1" delay={0.3}>
          <span className="mb-4 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Connect
          </span>
          <div className="flex flex-col gap-3">
            <Link
              href="https://github.com/vinayakgarg1"
              target="_blank"
              className="flex items-center gap-3 text-secondary-foreground transition-colors hover:text-primary"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/vinayak-garg-893259202/"
              target="_blank"
              className="flex items-center gap-3 text-secondary-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-sm">LinkedIn</span>
            </Link>
            <Link
              href="mailto:vngarg0127@gmail.com"
              className="flex items-center gap-3 text-secondary-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm">Email</span>
            </Link>
          </div>
        </BentoCard>

        {/* Status Card */}
        <BentoCard className="md:col-span-2 lg:col-span-1" delay={0.4}>
          <div className="flex h-full flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
              </span>
              <span className="text-sm text-muted-foreground">Open to opportunities</span>
            </div>
          </div>
        </BentoCard>

        {/* GitHub Activity Card */}
        <BentoCard className="md:col-span-2 lg:col-span-2" delay={0.5}>
          <GitHubActivity />
        </BentoCard>

        {/* Spotify Player Card */}
        <BentoCard className="md:col-span-1 lg:col-span-2" delay={0.6}>
          <SpotifyPlayer />
        </BentoCard>
      </div>
    </section>
  )
}
