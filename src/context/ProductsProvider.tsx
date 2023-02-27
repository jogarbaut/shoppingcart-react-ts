import { createContext, ReactElement, useState } from "react"

// Create and export product type
export type ProductType = {
  sku: string
  name: string
  price: number
}

// Create initial state
const initState: ProductType[] = [
  {
    sku: "item0001",
    name: "Widget",
    price: 9.99,
  },
  {
    sku: "item0002",
    name: "Premium Widget",
    price: 19.99,
  },
  {
    sku: "item0003",
    name: "Deluxe Widget",
    price: 29.99,
  },
]

// Create product context type
export type UseProductsContextType = { products: ProductType[] }

// Define initial context state
const initContextState: UseProductsContextType = { products: [] }

// Create Products Context
const ProductsContext = createContext<UseProductsContextType>(initContextState)

// Create children type
type ChildrenType = { children?: ReactElement | ReactElement[] }

// Create Provider
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState)
  return (
    <ProductsContext.Provider value={{products}}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext