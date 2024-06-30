import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./assets/components/NavBar.jsx"
import { useAuth } from "./assets/components/AuthContext.jsx"

export const Authorized = () => {
  const { currentUser } = useAuth()
  if (currentUser) {
    return <Outlet />
  }
  return <Navigate to="/login" replace />
}

export const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}
