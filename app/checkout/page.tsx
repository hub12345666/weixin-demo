"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    clearCart()
    toast({
      title: "支付成功！",
      description: '订单已提交，请在"我的订单"中查看详情',
    })

    router.push("/profile")
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold">确认订单</h1>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Shipping Address */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">收货信息</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">收货人</Label>
              <Input
                id="name"
                placeholder="请输入收货人姓名"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">联系电话</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号码"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">收货地址</Label>
              <Input
                id="address"
                placeholder="请输入详细地址"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
          </form>
        </Card>

        {/* Order Items */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">商品清单</h3>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="font-semibold text-primary">¥{item.product.price * item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">商品金额</span>
              <span>¥{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">运费</span>
              <span className="text-green-600">免运费</span>
            </div>
            <div className="h-px bg-border"></div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">实付金额</span>
              <span className="text-2xl font-bold text-primary">¥{total.toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full mt-6" size="lg" onClick={handleSubmit} disabled={isProcessing}>
            {isProcessing ? "处理中..." : "提交订单"}
          </Button>
        </Card>
      </div>
    </div>
  )
}
