import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ToastProvider } from '@/components/shared/Toast'
import { useAuthStore } from '@/store/authStore'

import { HistoryPage }           from '@/pages/HistoryPage'
import { StorePage }             from '@/pages/StorePage'
import { CartPage }              from '@/pages/CartPage'
import { LoginPage }             from '@/pages/LoginPage'
import { RegisterPage }          from '@/pages/RegisterPage'
import { CheckoutPage }          from '@/pages/CheckoutPage'
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage'
import { OrderTrackingPage }     from '@/pages/OrderTrackingPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token)
  if (!token) return <Navigate to="/login?redirect=/checkout" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"                  element={<HistoryPage />} />
          <Route path="/tienda"            element={<StorePage />} />
          <Route path="/carrito"           element={<CartPage />} />
          <Route path="/login"             element={<LoginPage />} />
          <Route path="/registro"          element={<RegisterPage />} />
          <Route path="/pedido/:code"      element={<OrderTrackingPage />} />
          <Route path="/orden/confirmacion" element={<OrderConfirmationPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
