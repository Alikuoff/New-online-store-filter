import type React from "react"
import { Inter } from "next/font/google"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "LuxeStore - Современный Интернет-Магазин",
  description: "Откройте для себя премиальные товары по лучшим ценам",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <CartProvider>
            <Header />
            <main className="min-h-screen py-8">
              <div className="container px-4 mx-auto sm:px-6">{children}</div>
            </main>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'