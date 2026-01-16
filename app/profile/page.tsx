"use client"

import { MobileNav } from "@/components/mobile-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Package,
  Truck,
  CheckCircle2,
  RefreshCcw,
  MessageCircle,
  ChevronRight,
  Settings,
  HelpCircle,
} from "lucide-react"
import { mockOrders } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

const orderStatusMap = {
  pending: { label: "待支付", icon: Package, color: "text-amber-600" },
  paid: { label: "待发货", icon: Package, color: "text-blue-600" },
  shipped: { label: "运输中", icon: Truck, color: "text-purple-600" },
  completed: { label: "已完成", icon: CheckCircle2, color: "text-green-600" },
  cancelled: { label: "已取消", icon: RefreshCcw, color: "text-gray-600" },
}

export default function ProfilePage() {
  const orderStats = {
    pending: mockOrders.filter((o) => o.status === "pending").length,
    paid: mockOrders.filter((o) => o.status === "paid").length,
    shipped: mockOrders.filter((o) => o.status === "shipped").length,
    completed: mockOrders.filter((o) => o.status === "completed").length,
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-muted/30">
      {/* Header */}
      <header className="bg-gradient-to-b from-primary/10 to-background border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 pt-8 pb-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">用户</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold mb-1">欢迎回来</h2>
              <p className="text-sm text-muted-foreground">开启健康养生之旅</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Order Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">我的订单</h3>
            <Button variant="ghost" size="sm" className="text-sm">
              查看全部
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { key: "pending", label: "待支付", icon: Package },
              { key: "paid", label: "待发货", icon: Truck },
              { key: "shipped", label: "运输中", icon: Truck },
              { key: "completed", label: "已完成", icon: CheckCircle2 },
            ].map((item) => {
              const Icon = item.icon
              const count = orderStats[item.key as keyof typeof orderStats]

              return (
                <button
                  key={item.key}
                  className="flex flex-col items-center gap-2 py-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="relative">
                    <Icon className="h-6 w-6 text-primary" />
                    {count > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {count}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs">{item.label}</span>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Recent Orders */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">最近订单</h3>

          <div className="space-y-3">
            {mockOrders.slice(0, 2).map((order) => {
              const statusInfo = orderStatusMap[order.status]
              const StatusIcon = statusInfo.icon

              return (
                <div
                  key={order.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">订单号：{order.id}</span>
                    <div className={`flex items-center gap-1 ${statusInfo.color}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{statusInfo.label}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-sm">
                      共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品
                    </span>
                    <span className="font-semibold text-primary">¥{order.total}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Services */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">服务中心</h3>

          <div className="space-y-2">
            {[
              { icon: RefreshCcw, label: "售后服务", desc: "退换货、维权" },
              { icon: MessageCircle, label: "在线客服", desc: "联系客服解决问题" },
              { icon: HelpCircle, label: "帮助中心", desc: "常见问题与使用指南" },
              { icon: Settings, label: "设置", desc: "账号设置与隐私" },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={idx}
                  className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              )
            })}
          </div>
        </Card>
      </div>

      <MobileNav />
    </div>
  )
}
