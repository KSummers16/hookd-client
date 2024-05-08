import { useEffect, useState } from "react"
import { getAllOrders, getCustomerById } from "../managers/productmanager.jsx"
import "./profile.css"

export const UserProfile = ({ currentUser }) => {
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [userProfile, setUserProfile] = useState({
    user: { first_name: "", last_name: "", email: "" },
    address: "",
  })

  useEffect(() => {
    getCustomerById(currentUser).then((data) => {
      setUserProfile(data)
    })
  }, [currentUser])

  useEffect(() => {
    getAllOrders().then((orders) => {
      setOrders(orders)
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
        </div>
        <div className="profile-section">
          <h2>Your Orders:</h2>
          <div>
            <b>Current Cart:</b>
          </div>
          {cart.length === 0 ? (
            <div> No items</div>
          ) : (
            <div> Cart Total : {calculateTotalPrice(cart)}</div>
          )}
          {/* Place your order-related content here */}
          <div>
            <b>Previous Orders:</b>
            {orders.map((order) => (
              <div key={order.id}>
                {order.id}, Total Price: {calculateTotalPrice(order.items)}
              </div>
            ))}
          </div>
          {/* <div></div> */}
        </div>
      </section>
    </>
  )
}
