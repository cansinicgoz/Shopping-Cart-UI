import { useState, useEffect } from "react"
import { FaChevronDown, FaFilter, FaSort } from "react-icons/fa"

const CategoryMenu = ({ onShowFilters, showFilters, sortBy, onSortChange }) => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [visible, setVisible] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      subcategories: ['Laptops', 'Desktops', 'Tablets', 'Accessories']
    },
    {
      id: 'audio',
      name: 'Audio',
      subcategories: ['Headphones', 'Speakers', 'Earbuds', 'Microphones']
    },
    {
      id: 'mobile',
      name: 'Mobile',
      subcategories: ['Smartphones', 'Cases', 'Chargers', 'Screen Protectors']
    },
    {
      id: 'gaming',
      name: 'Gaming',
      subcategories: ['Consoles', 'Controllers', 'Games', 'Gaming Chairs']
    },
    {
      id: 'tv',
      name: 'TV & Home',
      subcategories: ['Smart TVs', 'Soundbars', 'Streaming Devices', 'Home Theater']
    },
    {
      id: 'camera',
      name: 'Cameras',
      subcategories: ['DSLR', 'Mirrorless', 'Action Cameras', 'Lenses']
    },
    {
      id: 'jewelry',
      name: 'Jewelry',
      subcategories: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 'Bags', 'Sunglasses']
    },
    {
      id: 'furniture',
      name: 'Furniture',
      subcategories: ['Sofas', 'Tables', 'Chairs', 'Beds', 'Wardrobes', 'Shelves', 'Decor']
    },
    {
      id: 'fitness',
      name: 'Fitness',
      subcategories: ['Fitness Equipment', 'Sportswear', 'Athletic Shoes', 'Yoga', 'Running', 'Cycling', 'Swimming']
    }
  ]

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId)
  }

  const handleCategoryLeave = () => {
    setActiveCategory(null)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > scrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      
      setScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollY])

  return (
    <div 
      className={`bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{overflow: 'visible'}}
    >
      <div className="w-full px-6" style={{overflow: 'visible'}}>
        <div className="flex items-center justify-between py-4" style={{overflow: 'visible'}}>
          {/* Categories - Centered */}
          <div className="flex items-center space-x-4 flex-1 justify-center">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="relative"
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={handleCategoryLeave}
              >
                <button className="flex items-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-base text-gray-800 hover:text-red-600 shadow-sm hover:shadow-md whitespace-nowrap">
                  <span>{category.name}</span>
                  <FaChevronDown className="w-3 h-3 transition-transform duration-300" />
                </button>

                {/* Dropdown Menu */}
                {activeCategory === category.id && (
                  <div 
                    className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-6 z-[9999] mt-2"
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    {/* Invisible area for mouse transition */}
                    <div className="absolute -top-2 left-0 w-full h-2"></div>
                    <div className="px-4">
                      <h3 className="font-bold text-gray-800 mb-3 text-lg">{category.name}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {category.subcategories.map((subcategory, index) => (
                          <a
                            key={index}
                            href="#"
                            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 rounded-lg transition-all duration-300 hover:shadow-lg"
                          >
                            {subcategory}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Filters and Sort By - Right side */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onShowFilters}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl w-[120px]"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
            
            <select 
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl w-[120px] border-none outline-none"
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryMenu