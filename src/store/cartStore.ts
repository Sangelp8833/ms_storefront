import { create } from 'zustand'
import type { CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((s) => {
      const existing = s.items.find((i) => i.productId === item.productId)
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        }
      }
      return { items: [...s.items, item] }
    }),

  removeItem: (productId) =>
    set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),

  updateQuantity: (productId, quantity) =>
    set((s) => ({
      items:
        quantity <= 0
          ? s.items.filter((i) => i.productId !== productId)
          : s.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    })),

  clearCart: () => set({ items: [] }),

  total: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  count: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),
}))
