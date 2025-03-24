"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { HeartIcon, Search, ShoppingBag, User } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

export default function Header() {
  const { cart } = useCart()
  const [isClient, setIsClient] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Wait until component is mounted to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-lg shadow-sm py-2" : "bg-background py-4"
      }`}
    >
      <div className="container flex items-center justify-between px-4 mx-auto sm:px-6">
        <Link href="/" className="flex items-center text-xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">LUXE</span>
          <span>Store</span>
        </Link>

        <div className="hidden mx-auto max-w-xs md:block md:w-full md:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              className="pl-10 w-full rounded-full bg-secondary/50 focus-visible:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <ThemeToggle />

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <HeartIcon className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="w-5 h-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant={scrolled ? "outline" : "secondary"} size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {isClient && totalItems > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5 bg-gradient-to-r from-purple-600 to-pink-600 border-0"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>

              <div className="py-6 h-full flex flex-col">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-12 h-12 mb-4 text-muted-foreground" />
                    <h3 className="font-medium">Ваша корзина пуста</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Добавьте товары в корзину</p>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-2 border-b">
                          <div className="relative w-20 h-20 overflow-hidden bg-secondary/20 rounded-md shrink-0">
                            {item.image && (
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="object-contain w-full h-full p-2"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                            <p className="mt-1 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 mt-auto space-y-4 border-t">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Итого:</span>
                        <span>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Link href="/cart" className="col-span-1">
                          <Button variant="outline" className="w-full">
                            Просмотр корзины
                          </Button>
                        </Link>
                        <Button className="col-span-1 w-full bg-gradient-to-r from-purple-600 to-pink-600 border-0 hover:from-purple-700 hover:to-pink-700">
                          Оформить заказ
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

