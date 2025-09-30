import { useState } from "react"
import ProductList from "./components/ProductList"
import Header from "./components/Header"
import CategoryMenu from "./components/CategoryMenu"
import HeroSlider from "./components/HeroSlider"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { ProductProvider } from "./context/ProductContext"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("")

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <Header onSearch={handleSearch} />
          <CategoryMenu 
            onShowFilters={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <HeroSlider />
              <ProductList 
                searchTerm={searchTerm}
                showFilters={showFilters}
                sortBy={sortBy}
                onShowFilters={() => setShowFilters(!showFilters)}
                onSortChange={setSortBy}
              />
            </div>
          </div>
          <Footer />
          <ScrollToTop />
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  )
}

export default App
