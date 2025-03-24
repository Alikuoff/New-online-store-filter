"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import ProductCard from "@/components/product-card"
import type { Product } from "@/types/product"
import { Loader2, Search, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [categories, setCategories] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(1000)
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Перевод категорий на русский
  const categoryTranslations: Record<string, string> = {
    "men's clothing": "Мужская одежда",
    "women's clothing": "Женская одежда",
    jewelery: "Ювелирные изделия",
    electronics: "Электроника",
    all: "Все категории",
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)

        // Find categories and max price
        const uniqueCategories = Array.from(new Set(data.map((item: Product) => item.category)))
        setCategories(uniqueCategories as string[])

        const highestPrice = Math.ceil(Math.max(...data.map((item: Product) => item.price)))
        setMaxPrice(highestPrice)
        setPriceRange([0, highestPrice])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        toast({
          variant: "destructive",
          title: "Ошибка загрузки товаров",
          description: "Пожалуйста, попробуйте позже.",
        })
        setLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  useEffect(() => {
    // Apply filters whenever search, category or price range changes
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = category === "all" || product.category === category
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })

    setFilteredProducts(filtered)
  }, [searchQuery, category, priceRange, products])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: "Добавлено в корзину",
      description: `${product.title} добавлен в вашу корзину.`,
    })
  }

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setCategory("all")
    setPriceRange([0, maxPrice])
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Наши Товары</h2>
        <p className="text-muted-foreground">
          Просмотрите нашу коллекцию из {filteredProducts.length} уникальных товаров
        </p>
      </div>

      {/* Horizontal Filters */}
      <Card className="overflow-hidden border">
        <CardContent className="p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-sm font-medium">Поиск</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Категория</h3>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Все категории" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{categoryTranslations["all"]}</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {categoryTranslations[cat] || cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Ценовой диапазон</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, maxPrice]}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="mb-2"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={resetFilters} className="flex items-center">
              <X className="w-4 h-4 mr-2" />
              Сбросить фильтры
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div>
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center w-full h-64 border rounded-lg bg-background">
            <div className="text-center">
              <p className="mb-2 text-lg font-medium">Товары не найдены</p>
              <p className="text-sm text-muted-foreground">Попробуйте изменить параметры поиска или фильтры</p>
              <Button variant="link" onClick={resetFilters} className="mt-2">
                Сбросить все фильтры
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

