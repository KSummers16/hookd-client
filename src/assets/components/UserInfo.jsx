import React from "react"
import { useAuth } from "../components/AuthContext.jsx"

export const UserInfo = () => {
  const { currentUser } = useAuth()

  console.log("Current user in UserInfo:", currentUser)

  return (
    <div>
      <h2>User Information</h2>
      {currentUser ? (
        <div>
          <p>User ID: {currentUser.user_id}</p>
          <p>Email: {currentUser.email}</p>
          {/* Display all properties of currentUser */}
          <pre>{JSON.stringify(currentUser, null, 2)}</pre>
        </div>
      ) : (
        <p>No user is currently logged in.</p>
      )}
    </div>
  )
}
