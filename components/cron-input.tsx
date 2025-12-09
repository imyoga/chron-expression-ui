"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function translateCron(expression: string): string {
  try {
    const parts = expression.trim().split(/\s+/)
    if (parts.length !== 5) {
      return "Invalid cron format (expected 5 fields)"
    }

    const [minute, hour, day, month, dayOfWeek] = parts

    const dayOfWeekNames: { [key: string]: string } = {
      "0": "Sunday",
      "1": "Monday",
      "2": "Tuesday",
      "3": "Wednesday",
      "4": "Thursday",
      "5": "Friday",
      "6": "Saturday",
    }

    const monthNames: { [key: string]: string } = {
      "1": "January",
      "2": "February",
      "3": "March",
      "4": "April",
      "5": "May",
      "6": "June",
      "7": "July",
      "8": "August",
      "9": "September",
      "10": "October",
      "11": "November",
      "12": "December",
    }

    let translation = ""

    // Handle minute
    if (minute === "*") {
      translation += "every minute"
    } else if (minute.includes("/")) {
      const [_, step] = minute.split("/")
      translation += `every ${step} minutes`
    } else if (minute.includes("-")) {
      translation += `minute ${minute}`
    } else if (minute.includes(",")) {
      translation += `minutes ${minute}`
    } else {
      translation += `minute ${minute}`
    }

    translation += " at "

    // Handle hour and minute together
    if (hour === "*") {
      translation += "every hour"
    } else if (hour.includes("/")) {
      const [_, step] = hour.split("/")
      translation += `every ${step} hours`
    } else if (hour.includes("-")) {
      translation += `${hour.split("-")[0]}-${hour.split("-")[1]} hours`
    } else {
      translation += `${hour}:${minute === "*" ? "00" : minute}`
    }

    // Handle day of month
    if (day !== "*") {
      translation += ` on day ${day}`
    }

    // Handle month
    if (month !== "*") {
      const monthList = month
        .split(",")
        .map((m) => monthNames[m] || m)
        .join(", ")
      translation += ` of ${monthList}`
    }

    // Handle day of week
    if (dayOfWeek !== "*") {
      if (dayOfWeek.includes("-")) {
        const [start, end] = dayOfWeek.split("-")
        translation += ` (${dayOfWeekNames[start]}-${dayOfWeekNames[end]})`
      } else if (dayOfWeek.includes(",")) {
        const days = dayOfWeek
          .split(",")
          .map((d) => dayOfWeekNames[d] || d)
          .join(", ")
        translation += ` (${days})`
      } else {
        translation += ` (${dayOfWeekNames[dayOfWeek] || dayOfWeek})`
      }
    }

    return translation
  } catch {
    return "Invalid cron expression"
  }
}

export default function CronInput({
  cronExpression,
  onChange,
}: {
  cronExpression: string
  onChange: (value: string) => void
}) {
  const [isFocused, setIsFocused] = useState(false)

  const translation = translateCron(cronExpression)

  return (
    <div className="space-y-4">
      <Card className="bg-card border-2 border-primary/30 overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Cron Expression</label>
            <div className="relative group">
              <Input
                value={cronExpression}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="0 9 * * 1-5"
                className="font-mono text-base bg-background border-primary/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary/80 focus-visible:ring-primary/30"
              />
              <div
                className={`absolute inset-0 pointer-events-none rounded-md border-2 border-primary/0 transition-colors duration-200 ${
                  isFocused ? "border-primary/50" : ""
                }`}
              />
            </div>
          </div>

          <div className="bg-background border-2 border-accent/30 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Translation</p>
            <p className="text-sm text-foreground leading-relaxed text-balance">{translation}</p>
          </div>

          {/* Quick Reference */}
          <div className="grid grid-cols-5 gap-2 pt-4 border-t border-border/30">
            {[
              { label: "Min", value: "0" },
              { label: "Hour", value: "9" },
              { label: "Day", value: "*" },
              { label: "Month", value: "*" },
              { label: "DayOfWeek", value: "1-5" },
            ].map((field, idx) => (
              <div key={idx} className="text-center text-xs">
                <div className="text-muted-foreground font-semibold mb-1">{field.label}</div>
                <div className="font-mono text-primary text-sm">{field.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
