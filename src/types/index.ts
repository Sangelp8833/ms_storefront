export type ProductType = 'standard' | 'sponsored'

export type OrderStatus = 'received' | 'preparing' | 'shipped' | 'delivered'

export interface SponsorInfo {
  name: string
  logoUrl: string
  tagline: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrls: string[]
  categoryId: string
  categoryName: string
  type: ProductType
  sponsorInfo?: SponsorInfo
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export interface Order {
  id: string
  trackingCode: string
  status: OrderStatus
  items: OrderItem[]
  total: number
  address: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name: string
  address: string
}

export interface PaginationMeta {
  total: number
  page: number
  perPage: number
}

export interface ApiError {
  error: string
  errors?: Record<string, string[]>
}
