"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChefHat, AlertTriangle, Languages } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface MenuItem {
  id: string
  name_en?: string | null
  name_tr: string
  description_en?: string | null
  description_tr: string
  price: number
  image: string
  category_id: string
  ingredients_en?: string | null
  ingredients_tr?: string | null
  allergens_en?: string | null
  allergens_tr?: string | null
  gallery_images?: string[] | null
  chef_recommendation_en?: string | null
  chef_recommendation_tr?: string | null
  calories?: number | null
  protein_g?: number | null
  carbs_g?: number | null
  fat_g?: number | null
  is_available?: boolean
  is_featured?: boolean
}

interface Category {
  id: string
  name_en?: string | null
  name_tr: string
  subtitle_en?: string | null
  subtitle_tr?: string | null
  display_order?: number
}

export function MenuDisplay() {
  const [activeCategory, setActiveCategory] = useState("")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [language, setLanguage] = useState<"en" | "tr">("tr") // Default to Turkish

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    setCurrentImageIndex(0)
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "tr" : "en"))
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true })

      if (categoriesError) throw categoriesError

      const { data: menuItemsData, error: menuItemsError } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("display_order", { ascending: true })

      if (menuItemsError) throw menuItemsError

      setCategories(categoriesData || [])
      setMenuItems(menuItemsData || [])

      if (categoriesData && categoriesData.length > 0) {
        setActiveCategory(categoriesData[0].id)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getItemsForCategory = (categoryId: string) => {
    return menuItems.filter((item) => item.category_id === categoryId)
  }

  const getCategoryName = (category: Category) => {
    return language === "tr" ? category.name_tr : category.name_en || category.name_tr
  }

  const getCategorySubtitle = (category: Category) => {
    return language === "tr" ? category.subtitle_tr || "" : category.subtitle_en || category.subtitle_tr || ""
  }

  const getItemName = (item: MenuItem) => {
    return language === "tr" ? item.name_tr : item.name_en || item.name_tr
  }

  const getItemDescription = (item: MenuItem) => {
    return language === "tr" ? item.description_tr : item.description_en || item.description_tr
  }

  const getItemIngredients = (item: MenuItem) => {
    const ingredients = language === "tr" ? item.ingredients_tr : item.ingredients_en || item.ingredients_tr
    return ingredients ? ingredients.split(",").map((i) => i.trim()) : []
  }

  const getItemAllergens = (item: MenuItem) => {
    const allergens = language === "tr" ? item.allergens_tr : item.allergens_en || item.allergens_tr
    return allergens ? allergens.split(",").map((a) => a.trim()) : []
  }

  const getItemChefRecommendation = (item: MenuItem) => {
    return language === "tr" ? item.chef_recommendation_tr : item.chef_recommendation_en || item.chef_recommendation_tr
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-red-50/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif font-black text-4xl md:text-5xl text-red-600 mb-4">
            {language === "tr" ? "Prime Steakhouse" : "Prime Steakhouse"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === "tr" ? "Enfes menümüz yükleniyor..." : "Loading our exquisite menu..."}
          </p>
        </div>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-red-50/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif font-black text-4xl md:text-5xl text-red-600 mb-4">Prime Steakhouse</h1>
          <p className="text-muted-foreground text-lg">
            {language === "tr"
              ? "Menü güncelleniyor. Lütfen daha sonra tekrar kontrol edin!"
              : "Menu is being updated. Please check back soon!"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-red-50/20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="font-serif font-black text-4xl md:text-5xl text-red-600 mb-2">Prime Steakhouse</h1>
            <p className="text-muted-foreground text-lg">
              {language === "tr"
                ? "Mutfak mükemmelliğinin premium kalite ile buluştuğu yer"
                : "Where culinary excellence meets premium quality"}
            </p>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={toggleLanguage} className="flex items-center gap-2 bg-transparent">
              <Languages className="w-4 h-4" />
              {language === "tr" ? "English" : "Türkçe"}
            </Button>
          </div>

          <nav className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                }`}
              >
                {getCategoryName(category)}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {categories.map((category) => {
          const categoryItems = getItemsForCategory(category.id)
          return (
            <section key={category.id} className={`${activeCategory === category.id ? "block" : "hidden"}`}>
              <div className="text-center mb-8">
                <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-2">
                  {getCategoryName(category)}
                </h2>
                <p className="text-muted-foreground text-lg italic">{getCategorySubtitle(category)}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={getItemName(item)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-serif font-bold text-xl text-foreground group-hover:text-red-600 transition-colors">
                          {getItemName(item)}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-800 font-semibold text-lg px-3 py-1"
                        >
                          ₺{item.price}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{getItemDescription(item)}</p>
                      <p className="text-red-600 text-sm mt-3 font-medium">
                        {language === "tr" ? "Detaylar için tıklayın →" : "Click for details →"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {categoryItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {language === "tr"
                      ? "Bu kategoride henüz öğe bulunmuyor."
                      : "No items available in this category yet."}
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    {language === "tr"
                      ? "Yeni eklemeler için yakında tekrar kontrol edin!"
                      : "Check back soon for new additions!"}
                  </p>
                </div>
              )}
            </section>
          )
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif font-black text-2xl text-red-600 pr-8">
                  {getItemName(selectedItem)}
                </DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={selectedItem.gallery_images?.[currentImageIndex] || selectedItem.image}
                      alt={getItemName(selectedItem)}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {selectedItem.gallery_images && selectedItem.gallery_images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {selectedItem.gallery_images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                            currentImageIndex === index ? "border-red-600" : "border-gray-200"
                          }`}
                        >
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`${getItemName(selectedItem)} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-amber-100 text-amber-800 font-bold text-xl px-4 py-2">
                      ₺{selectedItem.price}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-lg mb-2">
                      {language === "tr" ? "Açıklama" : "Description"}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{getItemDescription(selectedItem)}</p>
                  </div>

                  {getItemIngredients(selectedItem).length > 0 && (
                    <div>
                      <h4 className="font-serif font-bold text-lg mb-2">
                        {language === "tr" ? "İçindekiler" : "Ingredients"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {getItemIngredients(selectedItem).map((ingredient, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {getItemAllergens(selectedItem).length > 0 && (
                    <div>
                      <h4 className="font-serif font-bold text-lg mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        {language === "tr" ? "Alerjenler" : "Allergens"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {getItemAllergens(selectedItem).map((allergen, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {getItemChefRecommendation(selectedItem) && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-serif font-bold text-lg mb-2 flex items-center gap-2">
                        <ChefHat className="w-5 h-5 text-red-600" />
                        {language === "tr" ? "Şef Önerisi" : "Chef's Recommendation"}
                      </h4>
                      <p className="text-sm text-muted-foreground italic">
                        "{getItemChefRecommendation(selectedItem)}"
                      </p>
                    </div>
                  )}

                  {(selectedItem.calories || selectedItem.protein_g || selectedItem.carbs_g || selectedItem.fat_g) && (
                    <div>
                      <h4 className="font-serif font-bold text-lg mb-2">
                        {language === "tr" ? "Besin Değerleri" : "Nutritional Information"}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {selectedItem.calories && (
                          <div>
                            <span className="font-medium">{language === "tr" ? "Kalori:" : "Calories:"}</span>{" "}
                            {selectedItem.calories}
                          </div>
                        )}
                        {selectedItem.protein_g && (
                          <div>
                            <span className="font-medium">{language === "tr" ? "Protein:" : "Protein:"}</span>{" "}
                            {selectedItem.protein_g}g
                          </div>
                        )}
                        {selectedItem.carbs_g && (
                          <div>
                            <span className="font-medium">{language === "tr" ? "Karbonhidrat:" : "Carbs:"}</span>{" "}
                            {selectedItem.carbs_g}g
                          </div>
                        )}
                        {selectedItem.fat_g && (
                          <div>
                            <span className="font-medium">{language === "tr" ? "Yağ:" : "Fat:"}</span>{" "}
                            {selectedItem.fat_g}g
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="bg-red-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-serif font-bold text-2xl mb-2">Prime Steakhouse</h3>
          <p className="text-red-100">
            {language === "tr"
              ? "En kaliteli etler ve olağanüstü hizmet deneyimi"
              : "Experience the finest cuts and exceptional service"}
          </p>
        </div>
      </footer>
    </div>
  )
}
