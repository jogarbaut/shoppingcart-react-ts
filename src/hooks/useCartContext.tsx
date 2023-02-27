import { useContext } from "react";
import CartContext, { UseCartContextType } from "../context/CartProvider";

// Define hook to simplify using context
const useCartContext = (): UseCartContextType => {
  return useContext(CartContext)
}

export default useCartContext