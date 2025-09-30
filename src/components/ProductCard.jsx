import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import ProductDetailModal from "./ProductDetailModal"
import { FaCartPlus, FaStar, FaHeart } from "react-icons/fa"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [showModal, setShowModal] = useState(false)
  
  const isInWishlist = wishlist.some(item => item.id === product.id)

  const handleCardClick = () => {
    setShowModal(true)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    if (isInWishlist) {
      removeFromWishlist(product)
    } else {
      addToWishlist(product)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < (rating || 4) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer flex flex-col h-full"
      >
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg mb-4 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain rounded-lg"
          />
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </div>
          )}
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isInWishlist 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white shadow-md'
            }`}
          >
            <FaHeart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-2 flex flex-col flex-grow">
          {/* Product Name */}
          <h3 className="text-2xl font-bold mb-3 text-gray-800">{product.name}</h3>
          
          {/* Star Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviews || Math.floor(Math.random() * 100) + 10})
            </span>
          </div>

          {/* Description Tooltip */}
          <div className="relative group mb-4 flex-grow">
            <div className="absolute bottom-full left-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              {product.discount ? (
                <>
                  <p className="text-lg text-black line-through font-medium">
                    ${(product.price * 1.5).toFixed(2)}
                  </p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-1 w-12 h-12 flex items-center justify-center"
            >
              🛒
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={product}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}

export default ProductCard