import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./assets/pages/home.jsx"
import { RTSProducts } from "./assets/pages/rtsproducts.jsx"
import { CusProducts } from "./assets/pages/cusproducts.jsx"
// import { Authorized } from "./Authorized"
import "./App.css"
import { Login } from "./assets/pages/Login.jsx"
import { Register } from "./assets/pages/register.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/rtsproducts" element={<RTSProducts />} />
          <Route path="/cusproducts" element={<CusProducts />} />
          {/* Add routes here */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
