import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Home } from "./assets/pages/home.jsx"
import { RTSProducts } from "./assets/pages/rtsproducts.jsx"
import { CusProducts } from "./assets/pages/cusproducts.jsx"
import { Authorized, Layout } from "./Authorized"
import "./App.css"
import { Login } from "./assets/pages/Login.jsx"
import { Register } from "./assets/pages/register.jsx"
import { RTSDetails } from "./assets/pages/rtsdetails.jsx"
import { CusDetails } from "./assets/pages/cusdetails.jsx"
import { MyCart } from "./assets/pages/cart.jsx"
import { UserProfile } from "./assets/pages/profile.jsx"
import { Admin } from "./assets/pages/admin.jsx"
import { AboutKim } from "./assets/pages/aboutKim.jsx"
import { Delete } from "./assets/components/deleteproduct.jsx"
import { AuthProvider } from "./assets/components/AuthContext.jsx"
import { UserInfo } from "./assets/components/UserInfo.jsx"

function App() {
  const localHookdUser = localStorage.getItem("hookd_token")
  const currentUser = JSON.parse(localHookdUser)
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="rtsproducts" element={<RTSProducts />} />
              <Route path="cusproducts" element={<CusProducts />} />
              <Route path="rtsproducts/:id" element={<RTSDetails />} />
              <Route path="aboutkim" element={<AboutKim />} />
              <Route path="/cusproducts/:id" element={<CusDetails />} />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route element={<Authorized />}>
                <Route path="/cart" element={<MyCart />} />
                <Route path="/user" element={<UserProfile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/delete" element={<Delete />} />
                {/* <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/return" element={<Return />} /> */}
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
