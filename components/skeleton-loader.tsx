export function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-12 bg-secondary rounded" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3 p-4 bg-secondary rounded">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded" />
            <div className="h-2 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
