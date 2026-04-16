import { create } from 'zustand'

interface AuthState {
  token: string | null
  userId: string | null
  email: string | null
  setAuth: (token: string, userId: string, email: string) => void
  clearAuth: () => void
}

const TOKEN_KEY = 'storefront_token'

export const useAuthStore = create<AuthState>((set) => ({
  token:  localStorage.getItem(TOKEN_KEY),
  userId: localStorage.getItem('storefront_user_id'),
  email:  localStorage.getItem('storefront_email'),

  setAuth: (token, userId, email) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem('storefront_user_id', userId)
    localStorage.setItem('storefront_email', email)
    set({ token, userId, email })
  },

  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem('storefront_user_id')
    localStorage.removeItem('storefront_email')
    set({ token: null, userId: null, email: null })
  },
}))
