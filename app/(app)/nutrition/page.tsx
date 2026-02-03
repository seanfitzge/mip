import { getMacroTargets } from "@/lib/data/macros"
import { SectionHeader } from "@/components/section-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/table"

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
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p>Calories</p>
                <p className="text-2xl font-semibold text-foreground">{macros.calories}</p>
              </div>
              <div>
                <p>Protein</p>
                <p className="text-2xl font-semibold text-foreground">{macros.proteinG} g</p>
              </div>
              <div>
                <p>Carbs</p>
                <p className="text-2xl font-semibold text-foreground">{macros.carbsG} g</p>
              </div>
              <div>
                <p>Fat</p>
                <p className="text-2xl font-semibold text-foreground">{macros.fatG} g</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{macros.adjustmentReason}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Macro calculator (preview)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Weight (kg)" />
              <Input placeholder="Body fat %" />
              <Input placeholder="Training type" />
              <Input placeholder="Goal" />
            </div>
            <div className="rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
              This calculator will adapt to biomarkers in Phase 2.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today&apos;s log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Time</TableHeaderCell>
                <TableHeaderCell>Meal</TableHeaderCell>
                <TableHeaderCell>Calories</TableHeaderCell>
                <TableHeaderCell>Protein</TableHeaderCell>
                <TableHeaderCell>Carbs</TableHeaderCell>
                <TableHeaderCell>Fat</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockLog.map((entry) => (
                <TableRow key={entry.time}>
                  <TableCell>{entry.time}</TableCell>
                  <TableCell>{entry.meal}</TableCell>
                  <TableCell>{entry.calories}</TableCell>
                  <TableCell>{entry.protein} g</TableCell>
                  <TableCell>{entry.carbs} g</TableCell>
                  <TableCell>{entry.fat} g</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
