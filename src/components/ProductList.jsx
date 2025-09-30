import { useState, useMemo } from "react"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from "./ProductCardSkeleton"
import { useProduct } from "../context/ProductContext"
import { FaFilter, FaTimes, FaSort } from "react-icons/fa"

const ProductList = ({ searchTerm, showFilters, sortBy, onShowFilters, onSortChange }) => {
  const { products, loading, error } = useProduct()
  
  // Filter state
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    brand: ""
  })

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseFloat(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseFloat(filters.maxPrice))
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand)
    }

    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case "price-low":
          filtered = filtered.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filtered = filtered.sort((a, b) => b.price - a.price)
          break
        case "name":
          filtered = filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case "rating":
          filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        default:
          break
      }
    }

    return filtered
  }, [products, searchTerm, filters, sortBy])

  // Get unique categories and brands
  const categories = [...new Set(products.map(product => product.category))]
  const brands = [...new Set(products.map(product => product.brand))]

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      brand: ""
    })
  }

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl font-semibold mb-4">Error loading products</div>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          {searchTerm && (
            <p className="text-gray-600 mt-1">
              Search results for: <span className="font-semibold">"{searchTerm}"</span>
            </p>
          )}
        </div>
        
        {/* Filter Toggle Button */}
        <button
          onClick={onShowFilters}
          className="lg:hidden flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-red-700"
        >
          <FaFilter />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:w-64 bg-white rounded-xl shadow-lg p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Filters</h3>
              <button
                onClick={onShowFilters}
                className="lg:hidden p-1 hover:bg-gray-100 rounded-full transition-all duration-300"
              >
                <FaTimes className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-xl font-semibold mb-4">No products found</div>
              <p className="text-gray-600">
                {searchTerm 
                  ? `No products match your search for "${searchTerm}"`
                  : "Try adjusting your filters to see more products"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList