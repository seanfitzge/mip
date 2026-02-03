import { getReverseDietProtocol } from "@/lib/data/protocols"
import { SectionHeader } from "@/components/section-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProtocolsPage() {
  const protocol = await getReverseDietProtocol()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Reverse diet protocol"
        subtitle="Structured phases to restore metabolism after a deficit."
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current phase: {protocol.currentPhase}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Weekly increase: {protocol.weeklyIncreaseKcal} kcal</p>
          <p>Target maintenance: {protocol.targetCalories} kcal</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {protocol.phases.map((phase) => (
          <Card key={phase.name}>
            <CardHeader>
              <CardTitle className="text-base">{phase.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{phase.duration}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {phase.focus.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
