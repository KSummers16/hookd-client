import { useEffect, useState, useCallback } from "react"
import {
  completeOrder,
  getAllCart,
  getCustomerById,
} from "../managers/productmanager.jsx"
import { deleteCart } from "../managers/productmanager.jsx"
import { removeProductFromOrder } from "../managers/productmanager.jsx"
import "./cart.css"
import { useAuth } from "../components/AuthContext.jsx"

export const MyCart = () => {
  const { currentUser } = useAuth()
  const [cart, setCart] = useState([])
  const [cartUser, setCartUser] = useState({})
  const [subtotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState(10)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCartData = useCallback(() => {
    setIsLoading(true)
    getAllCart().then((cartData) => {
      if (cartData.order_products) {
        setCart(cartData.order_products)
        const newSubtotal = cartData.subtotal || 0
        const newShippingCost = cartData.shippingCost || 10
        setSubtotal(newSubtotal)
        setShippingCost(newShippingCost)
        setTotalPrice(newSubtotal + newShippingCost)
      } else {
        setCart([])
        setSubtotal(0)
        setTotalPrice(0)
      }
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    fetchCartData()
  }, [fetchCartData])

  useEffect(() => {
    if (currentUser && currentUser.user_id) {
      getCustomerById(currentUser.user_id).then((data) => {
        setCartUser(data)
      })
    }
  }, [currentUser])

  const handleCheckout = () => {
    completeOrder()
      .then(() => {
        console.log("Order completed, fetching updated cart")
        window.dispatchEvent(new Event("orderCompleted"))
        return fetchCartData() // Use fetchCartData instead of getAllCart
      })
      .then(() => {
        alert("Order placed successfully!")
        // The cart state should already be updated by fetchCartData
      })
  }

  const handleCartDelete = () => {
    deleteCart().then(() => {
      fetchCartData()
    })
  }

  const removeProduct = (id) => {
    removeProductFromOrder(id).then(() => {
      fetchCartData() // Use the fetchCartData function
    })
  }
  return (
    <>
      <section>
        <h2>Your Cart</h2>
        {isLoading ? (
          <div>Loading your cart...</div>
        ) : cart.length === 0 ? (
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
                  {cartUser.user?.first_name} {cartUser.user?.last_name}
                  <div>{cartUser?.address}</div>
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
              <div className="checkoutNote">
                <em>
                  <b>*SPECIAL NOTE:*</b>
                </em>{" "}
                This website is still in progress. When you click checkout, it
                will send an email to myself and you with your order. Once I get
                that email, I will send an invoice to you via paypal. When the
                invoice is paid I will ship (or start working on) your order
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}
