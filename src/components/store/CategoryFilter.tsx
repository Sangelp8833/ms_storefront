import { cn } from '@/lib/utils'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export function CategoryFilter({ categories, selectedId, onSelect }: CategoryFilterProps) {
  const all = [{ id: null, name: 'Todas', slug: 'todas' }] as const
  const items = [...all, ...categories]

  return (
    <>
      {/* Desktop: lista vertical */}
      <aside className="hidden md:flex flex-col gap-1 w-56 shrink-0">
        <h2 className="mb-2 text-xs font-body font-semibold uppercase tracking-widest text-text-muted px-3">
          Categorías
        </h2>
        {items.map((cat) => (
          <button
            key={cat.id ?? 'todas'}
            onClick={() => onSelect(cat.id)}
            className={cn(
              'w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors',
              selectedId === cat.id
                ? 'bg-accent text-white font-medium'
                : 'text-text-secondary hover:bg-hover-row hover:text-text-primary',
            )}
          >
            {cat.name}
          </button>
        ))}
      </aside>

      {/* Mobile: select */}
      <div className="md:hidden w-full">
        <label htmlFor="category-select" className="sr-only">Categoría</label>
        <select
          id="category-select"
          value={selectedId ?? ''}
          onChange={(e) => onSelect(e.target.value || null)}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
    </>
  )
}
