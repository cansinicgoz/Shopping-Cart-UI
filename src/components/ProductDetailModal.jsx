import { useState } from "react"
import { 
  FaTimes, 
  FaHeart, 
  FaShoppingCart, 
  FaStar, 
  FaSearchPlus, 
  FaMinus, 
  FaPlus 
} from "react-icons/fa"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showZoom, setShowZoom] = useState(false)
  
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const isFavorite = isInWishlist(product.id)

  // Early return if modal is not open or product is not available
  if (!isOpen || !product) return null

  // Prepare images array
  const images = [product.image, ...(product.images || [])]
  const reviews = product.reviews || []

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    onClose()
  }

  // Handle wishlist toggle
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromWishlist(product)
    } else {
      addToWishlist(product)
    }
  }

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
          >
            <FaTimes className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg cursor-pointer"
                onClick={() => setShowZoom(true)}
              />
              <button
                onClick={() => setShowZoom(true)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all duration-300"
              >
                <FaSearchPlus className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={toggleFavorite}
                className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600'
                }`}
              >
                <FaHeart className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Price and Rating */}
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-green-600">${product.price}</span>
                {product.rating && (
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                    <span className="text-gray-600 ml-2">({product.rating}/5)</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600">{product.brand} • {product.category}</p>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || "Detailed information about this product is not available."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-all duration-300"
                >
                  <FaMinus className="w-4 h-4" />
                </button>
                <span className="text-xl font-bold min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-all duration-300"
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Add to Cart (${(product.price * quantity).toFixed(2)})</span>
            </button>

            {/* Reviews Section */}
            {reviews.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Reviews ({reviews.length})</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">{review.name}</span>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-60">
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailModal