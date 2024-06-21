import { useEffect, useState } from "react"
import {
  completeOrder,
  getAllCart,
  getCustomerById,
} from "../managers/productmanager.jsx"
import { deleteCart } from "../managers/productmanager.jsx"
import { removeProductFromOrder } from "../managers/productmanager.jsx"
import "./cart.css"

export const MyCart = ({ currentUser }) => {
  const [cart, setCart] = useState([])
  const [cartUser, setCartUser] = useState({})
  const [subtotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState(10)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    getAllCart().then((cartData) => {
      if (cartData.order_products) {
        setCart(cartData.order_products)
        setSubtotal(cartData.subtotal || 0)
        setShippingCost(cartData.shippingCost || 10)
        setTotalPrice(cartData.subtotal + cartData.shippingCost || 0)
      } else {
        setCart([])
        setSubtotal(0)
        setTotalPrice(0)
      }
    })
  }, [])

  const handleCheckout = () => {
    completeOrder()
      .then(() => {
        console.log("Order completed, fetching updated cart")
        return getAllCart() // Refetch cart data after completing order
      })
      .then((cartData) => {
        console.log("Received cart data:", cartData)
        if (cartData.order_products && cartData.order_products.length > 0) {
          console.warn("Cart still contains items after checkout")
          setCart(cartData.order_products)
          setSubtotal(cartData.subtotal || 0)
          setShippingCost(cartData.shippingCost || 10)
          setTotalPrice(cartData.total_price || 0)
        } else {
          console.log("Cart cleared successfully")
          setCart([])
          setSubtotal(0)
          setTotalPrice(0)
        }
        alert("Order placed successfully!")
      })
      .catch((error) => {
        console.error("Error during checkout:", error)
        alert("An error occurred while placing the order. Please try again")
      })
  }

  useEffect(() => {
    getCustomerById(currentUser).then((data) => {
      setCartUser(data)
    })
  }, [currentUser])

  const handleCartDelete = () => {
    deleteCart().then(() => {
      setCart([])
    })
  }

  const removeProduct = (id) => {
    removeProductFromOrder(id).then(() => {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item.id !== id)
        const updatedSubtotal = updatedCart.reduceRight((total, item) => {
          if (item.rtsproduct_id) {
            return (total = item.rtsproduct.price)
          } else {
            return (total = item.cusrequest.cusproduct.price)
          }
        }, 0)
        setSubtotal(updatedSubtotal)
        setTotalPrice(updatedSubtotal + shippingCost)
        return updatedCart
      })
    })
  }

  return (
    <>
      <section>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <>
            <div>There are no items in the cart</div>
            <img
              src="https://res.cloudinary.com/yarn-stash/image/upload/v1715100135/IMG_1576_y8ddxd.png"
              alt="sadface"
            />
          </>
        ) : (
          <>
            <div className="mycart">
              <div className="cartitems-container">
                {cart.map((item) => (
                  <div className="cartitems" key={item.id}>
                    {item.rtsproduct_id ? (
                      <>
                        <div className="picture">
                          <img
                            className="thumbnail"
                            src={item.rtsproduct.image}
                            alt={item.rtsproduct.name}
                          />
                        </div>

                        <div>
                          <p>
                            <b>Ready to Ship Item</b>
                          </p>
                          {item.rtsproduct.name}, $ {item.rtsproduct.price}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="picture">
                          <img
                            className="thumbnail"
                            src={item.cusrequest.cus_product.image}
                            alt={item.cusrequest.cus_product.name}
                          />
                        </div>
                        <span>
                          <p>
                            <b>Customized Item</b>
                          </p>
                          <div>
                            {item.cusrequest.cus_product.name} ${" "}
                            {item.cusrequest.cus_product.price}
                          </div>
                          {item.cusrequest.eyes && (
                            <div>Eyes: {item.cusrequest.eyes.name}</div>
                          )}
                          <div>Color: {item.cusrequest.color1.name}</div>
                          {item.cusrequest.color2 && (
                            <div>
                              Second Color: {item.cusrequest.color2.name}
                            </div>
                          )}
                        </span>
                      </>
                    )}
                    <div>
                      <button
                        className="delete-btn"
                        onClick={() => removeProduct(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="user-info">
                <div>
                  <b>User Info: </b>
                </div>
                <div>
                  {cartUser.user.first_name} {cartUser.user.last_name}
                  <div>{cartUser.address}</div>
                </div>
              </div>
            </div>
            <div className="checkout">
              <div>Subtotal: ${subtotal.toFixed(2)}</div>
              <div>Shipping: ${shippingCost.toFixed(2)}</div>
              <div>Total Price: ${(subtotal + shippingCost).toFixed(2)}</div>
              <button className="delete-btn" onClick={handleCartDelete}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </>
  )
}
