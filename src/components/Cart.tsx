import { useState } from "react"
import useCartContext from "../hooks/useCartContext"
import CartLineItem from "./CartLineItem"

type Props = {}

const Cart = (props: Props) => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } =
    useCartContext()

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT })
    setConfirm(true)
  }

  const pageContent = confirm ? (
    <h2>Thank you for your order!</h2>
  ) : (
    <>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          )
        })}
      </ul>
      <div>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button disabled={!totalItems} onClick={onSubmitOrder}>
          Place Order
        </button>
      </div>
    </>
  )

  const content = <main>{pageContent}</main>

  return content
}

export default Cart
