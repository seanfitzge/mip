import { NextResponse } from "next/server"
import { seedResearchPapers } from "@/lib/seed/research-papers"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { jsonError } from "@/lib/api/utils"

export async function POST() {
  const admin = createSupabaseAdminClient()
  if (!admin) {
    return jsonError("Service role key missing", 500)
  }

  const { data, error } = await admin.from("research_papers").upsert(seedResearchPapers, {
    onConflict: "doi"
  })

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json({ inserted: data?.length ?? seedResearchPapers.length })
}
