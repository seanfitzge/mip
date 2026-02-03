import { getMacroTargets } from "@/lib/data/macros"
import { SectionHeader } from "@/components/section-header"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/ui/form-field"
import { Button } from "@/components/ui/button"

const mockLog = [
  { time: "7:30 AM", meal: "Greek yogurt + berries", calories: 320, protein: 32, carbs: 35, fat: 5 },
  { time: "12:15 PM", meal: "Chicken bowl", calories: 540, protein: 45, carbs: 60, fat: 12 },
  { time: "6:45 PM", meal: "Salmon + rice", calories: 620, protein: 48, carbs: 70, fat: 18 }
]

export default async function NutritionPage() {
  const macros = await getMacroTargets()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Nutrition targets"
        subtitle="Evidence-based macro ranges and daily logging."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Today&apos;s targets</h3>
              <ConfidenceBadge level={macros.confidenceLevel} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Calories
                </p>
                <p className="text-2xl font-bold text-foreground">{macros.calories}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Protein
                </p>
                <p className="text-2xl font-bold text-foreground">{macros.proteinG} g</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Carbs
                </p>
                <p className="text-2xl font-bold text-foreground">{macros.carbsG} g</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Fat
                </p>
                <p className="text-2xl font-bold text-foreground">{macros.fatG} g</p>
              </div>
            </div>
            <p className="text-sm text-mutedForeground">{macros.adjustmentReason}</p>
            <div className="flex flex-wrap gap-3 text-xs text-primary">
              <a href={`https://doi.org/${macros.proteinCitationDoi}`} target="_blank" rel="noreferrer">
                Protein DOI
              </a>
              <a href={`https://doi.org/${macros.carbCitationDoi}`} target="_blank" rel="noreferrer">
                Carb DOI
              </a>
              <a href={`https://doi.org/${macros.fatCitationDoi}`} target="_blank" rel="noreferrer">
                Fat DOI
              </a>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Macro calculator (preview)</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label="Weight (kg)" helperText="Used to estimate protein range." />
              <FormField label="Body fat %" helperText="Optional for lean mass targets." />
              <FormField label="Training type" helperText="Strength, endurance, mixed." />
              <FormField label="Goal" helperText="Cut, maintain, reverse diet." />
            </div>
            <p className="text-sm text-mutedForeground">
              This calculator will adapt to biomarkers in Phase 2.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Log food</h3>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1">
                <Input placeholder="Search foods..." aria-label="Search foods" />
              </div>
              <Button variant="secondary" className="h-12 px-4">
                📷
              </Button>
              <Button variant="secondary" className="h-12 px-4">
                🎤
              </Button>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                Quick add
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Eggs", "Oats", "Chicken", "Rice", "Salmon", "+ Add"].map((item) => (
                  <button
                    key={item}
                    className="rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Recent meals
                </p>
                <button className="text-xs font-semibold text-primary">Copy yesterday</button>
              </div>
              <div className="mt-2 space-y-2">
                {mockLog.map((entry) => (
                  <div key={entry.time} className="rounded-md border border-border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">
                        {entry.meal} · {entry.time}
                      </p>
                      <p className="text-xs text-mutedForeground">{entry.calories} kcal</p>
                    </div>
                    <p className="text-xs text-mutedForeground">
                      P:{entry.protein} C:{entry.carbs} F:{entry.fat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Today&apos;s progress</h3>
              <p className="text-xs text-mutedForeground">Updated 2 min ago</p>
            </div>
            {[
              { label: "Calories", value: 1847, target: 2650 },
              { label: "Protein", value: 156, target: 195 },
              { label: "Carbs", value: 198, target: 320 },
              { label: "Fat", value: 68, target: 88 }
            ].map((item) => {
              const progress = Math.min((item.value / item.target) * 100, 100)
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-xs text-mutedForeground">
                      {item.value} / {item.target}
                      {item.label === "Calories" ? "" : " g"}
                    </p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${progress}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )
            })}
            <div className="rounded-md border border-border p-3">
              <p className="text-sm font-semibold text-foreground">
                Quick log: Chicken breast (100g)
              </p>
              <div className="mt-2 space-y-1 text-sm text-mutedForeground">
                <p>Protein 31g · Carbs 0g · Fat 4g</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-mutedForeground">Serving</span>
                  <button className="rounded-md border border-border px-2 py-1 text-xs">-</button>
                  <span className="text-xs font-semibold text-foreground">100 g</span>
                  <button className="rounded-md border border-border px-2 py-1 text-xs">+</button>
                  <div className="ml-auto flex gap-2">
                    <Button variant="secondary" className="h-9 px-3 text-xs">
                      Cancel
                    </Button>
                    <Button className="h-9 px-3 text-xs">Log this</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Evidence-based macro ranges</h3>
            <p className="text-sm text-mutedForeground">
              Protein: 2.0-2.7 g/kg during deficit, 1.6-2.2 g/kg maintenance.
            </p>
            <p className="text-sm text-mutedForeground">
              Carbs: 3-5 g/kg strength, 5-7 g/kg mixed, 6-10 g/kg endurance.
            </p>
            <p className="text-sm text-mutedForeground">
              Fat minimums: 20% of calories to protect hormones (sex-specific thresholds).
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Nutrient timing guidance</h3>
            <p className="text-sm text-mutedForeground">
              Primary: hit daily protein, carbs, and fat targets first.
            </p>
            <p className="text-sm text-mutedForeground">
              Secondary: 0.4 g/kg protein per meal across 4+ meals, 3-4h apart.
            </p>
            <p className="text-sm text-mutedForeground">
              Optional: shift 20-30 g carbs to evening when sleep &lt;70 for 3+ nights.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Energy availability safeguards</h3>
          <p className="text-sm text-mutedForeground">
            Females: clinical &lt;30 kcal/kg FFM, subclinical &lt;45 kcal/kg FFM for 5+ days.
          </p>
          <p className="text-sm text-mutedForeground">
            Males: clinical &lt;25 kcal/kg FFM, subclinical &lt;40 kcal/kg FFM for 14+ days.
          </p>
          <p className="text-sm text-mutedForeground">
            If thresholds are crossed, the system increases intake and recommends recovery.
          </p>
        </div>
      </Card>
    </div>
  )
}
