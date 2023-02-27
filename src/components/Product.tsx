import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement } from "react"

type Props = {
  product: ProductType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: Props): ReactElement => {

  // Dynamically render images using Vite
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href

  const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: {...product, qty: 1}})

  const itemInCart = inCart ? 'Item is in Cart!' : null

  const content = (
    <article>
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} />
      <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(product.price)}</p>
      <p>{itemInCart}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  )

  return content
}

export default Product