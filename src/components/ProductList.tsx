import { ReactElement } from "react"
import useCartContext from "../hooks/useCartContext"
import useProductsContext from "../hooks/useProductsContext"
import Product from "./Product"

type Props = {}

const ProductList = (props: Props) => {
  const {dispatch, REDUCER_ACTIONS, cart} = useCartContext()
  const {products} = useProductsContext()

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  if (products?.length){
    pageContent = products.map(product => {
      const inCart: boolean = cart.some(item => item.sku === product.sku)
      return (
        <Product key={product.sku} product={product} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} inCart={inCart} />
      )
    })
  }

  const content = (
    <main>
      {pageContent}
    </main>
  )
  return content
}

export default ProductList