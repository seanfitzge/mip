type FoodSearchResult = {
  fdcId: number
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

const MOCK_FOODS: FoodSearchResult[] = [
  { fdcId: 1, description: "Greek yogurt", calories: 120, protein: 20, carbs: 8, fat: 0 },
  { fdcId: 2, description: "Chicken breast", calories: 165, protein: 31, carbs: 0, fat: 3 },
  { fdcId: 3, description: "White rice", calories: 206, protein: 4, carbs: 45, fat: 0 }
]

export async function searchFoods(query: string): Promise<FoodSearchResult[]> {
  const apiKey = process.env.USDA_API_KEY
  if (!apiKey) {
    return MOCK_FOODS.filter((food) => food.description.toLowerCase().includes(query.toLowerCase()))
  }

  const response = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(query)}`
  )
  if (!response.ok) {
    return []
  }

  const data = await response.json()
  return (data.foods ?? []).slice(0, 10).map((item: any) => ({
    fdcId: item.fdcId,
    description: item.description,
    calories: Number(item.foodNutrients?.find((n: any) => n.nutrientName === "Energy")?.value ?? 0),
    protein: Number(item.foodNutrients?.find((n: any) => n.nutrientName === "Protein")?.value ?? 0),
    carbs: Number(item.foodNutrients?.find((n: any) => n.nutrientName === "Carbohydrate, by difference")?.value ?? 0),
    fat: Number(item.foodNutrients?.find((n: any) => n.nutrientName === "Total lipid (fat)")?.value ?? 0)
  }))
}
