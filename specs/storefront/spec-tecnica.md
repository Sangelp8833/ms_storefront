# Especificacion Tecnica: Storefront — Tienda para Compradores

**Fecha**: 2026-04-15
**Estado**: Aprobada
**Base**: spec-funcional.md

---

## Stack

- **Framework**: React 18 + Vite 5 + TypeScript 5.3
- **Estilos**: Tailwind CSS 3.4 (tema cálido crema/terracota definido en `tailwind.config.ts`)
- **Routing**: React Router v6
- **Estado global**: Zustand 4.5
- **Animaciones**: Framer Motion 11
- **UI Primitives**: Radix UI (Dialog, DropdownMenu, Select, Toast)
- **Iconos**: Lucide React
- **HTTP**: Axios (instancia base apuntando a `http://localhost:4000/api`)
- **Fuentes**: Lora (headings), Inter (body) — Google Fonts en `index.html`

---

## Arquitectura

```
src/
├── App.tsx                        # Router principal
├── main.tsx
├── index.css
├── lib/
│   ├── utils.ts                   # cn() helper
│   └── api.ts                     # Instancia Axios configurada
├── store/
│   ├── authStore.ts               # Auth JWT + user info
│   └── cartStore.ts               # Items del carrito
├── types/
│   └── index.ts                   # Tipos globales
├── pages/
│   ├── HistoryPage.tsx            # "/"
│   ├── StorePage.tsx              # "/tienda"
│   ├── CartPage.tsx               # "/carrito"
│   ├── LoginPage.tsx              # "/login"
│   ├── RegisterPage.tsx           # "/registro"
│   ├── CheckoutPage.tsx           # "/checkout" (solo autenticado)
│   ├── OrderConfirmationPage.tsx  # "/orden/confirmacion"
│   └── OrderTrackingPage.tsx      # "/pedido/:code"
└── components/
    ├── layout/
    │   ├── Navbar.tsx             # Header con carrito badge + auth
    │   └── Footer.tsx
    ├── history/
    │   ├── HeroSection.tsx        # Sección 1: hero visual
    │   ├── StorySection.tsx       # Sección 2: historia
    │   ├── ValuesSection.tsx      # Sección 3: valores/propósito
    │   ├── ProductsPreviewSection.tsx  # Sección 4: preview productos
    │   ├── CtaSection.tsx         # Sección 5: CTA final a tienda
    │   └── ScrollCta.tsx          # Componente flecha/CTA reutilizable
    ├── store/
    │   ├── ProductCard.tsx        # Card producto estándar
    │   ├── SponsoredCard.tsx      # Card producto patrocinado
    │   ├── CategoryFilter.tsx     # Sidebar filtro categorías
    │   ├── ProductGrid.tsx        # Grid de cards
    │   └── ProductSkeleton.tsx    # Skeleton de carga
    ├── cart/
    │   ├── CartItem.tsx           # Fila de item en carrito
    │   └── CartSummary.tsx        # Subtotal + botón pagar
    ├── order/
    │   └── OrderTimeline.tsx      # Timeline de 4 pasos
    ├── auth/
    │   └── RequireAuthModal.tsx   # Modal "debes loguearte para pagar"
    └── shared/
        ├── Button.tsx
        ├── Input.tsx
        └── Spinner.tsx
```

---

## Tipos TypeScript Principales

```typescript
// src/types/index.ts

export type ProductType = 'standard' | 'sponsored'

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

export type OrderStatus = 'received' | 'preparing' | 'shipped' | 'delivered'

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

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export interface User {
  id: string
  email: string
  name: string
  address: string
}
```

---

## API Endpoints Consumidos (desde ms_backend)

### GET /api/storefront/products
Obtener productos del catálogo (con filtro opcional por categoría).

**Query params**: `?category_id=<id>&page=<n>&per_page=20`

**Response 200**:
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Kit Lectores Otoño",
      "description": "3 novelas + libreta personalizada",
      "price": 85000,
      "image_urls": ["https://..."],
      "category_id": "uuid",
      "category_name": "Kits Temáticos",
      "type": "sponsored",
      "sponsor_info": {
        "name": "Librería El Mundo",
        "logo_url": "https://...",
        "tagline": "Libros para cada momento"
      },
      "in_stock": true
    }
  ],
  "meta": { "total": 42, "page": 1, "per_page": 20 }
}
```

### GET /api/storefront/products/:id
Detalle de un producto.

### GET /api/storefront/categories
Lista de categorías para el filtro.

**Response 200**:
```json
{
  "data": [
    { "id": "uuid", "name": "Kits Temáticos", "slug": "kits-tematicos" }
  ]
}
```

### POST /api/auth/register
Registro de nuevo comprador.

**Request**:
```json
{
  "name": "María García",
  "email": "maria@example.com",
  "password": "secreto123",
  "address": "Calle 123 #45-67, Bogotá"
}
```

**Response 201**:
```json
{
  "token": "jwt...",
  "user": { "id": "uuid", "email": "maria@example.com", "name": "María García" }
}
```

**Errores**: 422 (email ya registrado, validación)

### POST /api/auth/login
Login de comprador.

**Request**: `{ "email": "...", "password": "..." }`

**Response 200**: `{ "token": "jwt...", "user": { ... } }`

**Errores**: 401 (credenciales inválidas)

### DELETE /api/auth/logout
Cierra sesión. Header: `Authorization: Bearer <token>`

### GET /api/auth/me
Perfil del usuario autenticado. Header: `Authorization: Bearer <token>`

### POST /api/storefront/orders
Crear una orden (requiere auth).

**Request**:
```json
{
  "items": [
    { "product_id": "uuid", "quantity": 2 }
  ],
  "address": "Calle 123 #45-67, Bogotá",
  "payment_method": "transfer"
}
```

**Response 201**:
```json
{
  "order": {
    "id": "uuid",
    "tracking_code": "LIV-A3F9",
    "status": "received",
    "total": 170000,
    "items": [...],
    "created_at": "2026-04-15T..."
  }
}
```

### GET /api/storefront/orders
Mis órdenes (requiere auth). Devuelve lista de órdenes del usuario autenticado.

### GET /api/storefront/orders/:code
Tracking por código (sin auth). Devuelve estado actual y timeline del pedido.

**Response 200**:
```json
{
  "order": {
    "tracking_code": "LIV-A3F9",
    "status": "preparing",
    "created_at": "2026-04-15T...",
    "updated_at": "2026-04-16T..."
  }
}
```

**Errores**: 404 (código no encontrado)

---

## Modelo de Datos del Store (Zustand)

### authStore (`src/store/authStore.ts`)
```typescript
interface AuthState {
  token: string | null
  userId: string | null
  email: string | null
  setAuth: (token: string, userId: string, email: string) => void
  clearAuth: () => void
}
// Persiste en localStorage con clave 'storefront_token'
```

### cartStore (`src/store/cartStore.ts`)
```typescript
interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
}
// Solo en memoria (no persiste en localStorage — se limpia al cerrar)
```

---

## Configuración de Axios (`src/lib/api.ts`)

```typescript
const api = axios.create({ baseURL: 'http://localhost:4000/api' })

// Interceptor: adjunta token JWT si existe
api.interceptors.request.use(config => {
  const token = localStorage.getItem('storefront_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptor: en 401, limpia auth y redirige a /login
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)
```

---

## Componentes Clave — Contrato de Props

### ProductCard
```typescript
interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}
```

### SponsoredCard
```typescript
interface SponsoredCardProps {
  product: Product  // product.type === 'sponsored'
  onAddToCart: (product: Product) => void
}
// Renderiza todo lo de ProductCard + SponsorBadge (logo, nombre, tagline)
```

### CategoryFilter
```typescript
interface CategoryFilterProps {
  categories: Category[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}
```

### OrderTimeline
```typescript
interface OrderTimelineProps {
  currentStatus: OrderStatus
}
// Renderiza 4 pasos fijos; resalta el actual, marca completados con check
```

### ScrollCta
```typescript
interface ScrollCtaProps {
  label?: string  // default: "Ver la tienda"
}
// Botón/flecha animada que navega a "/tienda" al hacer click
```

---

## Archivos a Crear/Modificar

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/lib/api.ts` | Crear | Instancia Axios con interceptores |
| `src/types/index.ts` | Crear | Todos los tipos globales |
| `src/store/authStore.ts` | Modificar | Ya existe scaffold, completar |
| `src/store/cartStore.ts` | Modificar | Ya existe scaffold, completar |
| `src/components/shared/Button.tsx` | Crear | Botón base con variantes |
| `src/components/shared/Input.tsx` | Crear | Input base con label + error |
| `src/components/shared/Spinner.tsx` | Crear | Spinner de carga |
| `src/components/layout/Navbar.tsx` | Crear | Header global |
| `src/components/layout/Footer.tsx` | Crear | Footer simple |
| `src/components/history/HeroSection.tsx` | Crear | Primera sección landing |
| `src/components/history/StorySection.tsx` | Crear | Segunda sección |
| `src/components/history/ValuesSection.tsx` | Crear | Tercera sección |
| `src/components/history/ProductsPreviewSection.tsx` | Crear | Cuarta sección |
| `src/components/history/CtaSection.tsx` | Crear | Quinta sección CTA |
| `src/components/history/ScrollCta.tsx` | Crear | Componente flecha reutilizable |
| `src/components/store/ProductCard.tsx` | Crear | Card producto estándar |
| `src/components/store/SponsoredCard.tsx` | Crear | Card producto patrocinado |
| `src/components/store/CategoryFilter.tsx` | Crear | Sidebar filtros |
| `src/components/store/ProductGrid.tsx` | Crear | Grid de cards |
| `src/components/store/ProductSkeleton.tsx` | Crear | Skeleton loading |
| `src/components/cart/CartItem.tsx` | Crear | Fila item carrito |
| `src/components/cart/CartSummary.tsx` | Crear | Total + CTA pagar |
| `src/components/order/OrderTimeline.tsx` | Crear | Timeline 4 pasos |
| `src/components/auth/RequireAuthModal.tsx` | Crear | Modal login requerido |
| `src/pages/HistoryPage.tsx` | Crear | Página historia "/" |
| `src/pages/StorePage.tsx` | Crear | Catálogo "/tienda" |
| `src/pages/CartPage.tsx` | Crear | Carrito "/carrito" |
| `src/pages/LoginPage.tsx` | Crear | Login "/login" |
| `src/pages/RegisterPage.tsx` | Crear | Registro "/registro" |
| `src/pages/CheckoutPage.tsx` | Crear | Checkout "/checkout" |
| `src/pages/OrderConfirmationPage.tsx` | Crear | Confirmación de orden |
| `src/pages/OrderTrackingPage.tsx` | Crear | Tracking "/pedido/:code" |
| `src/App.tsx` | Modificar | Completar rutas con componentes reales |

---

## Consideraciones

- **Lazy loading de imágenes**: usar `loading="lazy"` en todas las imágenes de producto.
- **Accesibilidad**: todos los botones deben tener `aria-label` cuando solo tengan íconos.
- **Rutas protegidas**: `/checkout` redirige a `/login` si no hay token; al hacer login regresa al carrito.
- **Cart persistencia**: el carrito NO persiste en localStorage para evitar inconsistencias de stock; se pierde al cerrar la pestaña.
- **Skeleton vs spinner**: usar skeleton para cargas de listas (catálogo), spinner para acciones puntuales (login, submit orden).
- **Framer Motion**: solo en la página historia y en transiciones de página; el catálogo no usa animaciones pesadas para mantener rendimiento.
- **Responsive**: diseño mobile-first; el sidebar de categorías colapsa en un selector `<select>` o bottom sheet en móvil.
