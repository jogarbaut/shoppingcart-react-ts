import useCartContext from "../hooks/useCartContext"
import Nav from "./Nav"

Nav
type Props = {
  viewCart: boolean
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ viewCart, setViewCart }: Props) => {
  const { totalItems, totalPrice } = useCartContext()

  const content = (
    <header>
      <div>
        <h1>Company Name</h1>
        <div>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  )

  return content
}

export default Header
