import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Historia — TODO</div>} />
        <Route path="/tienda" element={<div>Tienda — TODO</div>} />
        <Route path="/carrito" element={<div>Carrito — TODO</div>} />
        <Route path="/login" element={<div>Login — TODO</div>} />
        <Route path="/registro" element={<div>Registro — TODO</div>} />
        <Route path="/pedido/:code" element={<div>Tracking — TODO</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
