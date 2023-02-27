import { createContext, ReactElement, useMemo, useReducer } from "react"

// Create cart item type
export type CartItemType = {
  sku: string,
  name: string,
  price: number,
  qty: number,
}

// Create cart item state type and set equal to object of cart item type
type CartStateType = { cart: CartItemType[] }

// Create initial cart state and set equal to value of cart
const initCartState: CartStateType = { cart: [] }

// Create reducer for cart actions
const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT"
}

// Export for type of reducer action
export type ReducerActionType = typeof REDUCER_ACTION_TYPE
// Export for type of reducer specific action
export type ReducerAction = {
  type: string,
  payload?: CartItemType
}

// Create reducer function that returns CartStateType
const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action')
      }
      const { sku, name, price } = action.payload
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
      const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
      const qty: number = itemExists ? itemExists.qty + 1 : 1
      return {...state, cart: [...filteredCart, { sku, name, price, qty}]}
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error('action.payload missing in REMOVE action')
      }
      const { sku } = action.payload
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
      return {...state, cart: [...filteredCart]}
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error('action.payload missing in QUANTITY action')
      }
      const { sku, qty } = action.payload
      const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
      if (!itemExists) {
        throw new Error('Item was not previously in cart')
      }
      const updatedItem: CartItemType = {...itemExists, qty}
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
      return {...state, cart: [...filteredCart, updatedItem]}
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return {...state, cart: []}
    }
    default:
      throw new Error("Unidentified reducer action type")
  }
}

// Create useCartContext hook
const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState)
  // Define REDUCER_ACTIONS and useMemo to memoize to values of object
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE
  }, [])
  const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty
  }, 0)
  const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + (cartItem.qty * cartItem.price)
    }, 0)
  )
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4))
    const itemB = Number(b.sku.slice(-4))
    return itemA - itemB
  })

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

// Create use context type hook
export type UseCartContextType = ReturnType<typeof useCartContext>

// Create initial state that will be passed into context
const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: '',
  cart: []
}

// Create cart context
export const CartContext = createContext<UseCartContextType>(initCartContextState)

// Create children type for cart context
type ChildrenType = { children?: ReactElement | ReactElement[] }

// Create cart provider
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value = {useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  )
}

// Export cart context
export default CartContext