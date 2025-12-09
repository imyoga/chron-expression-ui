export default function CronExplainer() {
  return (
    <div className="space-y-6">
      {/* Main Card */}
      <div className="bg-card border-2 border-primary/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">⏰</span>
          Cron Basics
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Cron expressions are a standardized format to schedule tasks. Each field represents a time unit.
        </p>

        {/* Fields Table */}
        <div className="space-y-3">
          <div className="text-xs font-mono bg-background border-2 border-accent/30 rounded p-3">
            <div className="text-primary font-semibold mb-2">Minute Hour Day Month DayOfWeek</div>
            <div className="text-muted-foreground">0 9 * * 1-5</div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex gap-2 items-start">
              <span className="text-accent font-semibold min-w-fit">Minute:</span>
              <span className="text-muted-foreground">0-59 or * (every minute)</span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-accent font-semibold min-w-fit">Hour:</span>
              <span className="text-muted-foreground">0-23 or * (every hour)</span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-accent font-semibold min-w-fit">Day:</span>
              <span className="text-muted-foreground">1-31 or * (every day)</span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-accent font-semibold min-w-fit">Month:</span>
              <span className="text-muted-foreground">1-12 or * (every month)</span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-accent font-semibold min-w-fit">DayOfWeek:</span>
              <span className="text-muted-foreground">0-6 (0=Sunday) or * (every day)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="bg-card border-2 border-secondary/30 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4">Common Examples</h3>
        <div className="space-y-3">
          <div className="bg-background border-2 border-primary/40 rounded p-3 hover:border-primary/70 transition-colors">
            <div className="font-mono text-sm text-primary mb-1">0 9 * * 1-5</div>
            <div className="text-xs text-muted-foreground">Every weekday at 9:00 AM</div>
          </div>
          <div className="bg-background border-2 border-accent/40 rounded p-3 hover:border-accent/70 transition-colors">
            <div className="font-mono text-sm text-accent mb-1">*/15 * * * *</div>
            <div className="text-xs text-muted-foreground">Every 15 minutes</div>
          </div>
          <div className="bg-background border-2 border-secondary/40 rounded p-3 hover:border-secondary/70 transition-colors">
            <div className="font-mono text-sm text-secondary mb-1">0 0 1 * *</div>
            <div className="text-xs text-muted-foreground">First day of every month at midnight</div>
          </div>
          <div className="bg-background border-2 border-primary/40 rounded p-3 hover:border-primary/70 transition-colors">
            <div className="font-mono text-sm text-primary mb-1">0 */6 * * *</div>
            <div className="text-xs text-muted-foreground">Every 6 hours</div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-accent/10 border-2 border-accent/40 rounded-lg p-4">
        <p className="text-xs text-accent-foreground font-semibold mb-2">💡 Pro Tip</p>
        <p className="text-xs text-accent-foreground/80 leading-relaxed">
          Use * for "every" and ranges like 1-5 for specific intervals. The / symbol is for steps (e.g., */15 means
          every 15 units).
        </p>
      </div>
    </div>
  )
}
