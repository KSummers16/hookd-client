import { useEffect, useState } from "react"
import { getCustomerById } from "../managers/productmanager.jsx"

export const UserProfile = ({ currentUser }) => {
  const [userProfile, setUserProfile] = useState({
    user: { first_name: "", last_name: "", email: "" },
    address: "",
  })

  useEffect(() => {
    getCustomerById(currentUser).then((data) => {
      setUserProfile(data)
    })
  }, [currentUser])

  return (
    <>
      <h2>User Profile</h2>
      <section className="profile-box">
        <div className="user-title">Name:</div>
        <div className="user-info">
          {userProfile.user &&
            `${userProfile.user.first_name} ${userProfile.user.last_name}`}
        </div>
        <div>
          <div className="user-title">Email:</div>
          <div className="user-info">
            {userProfile.user && userProfile.user.email}
          </div>
        </div>
        <div>
          <div className="user-title">Address:</div>
          <div className="user-info">{userProfile.address}</div>
        </div>
      </section>
    </>

    // view orders
  )
}
