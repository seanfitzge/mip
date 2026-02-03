const PUBMED_BASE_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"

export async function searchPubMed(term: string) {
  const apiKey = process.env.PUBMED_API_KEY
  if (!apiKey) {
    return []
  }

  const searchUrl = `${PUBMED_BASE_URL}/esearch.fcgi?db=pubmed&retmode=json&term=${encodeURIComponent(
    term
  )}&api_key=${apiKey}`

  const response = await fetch(searchUrl)
  if (!response.ok) {
    return []
  }

  const data = await response.json()
  return data.esearchresult?.idlist ?? []
}
