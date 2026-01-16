"use client"

import { mockProducts } from "@/lib/mock-data"
import { ProductCard } from "@/components/product-card"
import { MobileNav } from "@/components/mobile-nav"
import { useCart } from "@/components/cart-provider"
import { Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const { addToCart } = useCart()

  const categories = ["全部", "艾条", "艾灸器具", "礼盒套装", "艾灸护具", "艾草产品"]

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
        <div className="container max-w-6xl mx-auto px-3 md:px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <h1 className="text-lg md:text-xl font-bold text-balance">艾灸优选</h1>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索商品..." className="pl-9" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden sticky top-14 z-30 bg-background border-b border-border px-3 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索商品..." className="pl-9 h-10" />
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-secondary/30 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-10 md:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 text-balance leading-relaxed">
              传统养生智慧
              <br />
              融入现代生活
            </h2>
            <p className="text-base md:text-lg text-muted-foreground text-pretty leading-relaxed">
              精选优质艾条艾灸产品，传承千年中医养生之道，为您带来健康与舒适
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border sticky top-[108px] md:top-16 z-20 bg-background">
        <div className="container max-w-6xl mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "全部" ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors h-9 px-4 text-sm"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <MobileNav />
    </div>
  )
}
