"use client"

import type { Product } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg active:scale-[0.98] transition-all duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-1.5 left-1.5 flex gap-1 flex-wrap">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary text-primary-foreground text-xs h-5 px-1.5">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="p-2.5 md:p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm md:text-lg mb-0.5 md:mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </Link>

        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-2xl font-bold text-primary">¥{product.price}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">已售 {product.sales}</p>
          </div>

          <Button
            size="icon"
            onClick={(e) => {
              e.preventDefault()
              onAddToCart?.(product)
            }}
            className="rounded-full h-9 w-9 md:h-10 md:w-10 flex-shrink-0 active:scale-95 transition-transform"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
