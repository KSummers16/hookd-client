import { useState } from "react"
import { Link } from "react-router-dom"
import { AddNewRTS } from "../components/newrtsproduct.jsx"
import { AddNewCus } from "../components/newcusproduct.jsx"

export const Admin = () => {
  const [showForm, setShowForm] = useState(false)

  const toggleForm = (formId) => {
    console.log("Toggling form with id:", formId)
    setShowForm((prevState) => (prevState === formId ? null : formId))
  }

  return (
    <>
      <h2>Admin</h2>
      <button onClick={() => toggleForm("addNewRTS")}>
        {showForm === "addNewRTS" ? "Close Form" : "Add New RTS Product"}
      </button>
      {showForm === "addNewRTS" && (
        <AddNewRTS onCloseForm={() => toggleForm("addNewRTS")} />
      )}

      <button onClick={() => toggleForm("addNewCus")}>
        {showForm === "addNewCus" ? "Close Form" : "Add New Custom Product"}
      </button>
      {showForm === "addNewCus" && (
        <AddNewCus onCloseForm={() => toggleForm("addNewCus")} />
      )}
      <Link to="/delete">
        <button>Delete Product Page</button>
      </Link>
    </>
  )
}
