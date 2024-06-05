import { useEffect, useState } from "react"
import { getAllCart, getCustomerById } from "../managers/productmanager.jsx"
import { deleteCart } from "../managers/productmanager.jsx"
import { removeProductFromOrder } from "../managers/productmanager.jsx"
import "./cart.css"

export const MyCart = ({ currentUser }) => {
  const [cart, setCart] = useState([])
  const [cartUser, setCartUser] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    getAllCart().then((cartData) => {
      if (cartData.order_products) {
        setCart(cartData.order_products)
        setTotalPrice(cartData.total_price)
      } else {
        setCart([])
        setTotalPrice(0)
      }
    })
  }, [])

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
    removeProductFromOrder(id)
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
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
              <div>Total Price: ${totalPrice}</div>
              <button className="delete-btn" onClick={handleCartDelete}>
                Clear Cart
              </button>
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
        )}
      </section>
    </>
  )
}
