import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CategoryFilter } from '@/components/store/CategoryFilter'
import { ProductGrid } from '@/components/store/ProductGrid'
import { Button } from '@/components/shared/Button'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/components/shared/Toast'
import api from '@/lib/api'
import type { Product, Category, PaginationMeta } from '@/types'

export function StorePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [meta, setMeta] = useState<PaginationMeta>({ total: 0, page: 1, perPage: 12 })
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const addItem = useCartStore((s) => s.addItem)
  const toast = useToast((s) => s.add)

  // Fetch categorías una sola vez
  useEffect(() => {
    api.get('/storefront/categories')
      .then((r) => setCategories(r.data.data))
      .catch(() => {})
  }, [])

  // Fetch productos cuando cambia categoría o página
  const fetchProducts = useCallback((categoryId: string | null, page: number) => {
    setLoadingProducts(true)
    const params: Record<string, string | number> = { page, per_page: 12 }
    if (categoryId) params.category_id = categoryId

    api.get('/storefront/products', { params })
      .then((r) => {
        setProducts(r.data.data)
        setMeta({
          total: r.data.meta.total,
          page: r.data.meta.page,
          perPage: r.data.meta.per_page,
        })
      })
      .catch(() => {})
      .finally(() => setLoadingProducts(false))
  }, [])

  useEffect(() => {
    fetchProducts(selectedCategoryId, 1)
  }, [selectedCategoryId, fetchProducts])

  const handleCategorySelect = (id: string | null) => {
    setSelectedCategoryId(id)
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrls[0] ?? '',
    })
    toast(`"${product.name}" agregado al carrito`, 'success')
  }

  const totalPages = Math.ceil(meta.total / meta.perPage)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-sans text-3xl font-bold text-text-primary">Tienda</h1>
        <p className="mt-1 font-body text-text-secondary text-sm">
          {meta.total > 0 ? `${meta.total} productos disponibles` : ''}
        </p>
      </div>

      {/* Mobile: selector de categoría arriba */}
      <div className="mb-6 md:hidden">
        <CategoryFilter
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={handleCategorySelect}
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar desktop */}
        <CategoryFilter
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={handleCategorySelect}
        />

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <ProductGrid
            products={products}
            loading={loadingProducts}
            onAddToCart={handleAddToCart}
          />

          {/* Paginación */}
          {!loadingProducts && totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                disabled={meta.page <= 1}
                onClick={() => fetchProducts(selectedCategoryId, meta.page - 1)}
                aria-label="Página anterior"
              >
                <ChevronLeft size={16} />
                Anterior
              </Button>
              <span className="text-sm font-body text-text-secondary">
                Página {meta.page} de {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={meta.page >= totalPages}
                onClick={() => fetchProducts(selectedCategoryId, meta.page + 1)}
                aria-label="Página siguiente"
              >
                Siguiente
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
