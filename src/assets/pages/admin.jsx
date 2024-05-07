import { useState } from "react"
import { AddNewRTS } from "../components/newrtsproduct.jsx"

export const Admin = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <h2>Admin</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add New Product"}
      </button>
      {showForm && <AddNewRTS />}

      <button></button>
    </>
  )
}
