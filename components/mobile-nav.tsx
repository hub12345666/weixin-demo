"use client"

import { Home, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"

export function MobileNav() {
  const pathname = usePathname()
  const { items } = useCart()

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { href: "/", label: "首页", icon: Home },
    { href: "/cart", label: "购物车", icon: ShoppingCart, badge: cartItemsCount > 0 ? cartItemsCount : undefined },
    { href: "/profile", label: "我的", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90 border-t border-border md:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all active:scale-95",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 min-w-4 flex items-center justify-center px-1 font-semibold">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span className={cn("text-xs font-medium", isActive && "font-semibold")}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
