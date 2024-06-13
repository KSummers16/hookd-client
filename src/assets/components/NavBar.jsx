import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { getCustomerById } from "../managers/productmanager.jsx"

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("hookd_token")
    navigate("/login", { replace: true })
  }

  const handleClick = () => {
    setShowDropdown(false)
  }

  useEffect(() => {
    const fetchUserData = () => {
      if (currentUser) {
        try {
          const userData = getCustomerById(currentUser)
          setIsAdmin(userData.is_admin)
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
    }

    fetchUserData()
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.is_admin)
    }
  }, [currentUser])

  return (
    <>
      <ul className="navbar">
        <li className="navbar-item">
          <Link to="/" onClick={handleClick}>
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/rtsproducts" onClick={handleClick}>
            RTS Items
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/cusproducts" onClick={handleClick}>
            Custom Items
          </Link>
        </li>
        {currentUser ? (
          <li className="navbar-item">
            {/* Dropdown trigger button */}
            <button
              className={`dropdown-btn hamburger-btn ${
                showDropdown ? "open" : ""
              }`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              My Options
            </button>
            {/* Dropdown menu */}
            {showDropdown && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/cart" onClick={handleClick}>
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/user" onClick={handleClick}>
                    Profile
                  </Link>
                </li>
                {isAdmin && (
                  <li className="dropdown-item">
                    <Link to="/admin" onClick={handleClick}>
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li className="dropdown-item" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li className="navbar-item">
            <Link to="/login" onClick={handleClick}>
              Log In
            </Link>
          </li>
        )}
        <Link to="/aboutkim" onClick={handleClick}>
          <img
            className="logo"
            src="/images/HookdLogo.png"
            alt="Hook'd by Kim Logo"
          />{" "}
        </Link>
      </ul>
    </>
  )
}
