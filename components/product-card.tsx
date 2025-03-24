"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Перевод категорий на русский
const categoryTranslations: Record<string, string> = {
  "men's clothing": "Мужская одежда",
  "women's clothing": "Женская одежда",
  jewelery: "Ювелирные изделия",
  electronics: "Электроника",
}

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent dialog from opening
    setIsFavorite(!isFavorite)
  }

  return (
    <Dialog>
      <Card
        className="overflow-hidden transition-all duration-300 group hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden aspect-square bg-secondary/10">
          <DialogTrigger className="w-full h-full">
            {product.image && (
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={cn("object-contain p-6 duration-700 ease-in-out", isHovered ? "scale-110" : "scale-100")}
              />
            )}
          </DialogTrigger>

          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {categoryTranslations[product.category] || product.category}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90",
                isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground",
              )}
              onClick={toggleFavorite}
            >
              <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
              <span className="sr-only">Добавить в избранное</span>
            </Button>
          </div>

          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 flex justify-center p-4 gap-2 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm translate-y-full transition-transform duration-300",
              isHovered ? "translate-y-0" : "",
            )}
          >
            <Button onClick={onAddToCart} size="sm" className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />В корзину
            </Button>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="bg-background/50">
                <Eye className="w-4 h-4" />
              </Button>
            </DialogTrigger>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-1">
            <h3 className="font-medium line-clamp-1">{product.title}</h3>
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg">${product.price.toFixed(2)}</div>
              <div className="flex items-center text-sm text-yellow-500">
                {"★".repeat(Math.round(product.rating.rate))}
                <span className="ml-1 text-xs text-muted-foreground">({product.rating.count})</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">{product.title}</DialogTitle>
          <DialogDescription className="text-sm">
            Категория: {categoryTranslations[product.category] || product.category} | Рейтинг: {product.rating.rate}/5 (
            {product.rating.count} отзывов)
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="relative aspect-square bg-secondary/10 rounded-md">
            {product.image && (
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain p-6"
              />
            )}
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Описание</h4>
                <p className="mt-1">{product.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Цена</h4>
                  <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={onAddToCart} size="lg" className="gap-2">
                    <ShoppingCart className="w-5 h-5" />В корзину
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "rounded-full",
                      isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground",
                    )}
                    onClick={toggleFavorite}
                  >
                    <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
                    <span className="sr-only">Добавить в избранное</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h4 className="text-sm font-medium text-muted-foreground">Детали</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="font-medium">ID:</span> {product.id}
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Категория:</span>{" "}
                  {categoryTranslations[product.category] || product.category}
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Рейтинг:</span> {product.rating.rate}/5
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Отзывы:</span> {product.rating.count}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

