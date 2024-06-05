import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./assets/components/NavBar.jsx"

export const Authorized = ({ currentUser }) => {
  if (localStorage.getItem("hookd_token")) {
    return <Outlet />
  }
  return <Navigate to="/login" replace />
}

export const Layout = ({ currentUser }) => {
  return (
    <>
      <NavBar currentUser={currentUser} />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}
