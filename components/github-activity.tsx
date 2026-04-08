"use client"

import { useMemo } from "react"

export function GitHubActivity() {
  // Generate mock contribution data (52 weeks x 7 days)
  const contributions = useMemo(() => {
    const data: number[] = []
    for (let i = 0; i < 52 * 7; i++) {
      // Create realistic-looking contribution patterns
      const random = Math.random()
      if (random > 0.7) {
        data.push(Math.floor(Math.random() * 4) + 1)
      } else if (random > 0.4) {
        data.push(1)
      } else {
        data.push(0)
      }
    }
    return data
  }, [])

  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-[#161b22]"
      case 1:
        return "bg-[#0e4429]"
      case 2:
        return "bg-[#006d32]"
      case 3:
        return "bg-[#26a641]"
      case 4:
        return "bg-[#39d353]"
      default:
        return "bg-[#161b22]"
    }
  }

  // Get last 20 weeks for compact display
  const recentContributions = contributions.slice(-20 * 7)
  const weeks = []
  for (let i = 0; i < 20; i++) {
    weeks.push(recentContributions.slice(i * 7, (i + 1) * 7))
  }

  const totalContributions = contributions.reduce((a, b) => a + b, 0)

  return (
    <div className="flex h-full flex-col">
      <span className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        GitHub Activity
      </span>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{totalContributions}</span>
        <span className="text-sm text-muted-foreground">contributions this year</span>
      </div>
      <div className="flex gap-[3px] overflow-hidden">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((level, dayIndex) => (
              <div
                key={dayIndex}
                className={`h-[10px] w-[10px] rounded-sm ${getColor(level)} transition-all duration-200 hover:scale-125 hover:ring-1 hover:ring-primary/50`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-[2px]">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`h-[10px] w-[10px] rounded-sm ${getColor(level)}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
