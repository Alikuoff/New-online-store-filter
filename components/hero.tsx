import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center relative z-10">
          <div className="relative z-10 space-y-8">
            <div className="space-y-5">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-pink-500/20 text-pink-300 ring-1 ring-pink-500/30">
                Новая коллекция
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block">Откройте для себя</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                  Идеальные Товары
                </span>
              </h1>
              <p className="text-base text-gray-300 sm:text-xl md:text-2xl">
                Исследуйте нашу тщательно подобранную коллекцию премиальных товаров по конкурентным ценам.
              </p>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 border-0 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50"
              >
                Начать Покупки
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Link href="/cart">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  Корзина
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative mt-12 -mb-16 lg:mt-0">
            <div className="pl-10">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-2xl shadow-purple-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full max-w-[80%] max-h-[80%] z-10 relative">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center justify-center p-6 translate-y-12 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.5)] transition-all duration-300 group">
                        <div className="relative w-full h-40 transform group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                            alt="Рюкзак"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-6 translate-y-4 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-[0_20px_50px_rgba(219,_39,_119,_0.3)] hover:shadow-[0_20px_50px_rgba(219,_39,_119,_0.5)] transition-all duration-300 group">
                        <div className="relative w-full h-40 transform group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src="https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
                            alt="Ювелирное изделие"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-6 -translate-y-4 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-[0_20px_50px_rgba(124,_58,_237,_0.3)] hover:shadow-[0_20px_50px_rgba(124,_58,_237,_0.5)] transition-all duration-300 group">
                        <div className="relative w-full h-40 transform group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
                            alt="Мужская одежда"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-6 -translate-y-12 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-[0_20px_50px_rgba(236,_72,_153,_0.3)] hover:shadow-[0_20px_50px_rgba(236,_72,_153,_0.5)] transition-all duration-300 group">
                        <div className="relative w-full h-40 transform group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
                            alt="Женская одежда"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

