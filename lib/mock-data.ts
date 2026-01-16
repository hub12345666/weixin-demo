export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  sales: number
  stock: number
  tags?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled"
  createdAt: string
  shippingInfo?: {
    name: string
    phone: string
    address: string
  }
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "陈年蕲艾条",
    description: "精选湖北蕲春三年陈艾，温和不燥，适合日常养生",
    price: 68,
    image: "/traditional-moxa-sticks-in-natural-packaging.jpg",
    category: "艾条",
    sales: 1280,
    stock: 500,
    tags: ["热销", "三年陈"],
  },
  {
    id: "2",
    name: "纯铜艾灸盒",
    description: "传统纯铜材质，导热均匀，配备防烫手柄，安全便捷",
    price: 128,
    image: "/traditional-copper-moxibustion-box.jpg",
    category: "艾灸器具",
    sales: 856,
    stock: 300,
    tags: ["精选"],
  },
  {
    id: "3",
    name: "随身灸艾灸盒",
    description: "便携式设计，可随身佩戴，适合办公室和居家使用",
    price: 88,
    image: "/portable-moxibustion-box-modern-design.jpg",
    category: "艾灸器具",
    sales: 2100,
    stock: 800,
    tags: ["热销", "便携"],
  },
  {
    id: "4",
    name: "艾灸礼盒套装",
    description: "包含优质艾条、艾灸盒及配件，送礼自用皆宜",
    price: 288,
    image: "/moxibustion-gift-set-elegant-packaging.jpg",
    category: "礼盒套装",
    sales: 560,
    stock: 200,
    tags: ["礼盒", "精选"],
  },
  {
    id: "5",
    name: "无烟艾条",
    description: "采用特殊工艺，减少烟雾90%，适合室内使用",
    price: 98,
    image: "/smokeless-moxa-sticks-modern-packaging.jpg",
    category: "艾条",
    sales: 1650,
    stock: 600,
    tags: ["热销", "无烟"],
  },
  {
    id: "6",
    name: "艾绒护膝",
    description: "内含优质艾绒，温暖膝关节，适合秋冬季节",
    price: 158,
    image: "/knee-warmer-with-moxa-natural-materials.jpg",
    category: "艾灸护具",
    sales: 720,
    stock: 400,
    tags: [],
  },
  {
    id: "7",
    name: "艾草精油",
    description: "天然萃取艾草精华，可用于按摩和香薰",
    price: 168,
    image: "/artemisia-essential-oil-natural-bottle.jpg",
    category: "艾草产品",
    sales: 430,
    stock: 250,
    tags: ["精选"],
  },
  {
    id: "8",
    name: "电子艾灸仪",
    description: "现代科技与传统养生结合，智能温控，安全无烟",
    price: 398,
    image: "/modern-electronic-moxibustion-device.jpg",
    category: "艾灸器具",
    sales: 920,
    stock: 180,
    tags: ["新品", "科技"],
  },
]

export const mockOrders: Order[] = [
  {
    id: "ORD20240116001",
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[1], quantity: 1 },
    ],
    total: 264,
    status: "shipped",
    createdAt: "2024-01-10",
    shippingInfo: {
      name: "张先生",
      phone: "138****8888",
      address: "北京市朝阳区xxx街道xxx号",
    },
  },
  {
    id: "ORD20240116002",
    items: [{ product: mockProducts[4], quantity: 3 }],
    total: 294,
    status: "paid",
    createdAt: "2024-01-14",
    shippingInfo: {
      name: "李女士",
      phone: "139****6666",
      address: "上海市浦东新区xxx路xxx号",
    },
  },
  {
    id: "ORD20240116003",
    items: [{ product: mockProducts[3], quantity: 1 }],
    total: 288,
    status: "completed",
    createdAt: "2024-01-05",
  },
]
