const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-300 rounded-lg h-48 mb-4"></div>
      
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-300 rounded mb-3"></div>
      
      {/* Rating Skeleton */}
      <div className="flex items-center mb-2">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
          ))}
        </div>
        <div className="ml-2 h-4 w-16 bg-gray-300 rounded"></div>
      </div>
      
      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
      
      {/* Price and Button Skeleton */}
      <div className="flex items-center justify-between mt-auto">
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
        <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton