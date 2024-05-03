import { useEffect, useState } from "react"
import { getAllCart } from "../managers/productmanager.jsx"
import { deleteCart } from "../managers/productmanager.jsx"
import { removeProductFromOrder } from "../managers/productmanager.jsx"

export const MyCart = () => {
  const [cart, setCart] = useState([])
  //   const [payments, setPayments] = useState([])
  //   const [showCompleteForm, setShowCompleteForm] = useState(false)

  useEffect(() => {
    getAllCart().then((cartData) => {
      if (cartData) {
        setCart(cartData.order_products)
      } else {
        setCart({})
      }
    })
  }, [])

  const calculateTotalPrice = () => {
    let totalPrice = 0
    cart.forEach((item) => {
      if (item.rtsproduct_id) {
        totalPrice += item.rtsproduct.price
      } else {
        totalPrice += item.cusrequest.cus_product.price
      }
    })
    return totalPrice
  }

  const handleCartDelete = () => {
    deleteCart().then(() => {
      setCart([])
    })
  }

  const removeProduct = (id) => {
    removeProductFromOrder(id)
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  return (
    <>
      <h2>Your Cart</h2>
      <div>
        {cart.map((item) => (
          <div key={item.id}>
            <span>Item {item.id}. </span>
            {item.rtsproduct_id ? (
              <span>
                RTS Product ID: {item.rtsproduct_id}
                <div>
                  {item.rtsproduct.name}, $ {item.rtsproduct.price}
                </div>
              </span>
            ) : (
              <span>
                Custom Request ID: {item.cusrequest_id}
                <div>
                  {item.cusrequest.cus_product.name} ${" "}
                  {item.cusrequest.cus_product.price}
                </div>
                {item.cusrequest.eyes && (
                  <div>Eyes: {item.cusrequest.eyes.name}</div>
                )}
                <div>Color: {item.cusrequest.color1.name}</div>
                {item.cusrequest.color2 && (
                  <div>Second Color: {item.cusrequest.color2.name}</div>
                )}
              </span>
            )}
            <div>
              <button onClick={() => removeProduct(item.id)}>Remove</button>
            </div>
          </div>
        ))}
        <div>Total Price: ${calculateTotalPrice()}</div>
      </div>
      <div>
        <button onClick={handleCartDelete}>Clear Cart</button>
        <button>Checkout</button>
      </div>
    </>
  )
}
