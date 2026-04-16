export function ProductSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-hover-row" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-3/4 rounded bg-hover-row" />
        <div className="h-3 w-full rounded bg-hover-row" />
        <div className="h-3 w-2/3 rounded bg-hover-row" />
        <div className="flex items-center justify-between mt-1">
          <div className="h-5 w-24 rounded bg-hover-row" />
          <div className="h-8 w-24 rounded-lg bg-hover-row" />
        </div>
      </div>
    </div>
  )
}
