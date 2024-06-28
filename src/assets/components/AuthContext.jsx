import React, { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Check for existing auth token on component mount
    const hookdToken = localStorage.getItem("hookd_token")
    if (hookdToken) {
      setCurrentUser(JSON.parse(hookdToken))
    }
  }, [])

  const login = (authInfo) => {
    localStorage.setItem("hookd_token", JSON.stringify(authInfo))
    setCurrentUser(authInfo)
  }

  const logout = () => {
    localStorage.removeItem("hookd_token")
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
