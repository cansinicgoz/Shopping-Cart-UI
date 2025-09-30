import { createContext, useState, useEffect, useContext } from "react"
import productsData from "../data/db.json"

export const ProductContext = createContext()
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // Simulate loading delay
      setTimeout(() => {
        setProducts(productsData.products)
        setLoading(false)
      }, 1000)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }, [])
  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  return useContext(ProductContext)
}
