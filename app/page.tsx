"use client"

import { useState } from "react"
import CronExplainer from "@/components/cron-explainer"
import CronInput from "@/components/cron-input"
import CronBuilder from "@/components/cron-builder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [cronExpression, setCronExpression] = useState("0 9 * * 1-5")

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Background accent */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-border/40 backdrop-blur-xl bg-background/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-4xl font-bold text-pretty">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Cron Expression Builder
              </span>
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Master cron scheduling with interactive exploration and real-time translation
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Explanation */}
            <div className="lg:col-span-1">
              <CronExplainer />
            </div>

            {/* Right Column - Builder and Input */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="input" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-card border border-border/50">
                  <TabsTrigger value="input" className="data-[state=active]:bg-primary/20">
                    Direct Input
                  </TabsTrigger>
                  <TabsTrigger value="builder" className="data-[state=active]:bg-primary/20">
                    Builder Form
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="input" className="mt-6">
                  <CronInput cronExpression={cronExpression} onChange={setCronExpression} />
                </TabsContent>

                <TabsContent value="builder" className="mt-6">
                  <CronBuilder cronExpression={cronExpression} onChange={setCronExpression} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
