"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CronBuilder({
  cronExpression,
  onChange,
}: {
  cronExpression: string
  onChange: (value: string) => void
}) {
  const parts = cronExpression.split(/\s+/)
  const [minute, setMinute] = useState(parts[0] || "0")
  const [hour, setHour] = useState(parts[1] || "9")
  const [day, setDay] = useState(parts[2] || "*")
  const [month, setMonth] = useState(parts[3] || "*")
  const [dayOfWeek, setDayOfWeek] = useState(parts[4] || "*")

  const builtExpression = useMemo(
    () => `${minute} ${hour} ${day} ${month} ${dayOfWeek}`,
    [minute, hour, day, month, dayOfWeek],
  )

  const handleBuild = () => {
    onChange(builtExpression)
  }

  const presets: { label: string; expression: string }[] = [
    { label: "Every minute", expression: "* * * * *" },
    { label: "Every hour", expression: "0 * * * *" },
    { label: "Daily at 9 AM", expression: "0 9 * * *" },
    { label: "Weekdays at 9 AM", expression: "0 9 * * 1-5" },
    { label: "Every 6 hours", expression: "0 */6 * * *" },
    { label: "Monthly on 1st", expression: "0 0 1 * *" },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-card border-2 border-primary/30 overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Minute */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Minute <span className="text-muted-foreground text-xs">(0-59)</span>
              </label>
              <Input
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                placeholder="0 or * or */15"
                className="font-mono bg-background border-primary/60 text-foreground"
              />
            </div>

            {/* Hour */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Hour <span className="text-muted-foreground text-xs">(0-23)</span>
              </label>
              <Input
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="9 or * or 9-17"
                className="font-mono bg-background border-primary/60 text-foreground"
              />
            </div>

            {/* Day of Month */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Day of Month <span className="text-muted-foreground text-xs">(1-31)</span>
              </label>
              <Input
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="* or 1 or 1,15"
                className="font-mono bg-background border-primary/60 text-foreground"
              />
            </div>

            {/* Month */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Month <span className="text-muted-foreground text-xs">(1-12)</span>
              </label>
              <Input
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="* or 1,6,12"
                className="font-mono bg-background border-primary/60 text-foreground"
              />
            </div>

            {/* Day of Week */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-foreground">
                Day of Week <span className="text-muted-foreground text-xs">(0-6: Sun-Sat)</span>
              </label>
              <Input
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                placeholder="* or 1-5 or 0,6"
                className="font-mono bg-background border-primary/60 text-foreground"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-background border-2 border-accent/30 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Generated Expression
            </p>
            <div className="font-mono text-lg text-primary font-semibold">{builtExpression}</div>
          </div>

          {/* Build Button */}
          <Button
            onClick={handleBuild}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 h-auto"
          >
            Apply Expression
          </Button>
        </div>
      </Card>

      {/* Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Quick Presets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => onChange(preset.expression)}
              className="text-left bg-card border-2 border-primary/30 hover:border-primary/60 rounded-lg p-3 transition-all duration-200 group"
            >
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {preset.label}
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-1">{preset.expression}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
