"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, ShoppingBag, ArrowLeft, Trash2, CreditCard, Truck } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  // Wait until component is mounted to avoid hy  = useState(false)
  //const { toast } = useToast() // Removed the redeclaration of toast

  // Wait until component is mounted to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const handleRemove = (id: number) => {
    removeFromCart(id)
    toast({
      title: "Товар удален",
      description: "Товар был удален из вашей корзины.",
    })
  }

  const handleCheckout = () => {
    toast({
      title: "Оформление заказа",
      description: "Обычно здесь происходит переход к оплате.",
    })
    clearCart()
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // Бесплатная доставка
  const total = subtotal + shipping

  // Порог для бесплатной доставки
  const freeShippingThreshold = 100
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100)

  if (!isClient) {
    return null
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Корзина</h1>
        <p className="text-muted-foreground">Просмотрите ваши товары и перейдите к оформлению заказа</p>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-6 border rounded-lg">
          <ShoppingBag className="w-20 h-20 text-muted-foreground" />
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Ваша корзина пуста</h2>
            <p className="mt-2 text-muted-foreground">Похоже, вы еще не добавили товары в корзину.</p>
          </div>
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 hover:from-purple-700 hover:to-pink-700"
            >
              Начать покупки
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Товары в корзине</CardTitle>
                <CardDescription>
                  У вас {totalItems}{" "}
                  {totalItems === 1 ? "товар" : totalItems >= 2 && totalItems <= 4 ? "товара" : "товаров"} в корзине
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-6">
                      <div className="relative w-24 h-24 overflow-hidden bg-secondary/20 rounded-md shrink-0">
                        {item.image && (
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-contain p-2"
                          />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-medium line-clamp-1">{item.title}</h3>
                          <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} за шт.</p>
                        <div className="flex items-center mt-auto space-x-2">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 rounded-none"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-12 h-8 text-center border-0 rounded-none"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 rounded-none"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(item.id)}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch pt-0 space-y-2">
                <Button variant="outline" onClick={clearCart}>
                  Очистить корзину
                </Button>
                <Link href="/" className="w-full">
                  <Button variant="link" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Продолжить покупки
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky space-y-6 top-20">
              <Card>
                <CardHeader>
                  <CardTitle>Сводка заказа</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subtotal < freeShippingThreshold && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          Добавьте еще на{" "}
                          <span className="font-semibold">${(freeShippingThreshold - subtotal).toFixed(2)}</span> для
                          бесплатной доставки
                        </span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Подытог</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доставка</span>
                      <span>{shipping === 0 ? "Бесплатно" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between pt-2 mt-2 font-semibold border-t">
                      <span>Итого</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 border-0 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Оформить заказ
                  </Button>

                  <div className="flex items-center pt-2 space-x-2 text-xs text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>Бесплатная доставка при заказе от ${freeShippingThreshold}</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

