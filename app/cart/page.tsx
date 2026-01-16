"use client"

import { MobileNav } from "@/components/mobile-nav"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart()
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(items.map((item) => item.product.id)))

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(items.map((item) => item.product.id)))
    }
  }

  const toggleSelectItem = (productId: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedItems(newSelected)
  }

  const selectedTotal = items
    .filter((item) => selectedItems.has(item.product.id))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen pb-20 md:pb-8 bg-background">
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
          <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center">
            <h1 className="text-xl font-semibold">购物车</h1>
          </div>
        </header>

        <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <ShoppingBag className="h-24 w-24 text-muted-foreground" />
            <h2 className="text-xl font-semibold">购物车是空的</h2>
            <p className="text-muted-foreground">去首页看看有什么好物吧</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              去逛逛
            </Button>
          </div>
        </div>

        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-32 md:pb-8 bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center">
          <h1 className="text-xl font-semibold">购物车 ({items.length})</h1>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Select All */}
        <div className="flex items-center gap-3 mb-4 px-2">
          <Checkbox id="select-all" checked={selectedItems.size === items.length} onCheckedChange={toggleSelectAll} />
          <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
            全选
          </label>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <Card key={item.product.id} className="p-4">
              <div className="flex gap-4">
                <Checkbox
                  checked={selectedItems.has(item.product.id)}
                  onCheckedChange={() => toggleSelectItem(item.product.id)}
                  className="mt-1"
                />

                <div
                  className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0 cursor-pointer"
                  onClick={() => router.push(`/product/${item.product.id}`)}
                >
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold mb-1 line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => router.push(`/product/${item.product.id}`)}
                  >
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{item.product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">¥{item.product.price}</span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 border border-border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Checkout */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border pb-safe">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">已选 {selectedItems.size} 件商品</span>
            <div className="text-right">
              <span className="text-sm text-muted-foreground mr-2">合计：</span>
              <span className="text-2xl font-bold text-primary">¥{selectedTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={selectedItems.size === 0}
            onClick={() => router.push("/checkout")}
          >
            去结算 ({selectedItems.size})
          </Button>
        </div>
      </div>

      <div className="md:hidden h-16"></div>
      <MobileNav />
    </div>
  )
}
