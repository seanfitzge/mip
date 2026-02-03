import { getReverseDietProtocol } from "@/lib/data/protocols"
import { SectionHeader } from "@/components/section-header"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { ResearchCitationInline } from "@/components/research-citation-inline"
import { Button } from "@/components/ui/button"
import { ProtocolActions } from "@/components/protocols/protocol-actions"

export default async function ProtocolsPage() {
  const protocol = await getReverseDietProtocol()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Reverse diet protocol"
        subtitle="Structured phases to restore metabolism after a deficit."
      />
      <Card className="p-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Current phase: {protocol.currentPhase}</h3>
          <p className="text-sm text-mutedForeground">
            Phase {protocol.currentWeek} · Predicted completion {protocol.predictedEndDate}
          </p>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: "68%" }} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <p className="text-sm text-mutedForeground">
              Weekly increase: {protocol.weeklyIncreaseKcal} kcal
            </p>
            <p className="text-sm text-mutedForeground">
              Target maintenance: {protocol.targetCalories} kcal
            </p>
          </div>
          <ProtocolActions
            currentWeek={protocol.currentWeek}
            weeklyIncreaseKcal={protocol.weeklyIncreaseKcal}
          />
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Current targets</h3>
            <div className="space-y-2 text-sm text-mutedForeground">
              <p>Calories: 2,650 kcal (+100 from last week)</p>
              <p className="flex items-center gap-2">
                Protein: 195g (2.2 g/kg)
                <ResearchCitationInline
                  source="Phillips & Van Loon (2011), J Sports Sciences"
                  preview="Protein 1.6-2.2 g/kg supports muscle preservation."
                  full="Higher protein supports muscle protein synthesis during diet transitions."
                />
              </p>
              <p>Carbs: 320g</p>
              <p>Fat: 88g</p>
            </div>
            <Button variant="secondary" className="h-10 px-4 text-sm">
              Why these targets?
            </Button>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Metabolic response indicators</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Weight trend
                </p>
                <p className="text-sm font-semibold text-foreground">+0.2 kg/wk</p>
                <StatusBadge status="good" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Energy
                </p>
                <p className="text-sm font-semibold text-foreground">7.8 / 10</p>
                <StatusBadge status="good" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Sleep quality
                </p>
                <p className="text-sm font-semibold text-foreground">8.2 / 10</p>
                <StatusBadge status="optimal" />
              </div>
            </div>
            <p className="text-sm text-mutedForeground">
              Protocol insight: Weight gain rate is within the 0.1-0.3 kg target range.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button className="h-10 px-4 text-sm">View full protocol details</Button>
              <Button variant="secondary" className="h-10 px-4 text-sm">
                Adjust protocol
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {protocol.phases.map((phase) => (
          <Card key={phase.name} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{phase.name}</h3>
                <ConfidenceBadge level={phase.confidenceLevel} />
              </div>
              <p className="text-sm text-mutedForeground">{phase.duration}</p>
              <div className="space-y-1 text-sm text-mutedForeground">
                {phase.focus.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Water weight reality check</h3>
            <p className="text-sm text-mutedForeground">
              Expect 1-3 kg (2-7 lb) increase in 24-48 hours from glycogen + water.
            </p>
            <p className="text-sm text-mutedForeground">
              Peak weight days 1-2, stabilizes by days 3-5. This is not fat gain.
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Pacing guidance</h3>
            <p className="text-sm text-mutedForeground">
              Standard increase is +100-150 kcal/week (carb priority).
            </p>
            <p className="text-sm text-mutedForeground">
              If weight increases &gt;0.5 lb/week, slow to +50-75 kcal/week.
            </p>
            <p className="text-sm text-mutedForeground">
              Pace faster when HRV improves and RHR drops; slower if stressed.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Personalization inputs</h3>
          <p className="text-sm text-mutedForeground">
            Depth and duration of deficit, initial body fat, sex, and biometric response
            patterns adjust pacing automatically.
          </p>
          <p className="text-sm text-mutedForeground">
            Weekly micro-adjustments follow weight trends and recovery markers.
          </p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Critical note on rate</h3>
          <p className="text-sm text-mutedForeground">
            The 100-150 kcal/week increase is practitioner consensus, not definitive evidence.
          </p>
          <p className="text-sm text-mutedForeground">
            2024 research suggests immediate return to maintenance may perform similarly.
          </p>
          <p className="text-sm text-mutedForeground">
            MIP tests both approaches and updates recommendations as data improves.
          </p>
        </div>
      </Card>
    </div>
  )
}
