import { create } from 'zustand'

interface AuthState {
  token: string | null
  userId: string | null
  email: string | null
  name: string | null
  setAuth: (token: string, userId: string, email: string, name: string) => void
  clearAuth: () => void
}

const K = { token: 'storefront_token', userId: 'storefront_user_id', email: 'storefront_email', name: 'storefront_name' }

export const useAuthStore = create<AuthState>(() => ({
  token:  localStorage.getItem(K.token),
  userId: localStorage.getItem(K.userId),
  email:  localStorage.getItem(K.email),
  name:   localStorage.getItem(K.name),

  setAuth: (token, userId, email, name) => {
    localStorage.setItem(K.token, token)
    localStorage.setItem(K.userId, userId)
    localStorage.setItem(K.email, email)
    localStorage.setItem(K.name, name)
    useAuthStore.setState({ token, userId, email, name })
  },

  clearAuth: () => {
    Object.values(K).forEach((k) => localStorage.removeItem(k))
    useAuthStore.setState({ token: null, userId: null, email: null, name: null })
  },
}))
