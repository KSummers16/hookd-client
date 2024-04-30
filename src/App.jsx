import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./assets/pages/home.jsx"
import { RTSProducts } from "./assets/pages/rtsproducts.jsx"
import { CusProducts } from "./assets/pages/cusproducts.jsx"
import { Authorized } from "./Authorized"
import "./App.css"
import { Login } from "./assets/pages/Login.jsx"
import { Register } from "./assets/pages/register.jsx"
import { RTSDetails } from "./assets/pages/rtsdetails.jsx"
import { CusDetails } from "./assets/pages/cusdetails.jsx"

function App() {
  const localHookdUser = localStorage.getItem("hookd_token")
  const currentUser = JSON.parse(localHookdUser)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Authorized />}>
            <Route path="/" element={<Home />} />
            <Route path="/rtsproducts" element={<RTSProducts />} />
            <Route path="/cusproducts" element={<CusProducts />} />
            <Route path="/rtsproducts/:id" element={<RTSDetails />} />
            <Route path="/cusproducts/:id" element={<CusDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
