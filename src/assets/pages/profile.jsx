import { useEffect, useState } from "react"
import {
  getAllCart,
  getAllOrders,
  getCustomerById,
  updateUser,
} from "../managers/productmanager.jsx"
import "./profile.css"

export const UserProfile = ({ currentUser }) => {
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [userProfile, setUserProfile] = useState({
    user: { first_name: "", last_name: "", email: "" },
    address: "",
  })

  useEffect(() => {
    getCustomerById(currentUser).then((data) => {
      setUserProfile(data)
    })
  }, [currentUser])

  const handleSave = (event) => {
    event.preventDefault()
    updateUser(userProfile.id, userProfile.address).then(() => {
      // Refetch the user data after the update is successful
      getCustomerById(currentUser).then((data) => {
        setUserProfile(data)
      })
      console.log(showForm)
      setShowForm(false)
    })
  }

  useEffect(() => {
    getAllCart().then((cartData) => {
      if (cartData.order_products) {
        setCart(cartData.order_products)
      } else {
        setCart([])
      }
    })
  }, [])

  useEffect(() => {
    getAllOrders().then((orders) => {
      const paidOrders = orders.filter((order) => order.payment ?? null)
      setOrders(paidOrders)
    })
  }, [])

  const calculateTotalPrice = (items) => {
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

  return (
    <>
      <section className="profile-box">
        <div className="profile-section">
          <h2>User Profile:</h2>
          <div className="user-name">
            <b>Name:</b>
            {userProfile.user &&
              `${userProfile.user.first_name} ${userProfile.user.last_name}`}
          </div>
          <div className="user-email">
            <b>Email:</b>
            {userProfile.user && userProfile.user.email}
          </div>
          <div className="user-address">
            <b>Address:</b>
            {userProfile.address}
          </div>
          <div>
            <button onClick={() => setShowForm(true)}>Update Address</button>
          </div>
          {showForm && (
            <form className="editUser" onSubmit={handleSave}>
              <fieldset>
                <div>
                  <label>Update Address:</label>
                  <input
                    type="text"
                    placeholder="New Address"
                    value={userProfile.address}
                    onChange={(e) => {
                      const copy = { ...userProfile }
                      copy.address = e.target.value
                      setUserProfile(copy)
                    }}
                    required
                  />
                </div>
              </fieldset>
              <fieldset>
                <div>
                  <button type="submit">Save Address</button>
                </div>
              </fieldset>
            </form>
          )}
        </div>
        <div className="profile-section">
          <h2>Your Orders:</h2>
          <div>
            <b>Current Cart:</b>
          </div>
          {cart.length === 0 ? (
            <div> No items</div>
          ) : (
            <div> Cart Total : ${calculateTotalPrice(cart)}</div>
          )}
          {/* Place your order-related content here */}
          <div>
            <b>Previous Orders:</b>
            {orders.length > 0 ? (
              <div>
                {orders.map((order) => (
                  <div key={order.id}>
                    {order.id}, Total Price: ${calculateTotalPrice(order.items)}
                  </div>
                ))}
              </div>
            ) : (
              <div>No Previous Purchases</div>
            )}
          </div>
          {/* <div></div> */}
        </div>
      </section>
    </>
  )
}
