import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("hookd_token")
    navigate("/login", { replace: true })
  }

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-item">
        {/* Dropdown trigger button */}
        <button
          className="dropdown-btn"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          User
        </button>
        {/* Dropdown menu */}
        {showDropdown && (
          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <Link to="/cart">Cart</Link>
            </li>
            {/* <li className="dropdown-item">
              <Link to={`/profile/${currentUser.id}`}>Profile</Link>
            </li> */}
            <li className="dropdown-item" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        )}
      </li>
    </ul>
  )
}
