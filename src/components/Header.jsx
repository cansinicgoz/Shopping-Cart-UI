import { useState, useEffect, useRef } from "react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { FaShoppingCart, FaTrash, FaUser, FaSignInAlt, FaUserPlus, FaCog, FaSignOutAlt, FaSearch, FaHeart, FaTimes, FaMinus, FaPlus } from "react-icons/fa"

const Header = ({ onSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [headerVisible, setHeaderVisible] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  const cartContext = useCart()
  const wishlistContext = useWishlist()

  const cartRef = useRef(null)
  const userRef = useRef(null)
  const wishlistRef = useRef(null)

  const { cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = cartContext
  const { wishlist, removeFromWishlist, clearWishlist } = wishlistContext

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowUserDropdown(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowUserDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setShowWishlistDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > scrollY && currentScrollY > 100) {
        setHeaderVisible(false)
      } else {
        setHeaderVisible(true)
      }
      
      setScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollY])

  return (
    <header className={`bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-6 sticky top-0 z-[100] transition-transform duration-300 ${
      headerVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex items-center">
        {/* Logo */}
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent ml-8">
          SHOPZY
        </h1>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full transition-all duration-300 hover:scale-105"
            >
              Search
            </button>
          </form>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          {/* Wishlist Menu */}
          <div className="relative" ref={wishlistRef}>
            <button
              className="cursor-pointer p-3 rounded-full hover:bg-gray-100 transition-all duration-300 group"
              onClick={() => setShowWishlistDropdown(!showWishlistDropdown)}
            >
              <FaHeart className="text-3xl text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {showWishlistDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-4 z-[110]">
                <div className="px-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Wishlist</h3>
                    <button
                      onClick={() => setShowWishlistDropdown(false)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-all duration-300"
                    >
                      <FaTimes className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                {wishlist.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <FaHeart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Your wishlist is empty</p>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto">
                    {wishlist.map((item) => (
                      <div key={item.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-600">${item.price}</p>
                          </div>
                          <button
                            onClick={() => removeFromWishlist(item)}
                            className="p-1 hover:bg-red-100 text-red-500 rounded-full transition-all duration-300"
                          >
                            <FaTimes className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {wishlist.length > 0 && (
                  <div className="px-4 pt-3 border-t border-gray-200">
                    <button
                      onClick={clearWishlist}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
                    >
                      Clear Wishlist
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Menu */}
          <div className="relative" ref={cartRef}>
            <button
              className="cursor-pointer p-3 rounded-full hover:bg-gray-100 transition-all duration-300 group"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaShoppingCart className="text-3xl text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-4 z-[110]">
                <div className="px-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Shopping Cart</h3>
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-all duration-300"
                    >
                      <FaTimes className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                {cart.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <FaShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-80 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                              <p className="text-sm text-gray-600">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => decreaseQuantity(item.id)}
                                className="p-1 hover:bg-gray-200 rounded-full transition-all duration-300"
                              >
                                <FaMinus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                              <button
                                onClick={() => increaseQuantity(item.id)}
                                className="p-1 hover:bg-gray-200 rounded-full transition-all duration-300"
                              >
                                <FaPlus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 hover:bg-red-100 text-red-500 rounded-full transition-all duration-300 ml-2"
                              >
                                <FaTrash className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="px-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-800">Total: ${totalPrice}</span>
                        <button
                          onClick={clearCart}
                          className="text-sm text-red-500 hover:text-red-600 transition-colors duration-300"
                        >
                          Clear Cart
                        </button>
                      </div>
                      <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userRef}>
            <button
              className="cursor-pointer p-3 rounded-full hover:bg-gray-100 transition-all duration-300 group"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <FaUser className="text-3xl text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-[110]">
                {isLoggedIn ? (
                  <>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2">
                      <FaUser className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2">
                      <FaCog className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 text-red-500"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogin}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
                    >
                      <FaSignInAlt className="w-4 h-4" />
                      <span>Login</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2">
                      <FaUserPlus className="w-4 h-4" />
                      <span>Register</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header