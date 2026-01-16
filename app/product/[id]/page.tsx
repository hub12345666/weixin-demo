"use client"

import { use } from "react"
import { mockProducts } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { useCart } from "@/components/cart-provider"
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    return <div>产品未找到</div>
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    router.push("/cart")
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold truncate">商品详情</h1>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Product Image */}
        <div className="relative aspect-square md:aspect-video overflow-hidden rounded-lg bg-muted mb-6">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {product.tags.map((tag) => (
                <Badge key={tag} className="bg-primary text-primary-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <Card className="p-6 mb-6">
          <h1 className="text-2xl font-bold mb-3 text-balance">{product.name}</h1>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-primary">¥{product.price}</span>
            <span className="text-sm text-muted-foreground">已售 {product.sales} 件</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
            <span>库存：{product.stock} 件</span>
            <span>分类：{product.category}</span>
          </div>

          <div>
            <h3 className="font-semibold mb-3">产品介绍</h3>
            <p className="text-muted-foreground leading-relaxed text-pretty">{product.description}</p>
          </div>
        </Card>

        {/* Product Details */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">产品详情</h3>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>本产品采用优质原料精心制作，严格把控生产工艺的每一个环节，确保产品品质。</p>
            <p>使用方法：请按照产品说明书或咨询专业人士指导使用。</p>
            <p>注意事项：请存放于阴凉干燥处，避免阳光直射。</p>
            <p>售后服务：支持7天无理由退换，让您购物无忧。</p>
          </div>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border pb-safe">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button className="flex-1" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              加入购物车
            </Button>
          </div>
        </div>
      </div>

      <div className="md:hidden h-16"></div>
      <MobileNav />
    </div>
  )
}
