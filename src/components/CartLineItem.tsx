import { ChangeEvent, ReactElement } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"

type Props = {
  item: CartItemType
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: Props) => {
  // Dynamically render images using Vite
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

  const lineTotal: number = item.qty * item.price

  const highestQty: number = 10 > item.qty ? 10 : item.qty

  const optionVals: number[] = [...Array(highestQty).keys()].map((i) => i + 1)

  const options: ReactElement[] = optionVals.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    )
  })

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    })
  }

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    })

  const content = (
    <li>
      <img src={img} alt={item.name} />
      <div>{item.name}</div>
      <div>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>
      <select
        name="itemQty"
        id="itemQty"
        onChange={onChangeQty}
        value={item.qty}
      >
        {options}
      </select>
      <div>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>
      <button onClick={onRemoveFromCart} title="Remove Item">
        Remove
      </button>
    </li>
  )

  return content
}

export default CartLineItem
