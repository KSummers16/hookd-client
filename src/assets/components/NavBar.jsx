import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { getCustomerById } from "../managers/productmanager.jsx"

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("hookd_token")
    navigate("/login", { replace: true })
  }

  // useEffect(() => {
  //   getCustomerById(currentUser).then((data) => {
  //     setIsAdmin(data.customer.is_admin)
  //   })
  // })

  useEffect(() => {
    getCustomerById(currentUser)
      .then((data) => {
        setIsAdmin(data.is_admin)
        setIsDataFetched(true)
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error)
        setIsDataFetched(true)
      })
  }, [currentUser])

  return (
    <>
      <ul className="navbar">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/rtsproducts">RTS Items</Link>
        </li>
        <li className="navbar-item">
          <Link to="/cusproducts">Custom Items</Link>
        </li>
        <li className="navbar-item">
          {/* Dropdown trigger button */}
          <button
            className="dropdown-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            My Options
          </button>
          {/* Dropdown menu */}
          {isDataFetched && showDropdown && (
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/user">Profile</Link>
              </li>
              {isAdmin && (
                <li className="dropdown-item">
                  <Link to="/admin">Admin Panel</Link>
                </li>
              )}
              <li className="dropdown-item" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          )}
        </li>
        <img
          className="logo"
          src="/images/HookdLogo.png"
          alt="Hook'd by Kim Logo"
        />
      </ul>
    </>
  )
}
