interface LoadingSkeletonProps {
  variant?: 'text' | 'card' | 'image' | 'gallery'
  count?: number
}

export default function LoadingSkeleton({ variant = 'text', count = 1 }: LoadingSkeletonProps) {
  const items = Array.from({ length: count })
  
  if (variant === 'text') {
    return (
      <div className="space-y-3">
        {items.map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }
  
  if (variant === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64"></div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  if (variant === 'image') {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg aspect-video"></div>
      </div>
    )
  }
  
  if (variant === 'gallery') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
          </div>
        ))}
      </div>
    )
  }
  
  return null
}