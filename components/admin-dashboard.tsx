"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Edit, Plus, Eye, LogOut, Upload, X, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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
  display_order?: number
  created_at?: string
  updated_at?: string
}

interface Category {
  id: string
  name_en?: string | null
  name_tr: string
  subtitle_en?: string | null
  subtitle_tr?: string | null
  display_order?: number
  created_at?: string
  updated_at?: string
}

export function AdminDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [databaseSetup, setDatabaseSetup] = useState(true)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
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

      if (categoriesError) {
        if (
          categoriesError.message.includes("does not exist") ||
          categoriesError.message.includes("table") ||
          categoriesError.code === "42P01"
        ) {
          setDatabaseSetup(false)
          setLoading(false)
          return
        }
        throw categoriesError
      }

      const { data: menuItemsData, error: menuItemsError } = await supabase
        .from("menu_items")
        .select(`
          *,
          categories!inner(id, name_tr, name_en)
        `)
        .order("display_order", { ascending: true })

      if (menuItemsError) {
        if (
          menuItemsError.message.includes("does not exist") ||
          menuItemsError.message.includes("table") ||
          menuItemsError.code === "42P01"
        ) {
          setDatabaseSetup(false)
          setLoading(false)
          return
        }
        throw menuItemsError
      }

      setCategories(categoriesData || [])
      setMenuItems(menuItemsData || [])
      setDatabaseSetup(true)

      if (categoriesData && categoriesData.length > 0) {
        setActiveTab(categoriesData[0].id)
      }
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Hata",
        description: "Menü verileri yüklenemedi",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Geçersiz dosya türü",
        description: "Lütfen bir resim dosyası seçin (JPG, PNG, GIF, vb.)",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Dosya çok büyük",
        description: "Lütfen 5MB'dan küçük bir resim seçin",
        variant: "destructive",
      })
      return
    }

    setImageFile(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64String = e.target?.result as string
      setSelectedImage(base64String)
    }
    reader.readAsDataURL(file)
  }

  const clearSelectedImage = () => {
    setSelectedImage(null)
    setImageFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const resetImageState = () => {
    setSelectedImage(null)
    setImageFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddItem = async (formData: FormData) => {
    const name_en = formData.get("name_en") as string
    const name_tr = formData.get("name_tr") as string
    const description_en = formData.get("description_en") as string
    const description_tr = formData.get("description_tr") as string
    const ingredients_en = formData.get("ingredients_en") as string
    const ingredients_tr = formData.get("ingredients_tr") as string
    const allergens_en = formData.get("allergens_en") as string
    const allergens_tr = formData.get("allergens_tr") as string
    const chef_recommendation_en = formData.get("chef_recommendation_en") as string
    const chef_recommendation_tr = formData.get("chef_recommendation_tr") as string
    const calories = formData.get("calories") ? Number.parseInt(formData.get("calories") as string) : null
    const protein_g = formData.get("protein_g") ? Number.parseFloat(formData.get("protein_g") as string) : null
    const carbs_g = formData.get("carbs_g") ? Number.parseFloat(formData.get("carbs_g") as string) : null
    const fat_g = formData.get("fat_g") ? Number.parseFloat(formData.get("fat_g") as string) : null
    const price = Number.parseFloat(formData.get("price") as string)
    const category_id = formData.get("category_id") as string
    const imageUrl = formData.get("image") as string

    if (!name_tr || !description_tr || !ingredients_tr || !price || !category_id) {
      toast({
        title: "Hata",
        description: "Lütfen tüm gerekli alanları doldurun (Türkçe alanlar zorunludur)",
        variant: "destructive",
      })
      return
    }

    const finalImage = selectedImage || imageUrl || "/delicious-food.png"

    try {
      const { data, error } = await supabase
        .from("menu_items")
        .insert([
          {
            name_en: name_en?.trim() || null,
            name_tr: name_tr.trim(),
            description_en: description_en?.trim() || null,
            description_tr: description_tr.trim(),
            ingredients_en: ingredients_en?.trim() || null,
            ingredients_tr: ingredients_tr.trim(),
            allergens_en: allergens_en?.trim() || null,
            allergens_tr: allergens_tr?.trim() || null,
            chef_recommendation_en: chef_recommendation_en?.trim() || null,
            chef_recommendation_tr: chef_recommendation_tr?.trim() || null,
            calories,
            protein_g,
            carbs_g,
            fat_g,
            price,
            category_id,
            image: finalImage,
            is_available: true,
            is_featured: false,
            display_order: menuItems.length + 1,
          },
        ])
        .select()

      if (error) throw error

      if (data) {
        setMenuItems((prev) => [...prev, ...data])
      }

      setIsDialogOpen(false)
      resetImageState()
      toast({
        title: "Başarılı",
        description: "Menü öğesi başarıyla eklendi",
      })
    } catch (error) {
      console.error("Error adding item:", error)
      toast({
        title: "Hata",
        description: "Menü öğesi eklenemedi",
        variant: "destructive",
      })
    }
  }

  const handleEditItem = async (formData: FormData) => {
    if (!editingItem) return

    const name_en = formData.get("name_en") as string
    const name_tr = formData.get("name_tr") as string
    const description_en = formData.get("description_en") as string
    const description_tr = formData.get("description_tr") as string
    const ingredients_en = formData.get("ingredients_en") as string
    const ingredients_tr = formData.get("ingredients_tr") as string
    const allergens_en = formData.get("allergens_en") as string
    const allergens_tr = formData.get("allergens_tr") as string
    const chef_recommendation_en = formData.get("chef_recommendation_en") as string
    const chef_recommendation_tr = formData.get("chef_recommendation_tr") as string
    const calories = formData.get("calories") ? Number.parseInt(formData.get("calories") as string) : null
    const protein_g = formData.get("protein_g") ? Number.parseFloat(formData.get("protein_g") as string) : null
    const carbs_g = formData.get("carbs_g") ? Number.parseFloat(formData.get("carbs_g") as string) : null
    const fat_g = formData.get("fat_g") ? Number.parseFloat(formData.get("fat_g") as string) : null
    const price = Number.parseFloat(formData.get("price") as string)
    const category_id = formData.get("category_id") as string
    const imageUrl = formData.get("image") as string

    if (!name_tr || !description_tr || !ingredients_tr || !price || !category_id) {
      toast({
        title: "Hata",
        description: "Lütfen tüm gerekli alanları doldurun (Türkçe alanlar zorunludur)",
        variant: "destructive",
      })
      return
    }

    const finalImage = selectedImage || imageUrl || editingItem.image

    try {
      const { data, error } = await supabase
        .from("menu_items")
        .update({
          name_en: name_en?.trim() || null,
          name_tr: name_tr.trim(),
          description_en: description_en?.trim() || null,
          description_tr: description_tr.trim(),
          ingredients_en: ingredients_en?.trim() || null,
          ingredients_tr: ingredients_tr.trim(),
          allergens_en: allergens_en?.trim() || null,
          allergens_tr: allergens_tr?.trim() || null,
          chef_recommendation_en: chef_recommendation_en?.trim() || null,
          chef_recommendation_tr: chef_recommendation_tr?.trim() || null,
          calories,
          protein_g,
          carbs_g,
          fat_g,
          price,
          category_id,
          image: finalImage,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingItem.id)
        .select()

      if (error) throw error

      if (data) {
        setMenuItems((prev) => prev.map((item) => (item.id === editingItem.id ? data[0] : item)))
      }

      setEditingItem(null)
      setIsDialogOpen(false)
      resetImageState()
      toast({
        title: "Başarılı",
        description: "Menü öğesi başarıyla güncellendi",
      })
    } catch (error) {
      console.error("Error updating item:", error)
      toast({
        title: "Hata",
        description: "Menü öğesi güncellenemedi",
        variant: "destructive",
      })
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase.from("menu_items").delete().eq("id", id)

      if (error) throw error

      setMenuItems((prev) => prev.filter((item) => item.id !== id))

      toast({
        title: "Başarılı",
        description: "Menü öğesi başarıyla silindi",
      })
    } catch (error) {
      console.error("Error deleting item:", error)
      toast({
        title: "Hata",
        description: "Menü öğesi silinemedi",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item)
    setSelectedImage(null)
    setImageFile(null)
    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    setEditingItem(null)
    resetImageState()
    setIsDialogOpen(true)
  }

  const handleLogout = async () => {
    try {
    
      const { error } = await supabase.auth.signOut()

if (error) {
  console.error('Çıkış yapılamadı:', error.message)
} else {
  console.log('Başarıyla çıkış yapıldı')
}

      toast({
        title: "Çıkış yapıldı",
        description: "Başarıyla çıkış yaptınız",
      })

      window.location.href = "/menu"
    } catch (error) {
      console.error("Error logging out:", error)
      toast({
        title: "Hata",
        description: "Çıkış yapılamadı",
        variant: "destructive",
      })
    }
  }

  const handleAddCategory = async (formData: FormData) => {
    const name_en = formData.get("categoryName_en") as string
    const name_tr = formData.get("categoryName_tr") as string

    if (!name_tr?.trim()) {
      toast({
        title: "Hata",
        description: "Türkçe kategori adı gereklidir",
        variant: "destructive",
      })
      return
    }

    if (categories.some((cat) => cat.name_tr.toLowerCase() === name_tr.toLowerCase())) {
      toast({
        title: "Hata",
        description: "Bu isimde bir kategori zaten mevcut",
        variant: "destructive",
      })
      return
    }

    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([
          {
            name_en: name_en?.trim() || null,
            name_tr: name_tr.trim(),
            subtitle_en: name_en?.trim() ? `Expertly crafted ${name_en.toLowerCase()}` : null,
            subtitle_tr: `Özenle hazırlanmış ${name_tr.toLowerCase()}`,
            display_order: categories.length + 1,
          },
        ])
        .select()

      if (error) throw error

      await loadData()

      if (data && data[0]) {
        setActiveTab(data[0].id)
      }

      // Clear the form inputs
      const form = document.querySelector("form[action]") as HTMLFormElement
      if (form) {
        form.reset()
      }

      toast({
        title: "Başarılı",
        description: "Kategori başarıyla eklendi",
      })
    } catch (error) {
      console.error("Error adding category:", error)
      toast({
        title: "Hata",
        description: "Kategori eklenemedi",
        variant: "destructive",
      })
    }
  }

  const handleEditCategory = async (formData: FormData) => {
    if (!editingCategory) return

    const name_en = formData.get("categoryName_en") as string
    const name_tr = formData.get("categoryName_tr") as string

    if (!name_tr?.trim()) {
      toast({
        title: "Hata",
        description: "Türkçe kategori adı gereklidir",
        variant: "destructive",
      })
      return
    }

    try {
      const { data, error } = await supabase
        .from("categories")
        .update({
          name_en: name_en?.trim() || null,
          name_tr: name_tr.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingCategory.id)
        .select()

      if (error) throw error

      await loadData()

      setEditingCategory(null)
      setIsCategoryDialogOpen(false)
      toast({
        title: "Başarılı",
        description: "Kategori başarıyla güncellendi",
      })
    } catch (error) {
      console.error("Error updating category:", error)
      toast({
        title: "Hata",
        description: "Kategori güncellenemedi",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    const itemsInCategory = menuItems.filter((item) => item.category_id === categoryId).length

    if (itemsInCategory > 0) {
      toast({
        title: "Kategori silinemiyor",
        description: `Bu kategoride ${itemsInCategory} öğe bulunuyor. Önce tüm öğeleri taşıyın veya silin.`,
        variant: "destructive",
      })
      return
    }

    try {
      const { error } = await supabase.from("categories").delete().eq("id", categoryId)

      if (error) throw error

      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))

      if (activeTab === categoryId) {
        const remainingCategories = categories.filter((cat) => cat.id !== categoryId)
        if (remainingCategories.length > 0) {
          setActiveTab(remainingCategories[0].id)
        }
      }

      toast({
        title: "Başarılı",
        description: "Kategori başarıyla silindi",
      })
    } catch (error) {
      console.error("Error deleting category:", error)
      toast({
        title: "Hata",
        description: "Kategori silinemedi",
        variant: "destructive",
      })
    }
  }

  const openEditCategoryDialog = (category: Category) => {
    setEditingCategory(category)
    setIsCategoryDialogOpen(true)
  }

  const openAddCategoryDialog = () => {
    setEditingCategory(null)
    setIsCategoryDialogOpen(true)
  }

  const getItemsForCategory = (categoryId: string) => {
    return menuItems.filter((item) => item.category_id === categoryId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-red-50/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif font-black text-4xl md:text-5xl text-red-600 mb-4">Yükleniyor...</h1>
          <p className="text-muted-foreground text-lg">Menü verileriniz yüklenirken lütfen bekleyin</p>
        </div>
      </div>
    )
  }

  if (!databaseSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-red-50/20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <h1 className="font-serif font-black text-4xl md:text-5xl text-red-600 mb-6">Veritabanı Kurulumu Gerekli</h1>
          <div className="bg-card border rounded-lg p-6 text-left space-y-4">
            <p className="text-muted-foreground text-lg mb-4">
              Veritabanı tabloları henüz oluşturulmamış. Veritabanınızı kurmak için aşağıdaki SQL betiklerini
              çalıştırın:
            </p>
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <strong>Adım 1:</strong> scripts/01_create_tables.sql dosyasını çalıştırın
              </div>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <strong>Adım 2:</strong> scripts/02_seed_data.sql dosyasını çalıştırın
              </div>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <strong>Adım 3:</strong> scripts/03_add_turkish_support.sql dosyasını çalıştırın
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Bu betikleri Supabase kontrol panelinizdeki SQL editöründe veya v0 arayüzü üzerinden çalıştırabilirsiniz.
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Button onClick={loadData} variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Tekrar Kontrol Et
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-red-50/20 ">
      <header className="bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="md:justify-between md:items-center">
            <div>
              <h1 className="font-serif font-black text-3xl md:text-4xl text-red-600">Yönetici Paneli</h1>
              <p className="text-muted-foreground">Steakhouse menünüzü yönetin</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Button asChild variant="outline" className="w-full md:w-fit">
                <a href="/menu">
                  <Eye className="w-4 h-4 mr-2" />
                  Menüyü Görüntüle
                </a>
              </Button>
              <Button variant="outline" onClick={handleLogout}  className="w-full md:w-fit">
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış Yap
              </Button>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={openAddCategoryDialog}  className="w-full md:w-fit">
                    <Settings className="w-4 h-4 mr-2" />
                    Kategorileri Yönet
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "Kategori Düzenle" : "Kategorileri Yönet"}</DialogTitle>
                  </DialogHeader>

                  {!editingCategory ? (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Mevcut Kategoriler</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <span className="font-medium">{category.name_tr}</span>
                                <Badge variant="secondary" className="ml-2">
                                  {getItemsForCategory(category.id).length} öğe
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => openEditCategoryDialog(category)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteCategory(category.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-semibold mb-4">Yeni Kategori Ekle</h3>
                        <form action={handleAddCategory} className="space-y-4">
                          <div>
                            <Label htmlFor="categoryName_tr" className="text-red-600">
                              Kategori Adı (Türkçe) *
                            </Label>
                            <Input
                              id="categoryName_tr"
                              name="categoryName_tr"
                              placeholder="Türkçe kategori adını girin"
                              required
                              className="border-red-200 focus:border-red-500 focus:ring-red-500"
                            />
                          </div>
                          <div>
                            <Label htmlFor="categoryName_en" className="text-gray-500">
                              Kategori Adı (İngilizce) <span className="text-sm">(isteğe bağlı)</span>
                            </Label>
                            <Input
                              id="categoryName_en"
                              name="categoryName_en"
                              placeholder="İngilizce kategori adını girin (isteğe bağlı)"
                              className="border-gray-200 focus:border-gray-400"
                            />
                          </div>
                          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Kategori Ekle
                          </Button>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <form action={handleEditCategory} className="space-y-4">
                      <div>
                        <Label htmlFor="categoryName_tr" className="text-red-600">
                          Kategori Adı (Türkçe) *
                        </Label>
                        <Input
                          id="categoryName_tr"
                          name="categoryName_tr"
                          defaultValue={editingCategory.name_tr || ""}
                          placeholder="Türkçe kategori adını girin"
                          required
                          className="border-red-200 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="categoryName_en" className="text-gray-500">
                          Kategori Adı (İngilizce) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Input
                          id="categoryName_en"
                          name="categoryName_en"
                          defaultValue={editingCategory.name_en || ""}
                          placeholder="İngilizce kategori adını girin (isteğe bağlı)"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditingCategory(null)}
                          className="flex-1"
                        >
                          İptal
                        </Button>
                        <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                          Kategoriyi Güncelle
                        </Button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openAddDialog} className="bg-red-600 hover:bg-red-700 w-full md:w-fit">
                    <Plus className="w-4 h-4 mr-2" />
                    Öğe Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? "Menü Öğesini Düzenle" : "Yeni Menü Öğesi Ekle"}</DialogTitle>
                  </DialogHeader>
                  <form action={editingItem ? handleEditItem : handleAddItem} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name_tr" className="text-red-600">
                          Ad (Türkçe) *
                        </Label>
                        <Input
                          id="name_tr"
                          name="name_tr"
                          defaultValue={editingItem?.name_tr || ""}
                          placeholder="Türkçe öğe adını girin"
                          required
                          className="border-red-200 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="name_en" className="text-gray-500">
                          Ad (İngilizce) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Input
                          id="name_en"
                          name="name_en"
                          defaultValue={editingItem?.name_en || ""}
                          placeholder="İngilizce öğe adını girin (isteğe bağlı)"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="description_tr" className="text-red-600">
                          Açıklama (Türkçe) *
                        </Label>
                        <Textarea
                          id="description_tr"
                          name="description_tr"
                          defaultValue={editingItem?.description_tr || ""}
                          placeholder="Türkçe öğe açıklamasını girin"
                          required
                          className="border-red-200 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description_en" className="text-gray-500">
                          Açıklama (İngilizce) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Textarea
                          id="description_en"
                          name="description_en"
                          defaultValue={editingItem?.description_en || ""}
                          placeholder="İngilizce öğe açıklamasını girin (isteğe bağlı)"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ingredients_tr" className="text-red-600">
                          İçerikler (Türkçe) *
                        </Label>
                        <Textarea
                          id="ingredients_tr"
                          name="ingredients_tr"
                          defaultValue={editingItem?.ingredients_tr || ""}
                          placeholder="Türkçe içerikleri girin (örn: Dana eti, tuz, karabiber)"
                          required
                          className="border-red-200 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ingredients_en" className="text-gray-500">
                          İçerikler (İngilizce) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Textarea
                          id="ingredients_en"
                          name="ingredients_en"
                          defaultValue={editingItem?.ingredients_en || ""}
                          placeholder="İngilizce içerikleri girin (isteğe bağlı)"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="allergens_tr" className="text-gray-600">
                          Alerjenler (Türkçe) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Input
                          id="allergens_tr"
                          name="allergens_tr"
                          defaultValue={editingItem?.allergens_tr || ""}
                          placeholder="Türkçe alerjen bilgilerini girin"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="allergens_en" className="text-gray-500">
                          Alerjenler (İngilizce) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Input
                          id="allergens_en"
                          name="allergens_en"
                          defaultValue={editingItem?.allergens_en || ""}
                          placeholder="İngilizce alerjen bilgilerini girin (isteğe bağlı)"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="chef_recommendation_tr" className="text-gray-600">
                          Şef Önerisi (Türkçe) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Textarea
                          id="chef_recommendation_tr"
                          name="chef_recommendation_tr"
                          defaultValue={editingItem?.chef_recommendation_tr || ""}
                          placeholder="Türkçe şef önerisini girin"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="chef_recommendation_en" className="text-gray-500">
                          Şef Önerisi (İngilizce) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Textarea
                          id="chef_recommendation_en"
                          name="chef_recommendation_en"
                          defaultValue={editingItem?.chef_recommendation_en || ""}
                          placeholder="İngilizce şef önerisini girin (isteğe bağlı)"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="price">Fiyat (₺) *</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          defaultValue={editingItem?.price || ""}
                          placeholder="0.00"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category_id">Kategori *</Label>
                        <Select name="category_id" defaultValue={editingItem?.category_id || ""} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name_tr}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="calories" className="text-gray-500">
                          Kalori <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Input
                          id="calories"
                          name="calories"
                          type="number"
                          min="0"
                          defaultValue={editingItem?.calories || ""}
                          placeholder="0"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="protein_g" className="text-gray-500">
                          Protein (g) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Input
                          id="protein_g"
                          name="protein_g"
                          type="number"
                          step="0.1"
                          min="0"
                          defaultValue={editingItem?.protein_g || ""}
                          placeholder="0.0"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="carbs_g" className="text-gray-500">
                          Karbonhidrat (g) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Input
                          id="carbs_g"
                          name="carbs_g"
                          type="number"
                          step="0.1"
                          min="0"
                          defaultValue={editingItem?.carbs_g || ""}
                          placeholder="0.0"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fat_g" className="text-gray-500">
                          Yağ (g) <span className="text-sm">(isteğe bağlı)</span>
                        </Label>
                        <Input
                          id="fat_g"
                          name="fat_g"
                          type="number"
                          step="0.1"
                          min="0"
                          defaultValue={editingItem?.fat_g || ""}
                          placeholder="0.0"
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Ürün Resmi</Label>
                      {(selectedImage || editingItem?.image) && (
                        <div className="relative">
                          <img
                            src={selectedImage || editingItem?.image}
                            alt="Önizleme"
                            className="w-full h-32 object-cover rounded-md border"
                          />
                          {selectedImage && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={clearSelectedImage}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {selectedImage ? "Resmi Değiştir" : "Resim Yükle"}
                        </Button>
                        <p className="text-xs text-muted-foreground">5MB'a kadar JPG, PNG, GIF desteklenir</p>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Veya URL kullanın</span>
                        </div>
                      </div>
                      <Input
                        id="image"
                        name="image"
                        defaultValue={editingItem?.image || ""}
                        placeholder="Resim URL'si girin (isteğe bağlı)"
                        disabled={!!selectedImage}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                      {editingItem ? "Öğeyi Güncelle" : "Öğe Ekle"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          
          <div className="overflow-x-auto no-scrollbar mx-4 px-4 md:w-full">
      <TabsList className="flex w-max gap-4">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="flex-shrink-0"
          >
            {category.name_tr}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getItemsForCategory(category.id).map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle>{item.name_tr}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <strong>Açıklama:</strong> {item.description_tr}
                        </div>
                        <div>
                          <strong>İçerikler:</strong> {item.ingredients_tr}
                        </div>
                        <div>
                          <strong>Alerjenler:</strong> {item.allergens_tr}
                        </div>
                        <div>
                          <strong>Şef Önerisi:</strong> {item.chef_recommendation_tr}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => openEditDialog(item)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Düzenle
                          </Button>
                          <Button variant="destructive" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Sil
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}
