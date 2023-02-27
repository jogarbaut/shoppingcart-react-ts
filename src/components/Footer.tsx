import useCartContext from "../hooks/useCartContext"

type Props = {
  viewCart: boolean
}

const Footer = ({ viewCart }: Props) => {
  const { totalItems, totalPrice } = useCartContext()
  const year: number = new Date().getFullYear()

  const pageContent = viewCart ? (
    <p>Shopping Cart &copy; {year}</p>
  ) : (
    <>
      <p>Total Items: {totalItems}</p>
      <p>Total price: {totalPrice}</p>
      <p>Shopping Cart &copy; {year}</p>
    </>
  )

  const content = <footer>{pageContent}</footer>
  return content
}

export default Footer
