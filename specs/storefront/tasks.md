# Tareas: Storefront — Tienda para Compradores

**Fecha**: 2026-04-15
**Spec Funcional**: spec-funcional.md
**Spec Técnica**: spec-tecnica.md

## Resumen

- **Total tareas**: 14
- **Progreso**: 0/14 completadas

---

## Tareas

### T1. Infraestructura base: tipos, API client y componentes shared
**Capa**: infraestructura
**Tamaño**: M
**Depende de**: Ninguna

**Qué hacer:**
- [ ] Crear `src/types/index.ts` con: `Product`, `ProductType`, `SponsorInfo`, `Category`, `CartItem`, `Order`, `OrderItem`, `OrderStatus`, `User`
- [ ] Crear `src/lib/api.ts` con instancia Axios, interceptor de token y interceptor 401
- [ ] Crear `src/components/shared/Button.tsx` con variantes: `primary`, `secondary`, `ghost`
- [ ] Crear `src/components/shared/Input.tsx` con props: `label`, `error`, `...rest`
- [ ] Crear `src/components/shared/Spinner.tsx` (SVG animado con Tailwind)

**Archivos involucrados:**
- `src/types/index.ts`, `src/lib/api.ts`, `src/components/shared/Button.tsx`, `src/components/shared/Input.tsx`, `src/components/shared/Spinner.tsx`

**Criterio de completado:** `api.ts` exporta instancia Axios funcional; todos los tipos compilán sin error.

---

### T2. Layout global: Navbar y Footer
**Capa**: layout
**Tamaño**: M
**Depende de**: T1

**Qué hacer:**
- [ ] Crear `src/components/layout/Navbar.tsx`:
  - Logo/nombre "Los Libros de Ivonnet" (link a "/")
  - Link "Tienda" (link a "/tienda")
  - Ícono carrito (Lucide `ShoppingBag`) con badge de cantidad (desde `cartStore`)
  - Ícono usuario: si no logueado → link a "/login"; si logueado → dropdown con "Mis pedidos" y "Cerrar sesión"
- [ ] Crear `src/components/layout/Footer.tsx`: texto simple, links básicos
- [ ] Crear un `Layout` wrapper que incluya `Navbar` + `<Outlet/>` + `Footer`
- [ ] Actualizar `App.tsx` para usar el Layout wrapper en las rutas principales

**Archivos involucrados:**
- `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/App.tsx`

**Criterio de completado:** Navbar muestra badge dinámico; dropdown de usuario funciona; rutas usan el layout.

---

### T3. Stores Zustand: authStore y cartStore
**Capa**: estado
**Tamaño**: S
**Depende de**: T1

**Qué hacer:**
- [ ] Completar `src/store/authStore.ts`: `token`, `userId`, `email` desde `localStorage`; `setAuth()` guarda en LS; `clearAuth()` limpia LS
- [ ] Completar `src/store/cartStore.ts`: `addItem` fusiona si ya existe; `updateQuantity` elimina si qty=0; `total()` calcula suma correctamente
- [ ] Verificar que el tipo `CartItem` importado coincide con `src/types/index.ts`

**Archivos involucrados:**
- `src/store/authStore.ts`, `src/store/cartStore.ts`

**Criterio de completado:** Tests manuales: agregar mismo producto dos veces suma cantidades; limpiar carrito resetea a `[]`.

---

### T4. Página Historia "/" — Landing animada
**Capa**: páginas
**Tamaño**: L
**Depende de**: T2

**Qué hacer:**
- [ ] Crear `src/components/history/ScrollCta.tsx`: botón/flecha `→ Ver la tienda` que navega a "/tienda"; animación de rebote con Framer Motion
- [ ] Crear `src/components/history/HeroSection.tsx`: imagen de fondo o ilustración, título grande en Lora, subtítulo, `ScrollCta`
- [ ] Crear `src/components/history/StorySection.tsx`: texto historia de la marca, imagen lateral, `ScrollCta`
- [ ] Crear `src/components/history/ValuesSection.tsx`: 3 valores con ícono, `ScrollCta`
- [ ] Crear `src/components/history/ProductsPreviewSection.tsx`: grid pequeño con 3-4 imágenes de productos, `ScrollCta`
- [ ] Crear `src/components/history/CtaSection.tsx`: sección final con CTA grande a tienda
- [ ] Crear `src/pages/HistoryPage.tsx`: ensambla todas las secciones con `motion.div` para fade-in en viewport
- [ ] Cada sección usa `whileInView` de Framer Motion (no `useEffect`)

**Archivos involucrados:**
- `src/components/history/*.tsx`, `src/pages/HistoryPage.tsx`

**Criterio de completado:** 5 secciones scrolleables; `ScrollCta` visible en cada sección; animaciones suaves en scroll.

---

### T5. Catálogo: ProductCard y SponsoredCard
**Capa**: componentes
**Tamaño**: M
**Depende de**: T1

**Qué hacer:**
- [ ] Crear `src/components/store/ProductCard.tsx`: imagen (lazy), nombre, descripción truncada a 2 líneas, precio formateado en COP, botón "Agregar al carrito"
- [ ] Crear `src/components/store/SponsoredCard.tsx`: extiende `ProductCard` añadiendo un bloque inferior con logo del patrocinador, nombre y tagline; badge "Patrocinado" en esquina superior
- [ ] Crear `src/components/store/ProductSkeleton.tsx`: placeholder animado con `animate-pulse` para durante la carga
- [ ] Función helper `formatPrice(n: number): string` para `$85.000 COP`
- [ ] Lógica: si `product.type === 'sponsored'` → renderizar `SponsoredCard`, sino `ProductCard`

**Archivos involucrados:**
- `src/components/store/ProductCard.tsx`, `src/components/store/SponsoredCard.tsx`, `src/components/store/ProductSkeleton.tsx`

**Criterio de completado:** Ambas cards renderizan correctamente con datos mock; la sponsored muestra bloque patrocinador; la estándar no.

---

### T6. Catálogo: CategoryFilter y ProductGrid
**Capa**: componentes
**Tamaño**: M
**Depende de**: T5

**Qué hacer:**
- [ ] Crear `src/components/store/CategoryFilter.tsx`:
  - Desktop: lista vertical en sidebar con categorías clicables; la activa resaltada con `accent`
  - Mobile: `<select>` o acordeón colapsable
  - Opción "Todas" siempre presente (id=null)
- [ ] Crear `src/components/store/ProductGrid.tsx`: grid responsive 1-2-3 cols; renderiza `ProductCard` o `SponsoredCard` según tipo; acepta `products[]` y estado de carga

**Archivos involucrados:**
- `src/components/store/CategoryFilter.tsx`, `src/components/store/ProductGrid.tsx`

**Criterio de completado:** Filtrar por categoría actualiza el grid; "Todas" muestra todo; skeleton aparece durante fetch.

---

### T7. Página Tienda "/tienda"
**Capa**: páginas
**Tamaño**: M
**Depende de**: T6, T3

**Qué hacer:**
- [ ] Crear `src/pages/StorePage.tsx`:
  - Fetch de categorías al montar (`GET /api/storefront/categories`)
  - Fetch de productos al montar y cuando cambia `selectedCategoryId` (`GET /api/storefront/products?category_id=...`)
  - Layout: sidebar `CategoryFilter` (md:w-64) + grid `ProductGrid` (flex-1)
  - `onAddToCart` llama `cartStore.addItem()` y muestra toast de confirmación (Radix Toast)
  - Estado vacío: mensaje "No hay productos en esta categoría"
  - Paginación simple (prev/next) usando `meta.page` y `meta.total`

**Archivos involucrados:**
- `src/pages/StorePage.tsx`

**Criterio de completado:** Productos cargan desde API; filtro por categoría funciona; agregar al carrito actualiza badge del Navbar.

---

### T8. Páginas Auth: Login y Registro
**Capa**: páginas
**Tamaño**: M
**Depende de**: T1, T3

**Qué hacer:**
- [ ] Crear `src/pages/LoginPage.tsx`:
  - Formulario: email, contraseña
  - Validación: email válido, contraseña no vacía
  - POST `/api/auth/login` → en éxito: `authStore.setAuth()` + redirect
  - Redirect destino: `?redirect=` param o `/tienda` por defecto
  - Link a `/registro`
- [ ] Crear `src/pages/RegisterPage.tsx`:
  - Formulario: nombre, email, contraseña (≥8 chars), dirección
  - POST `/api/auth/register` → en éxito: `authStore.setAuth()` + redirect a `/tienda`
  - Errores de servidor mostrados bajo el campo correspondiente
  - Link a `/login`
- [ ] Crear `src/components/auth/RequireAuthModal.tsx`:
  - Dialog de Radix UI que aparece cuando anónimo intenta pagar
  - Botones: "Iniciar sesión" → `/login?redirect=/checkout`, "Registrarse" → `/registro`

**Archivos involucrados:**
- `src/pages/LoginPage.tsx`, `src/pages/RegisterPage.tsx`, `src/components/auth/RequireAuthModal.tsx`

**Criterio de completado:** Flujo completo: registrar → login automático → tienda; login con error 401 muestra mensaje claro.

---

### T9. Página Carrito "/carrito"
**Capa**: páginas
**Tamaño**: M
**Depende de**: T3, T8

**Qué hacer:**
- [ ] Crear `src/components/cart/CartItem.tsx`: imagen, nombre, precio unitario, controles +/- cantidad, botón eliminar (X)
- [ ] Crear `src/components/cart/CartSummary.tsx`: subtotal, total, botón "Proceder al pago"
- [ ] Crear `src/pages/CartPage.tsx`:
  - Si carrito vacío → mensaje con link a `/tienda`
  - Lista de `CartItem` con handlers de `cartStore`
  - `CartSummary` a la derecha (desktop) o abajo (mobile)
  - Al hacer click en "Proceder al pago":
    - Si no logueado → abrir `RequireAuthModal`
    - Si logueado → navegar a `/checkout`

**Archivos involucrados:**
- `src/components/cart/CartItem.tsx`, `src/components/cart/CartSummary.tsx`, `src/pages/CartPage.tsx`

**Criterio de completado:** Modificar cantidades actualiza total; eliminar item lo quita; botón pagar abre modal si no logueado.

---

### T10. Página Checkout "/checkout"
**Capa**: páginas
**Tamaño**: M
**Depende de**: T9, T3

**Qué hacer:**
- [ ] Crear `src/pages/CheckoutPage.tsx`:
  - Ruta protegida: si no token → redirect a `/login?redirect=/checkout`
  - Formulario: dirección de entrega (pre-rellena con la del usuario), método de pago (solo "Transferencia bancaria" por ahora)
  - Resumen del pedido: items + total
  - POST `/api/storefront/orders` con items del cartStore + address + payment_method
  - En éxito: `cartStore.clearCart()` + navegar a `/orden/confirmacion?code=<tracking_code>`
  - En error: mostrar mensaje de error

**Archivos involucrados:**
- `src/pages/CheckoutPage.tsx`

**Criterio de completado:** Orden creada en backend; carrito limpiado; redirige a confirmación con código.

---

### T11. Página Confirmación de Orden
**Capa**: páginas
**Tamaño**: S
**Depende de**: T10

**Qué hacer:**
- [ ] Crear `src/pages/OrderConfirmationPage.tsx`:
  - Leer `?code=` de los query params
  - Mostrar: ícono de check verde, "¡Tu pedido fue recibido!", código de tracking con botón copiar
  - Texto informativo: "Te enviamos el código a tu correo. Úsalo para rastrear tu pedido."
  - Link a `/pedido/<code>` y link a `/tienda`

**Archivos involucrados:**
- `src/pages/OrderConfirmationPage.tsx`

**Criterio de completado:** Página muestra el código correctamente; enlace a tracking funciona.

---

### T12. Página Tracking "/pedido/:code"
**Capa**: páginas
**Tamaño**: M
**Depende de**: T1

**Qué hacer:**
- [ ] Crear `src/components/order/OrderTimeline.tsx`:
  - 4 pasos fijos: `received`, `preparing`, `shipped`, `delivered`
  - Paso completado: ícono ✓ relleno, texto en `text-success`
  - Paso actual: ícono resaltado en `accent`, animación pulse suave
  - Paso pendiente: ícono vacío, texto en `text-secondary`
  - Línea conectora entre pasos (coloreada hasta el actual)
- [ ] Crear `src/pages/OrderTrackingPage.tsx`:
  - GET `/api/storefront/orders/:code` al montar
  - Muestra `OrderTimeline` con el `currentStatus`
  - Muestra fecha de creación y última actualización
  - Si 404 → mensaje "Código de pedido no encontrado"

**Archivos involucrados:**
- `src/components/order/OrderTimeline.tsx`, `src/pages/OrderTrackingPage.tsx`

**Criterio de completado:** Timeline refleja el estado correcto desde la API; 404 manejado visualmente.

---

### T13. Ensamblar App.tsx con rutas reales
**Capa**: routing
**Tamaño**: S
**Depende de**: T4, T7, T8, T9, T10, T11, T12

**Qué hacer:**
- [ ] Actualizar `src/App.tsx` reemplazando los `<div>TODO</div>` con los componentes reales
- [ ] Agregar ruta `/checkout` con guard de autenticación (redirect a login si no hay token)
- [ ] Agregar ruta `/orden/confirmacion`
- [ ] Agregar ruta `/mis-pedidos` (lista de órdenes del usuario, requiere auth)
- [ ] Verificar que `Navigate` funciona correctamente para rutas no encontradas

**Archivos involucrados:**
- `src/App.tsx`

**Criterio de completado:** Todas las rutas navegan correctamente sin errores en consola.

---

### T14. Ajustes visuales y responsive final
**Capa**: UI/QA
**Tamaño**: M
**Depende de**: T13

**Qué hacer:**
- [ ] Verificar que el tema cálido (crema/terracota) se aplica consistentemente en todas las páginas
- [ ] Revisar responsive en mobile (375px): sidebar colapsa, grid 1 columna, navbar compacto
- [ ] Verificar fuentes: headings en Lora, body en Inter
- [ ] Agregar `loading="lazy"` a todas las imágenes de producto
- [ ] Probar flujo completo de compra end-to-end (con ms_backend corriendo)
- [ ] Verificar que toast de "Agregado al carrito" aparece y desaparece correctamente

**Archivos involucrados:**
- Múltiples archivos CSS y componentes

**Criterio de completado:** Flujo completo funciona en desktop y mobile; no hay overflow horizontal ni texto cortado.

---

## Orden Sugerido de Implementación

1. **T1** — Base types + API client + shared components (sin dependencias)
2. **T3** — Stores Zustand (dependen de types)
3. **T2** — Layout/Navbar (depende de stores para el badge)
4. **T5** — Cards de producto (pueden desarrollarse con data mock)
5. **T6** — CategoryFilter + ProductGrid
6. **T4** — Página Historia (independiente del backend)
7. **T7** — Página Tienda (conecta todo el catálogo)
8. **T8** — Auth pages (login + registro)
9. **T9** — Página Carrito
10. **T10** — Checkout
11. **T11** — Confirmación de orden
12. **T12** — Tracking de pedido
13. **T13** — Ensamblar App.tsx final
14. **T14** — QA visual y responsive

## Notas

- Desarrollar T4 (página historia) con imágenes placeholder (`picsum.photos`) hasta tener assets reales.
- El checkout con "Transferencia bancaria" es suficiente para el MVP; la pasarela de pago real es una iteración posterior.
- `ms_backend` debe estar corriendo en `localhost:4000` para las páginas que hacen fetch; usar mocks en desarrollo cuando el backend no esté disponible.
