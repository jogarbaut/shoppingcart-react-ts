import { useContext } from "react";
import ProductsContext, { UseProductsContextType } from "../context/ProductsProvider";

// Define hook to simplify using context
const useProductsContext = (): UseProductsContextType => {
  return useContext(ProductsContext)
}

export default useProductsContext