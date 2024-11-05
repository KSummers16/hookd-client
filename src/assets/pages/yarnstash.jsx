import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../components/AuthContext.jsx"
import { getAllCustomerYarns } from "../managers/productmanager.jsx"
import { AddNewCustomerYarn } from "../components/newyarnstash.jsx"

export const YarnStash = () => {
  const [showForm, setShowForm] = useState(false)
  const [showYarns, setShowYarns] = useState([])
  const [message, setMessage] = useState("") // State for messages
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchYarns = () => {
    if (currentUser) {
      getAllCustomerYarns().then((yarnArray) => {
        const userYarns = yarnArray.filter(
          (yarn) => yarn.userId === currentUser.id
        )
        if (userYarns.length > 0) {
          setShowYarns(userYarns)
          setMessage("")
        } else {
          setShowYarns([])
          setMessage("Your stash is empty.")
        }
      })
    } else {
      setShowYarns([])
      setMessage("You need to log in to see your stash.")
    }
  }

  useEffect(() => {
    fetchYarns()
  }, [currentUser])

  const handleCloseForm = () => {
    setShowForm(false)
    fetchYarns()
  }

  return (
    <>
      {currentUser && (
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add New Customer Yarn"}
        </button>
      )}

      {showForm && currentUser && (
        <AddNewCustomerYarn
          onCloseForm={handleCloseForm}
          currentUser={currentUser}
        />
      )}
      <div className="yarnContainer">
        <section className="yarnCard">
          {message && <p>{message}</p>} {/* Display the message */}
          {showYarns.map((yarn) => (
            <div className="yarn" key={yarn.id}>
              <div className="yarnDetails">
                <div>
                  <b>Company:</b> {yarn.company.name}
                </div>
                <div>
                  <b>Name:</b>
                  {yarn.name}
                </div>
                <div>
                  <b>Weight:</b> {yarn.weight}-{yarn.weight.name}
                </div>
                <div>
                  <b>Base Color:</b> {yarn.base_color.name}
                </div>
                <div>
                  <b>Color Name:</b> {yarn.color_name}
                </div>
                <div>
                  <b>Amount:</b> {yarn.amount}
                </div>
              </div>
            </div>
          ))}
          {/* Login button is shown only if the user is not logged in */}
          {!currentUser && (
            <div>
              <p></p>
              <button
                onClick={() =>
                  navigate("/login", { state: { from: location.pathname } })
                }
              >
                Log In
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
