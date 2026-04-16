# Especificacion Funcional: Storefront — Tienda para Compradores

**Fecha**: 2026-04-15
**Estado**: Aprobada

## Problema

Los Libros de Ivonnet necesita una tienda virtual propia que transmita la identidad de la marca y permita a los clientes descubrir, explorar y comprar kits de libros, libretas y productos personalizados sin depender de plataformas de terceros.

## Objetivo

Crear una experiencia de compra completa, cálida y literaria: desde la primera visita a la historia de la marca, pasando por el catálogo, el carrito y el pago, hasta el seguimiento del pedido. El comprador debe poder completar todo el flujo desde su dispositivo sin fricción.

## Usuarios

- **Visitante anónimo**: navega la historia, explora el catálogo, agrega al carrito, pero debe registrarse para pagar.
- **Comprador registrado**: puede pagar, ver su historial de pedidos y hacer seguimiento de órdenes activas.

---

## Historias de Usuario

### HU-1: Conocer la marca antes de comprar
**Como** visitante, **quiero** ver una página visualmente atractiva que cuente la historia de Los Libros de Ivonnet, **para** entender qué es la tienda y sentirme motivado a comprar.

**Criterios de aceptación:**
- [ ] La página tiene máximo 5 secciones/scrolls
- [ ] Cada sección muestra un CTA o flecha visible que lleva a `/tienda`
- [ ] Desde la primera vista (sin scroll) hay un acceso directo a la tienda
- [ ] Las animaciones son suaves (fade-in, slide-up) y no bloquean la lectura
- [ ] El diseño transmite calidez literaria acorde al tema cálido (terracota/crema)

### HU-2: Explorar el catálogo de productos
**Como** visitante, **quiero** ver todos los productos disponibles y filtrarlos por categoría, **para** encontrar rápidamente lo que me interesa.

**Criterios de aceptación:**
- [ ] Panel lateral izquierdo con filtro por categoría
- [ ] Grid de tarjetas: una imagen, descripción del contenido, precio
- [ ] Los productos patrocinados tienen un indicador visual diferenciado con info del patrocinador
- [ ] Los productos sin patrocinio no muestran esa sección
- [ ] Hay estados de carga (skeleton) y estado vacío
- [ ] Se puede agregar un producto al carrito directamente desde la card

### HU-3: Gestionar el carrito de compras
**Como** visitante o comprador, **quiero** agregar productos, modificar cantidades y ver el total antes de pagar, **para** controlar mi compra antes de comprometerse.

**Criterios de aceptación:**
- [ ] Puedo aumentar o disminuir la cantidad de cada item
- [ ] Puedo eliminar un item del carrito
- [ ] El total se recalcula automáticamente
- [ ] Si intento pagar sin estar logueado, se me redirige a login/registro
- [ ] El carrito persiste durante la sesión (en memoria via Zustand)

### HU-4: Registrarme o iniciar sesión
**Como** visitante que quiere comprar, **quiero** crear una cuenta o iniciar sesión, **para** poder completar mi compra y dar seguimiento a mis pedidos.

**Criterios de aceptación:**
- [ ] Registro requiere: nombre, email, contraseña, dirección de entrega
- [ ] Login requiere: email, contraseña
- [ ] Validaciones de formulario en tiempo real (email válido, contraseña mínimo 8 chars)
- [ ] Tras autenticación exitosa, regresa al carrito o a la tienda según de dónde vino
- [ ] Los errores del servidor se muestran de forma legible

### HU-5: Realizar una compra
**Como** comprador registrado, **quiero** completar el pago de mi carrito, **para** hacer efectiva mi orden.

**Criterios de aceptación:**
- [ ] Confirmar dirección de entrega
- [ ] Resumen del pedido con subtotal, total
- [ ] Método de pago básico (por ahora manual/transferencia o integración básica)
- [ ] Tras pago exitoso: pantalla de confirmación con código de tracking
- [ ] El código también se envía al correo registrado

### HU-6: Hacer seguimiento a un pedido
**Como** comprador, **quiero** ver el estado de mi pedido usando un código de tracking, **para** saber en qué etapa está mi compra.

**Criterios de aceptación:**
- [ ] Accesible via `/pedido/:code` sin necesidad de login
- [ ] Si está logueado, también accesible desde "Mis pedidos"
- [ ] Timeline visual con 4 estados:
  1. Pedido recibido ✓ (automático)
  2. Estamos preparando tu pedido (admin actualiza)
  3. En camino a tu dirección (admin actualiza)
  4. Entregado (admin actualiza)
- [ ] El estado actual está resaltado; los completados también visualmente diferenciados

---

## Alcance

### Incluido
- Página historia/landing con CTAs a tienda
- Catálogo con filtro por categoría
- Dos tipos de product cards (estándar y patrocinada)
- Carrito de compras con gestión de items
- Registro y login de compradores
- Checkout con confirmación de dirección
- Pantalla de confirmación de orden con código
- Tracking de pedido por código
- Sección "Mis pedidos" para usuarios logueados

### Excluido
- Panel de administración (es ms_admin)
- Pasarela de pago real (se define en iteración posterior)
- Reseñas o valoraciones de productos
- Wishlist / lista de deseos
- Chat de soporte
- Múltiples idiomas

## Reglas de Negocio

1. Un usuario puede agregar al carrito sin login, pero **no puede pagar sin estar autenticado**.
2. Los productos tienen dos tipos: `standard` y `sponsored`. Los `sponsored` llevan `sponsor_info` (nombre, logo_url, tagline).
3. El código de tracking es generado por el backend al confirmar el pedido (UUID corto o alfanumérico único).
4. El estado del pedido avanza de forma lineal: `received → preparing → shipped → delivered`. No puede retroceder.
5. Un producto eliminado (soft delete) en el admin **no aparece en el catálogo**, pero puede quedar referenciado en órdenes históricas.

## Dependencias

- **ms_backend** (Elixir/Phoenix en `http://localhost:4000/api`): productos, categorías, auth, órdenes
- **Resend** (via backend): envío de email con código de tracking tras compra exitosa
- **Google Fonts**: Lora + Inter (cargadas en `index.html`)
