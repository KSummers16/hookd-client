import { useState, useEffect, useCallback } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Home } from "./assets/pages/home.jsx"
import { RTSProducts } from "./assets/pages/rtsproducts.jsx"
import { CusProducts } from "./assets/pages/cusproducts.jsx"
import { Authorized } from "./Authorized"
import "./App.css"
import { Login } from "./assets/pages/Login.jsx"
import { Register } from "./assets/pages/register.jsx"
import { RTSDetails } from "./assets/pages/rtsdetails.jsx"
import { CusDetails } from "./assets/pages/cusdetails.jsx"
import { MyCart } from "./assets/pages/cart.jsx"
import { UserProfile } from "./assets/pages/profile.jsx"
import { Admin } from "./assets/pages/admin.jsx"
import { AboutKim } from "./assets/pages/aboutKim.jsx"

const stripePromise = loadStripe("")

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret)
  }, [])

  const options = { fetchClientSecret }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

const Return = () => {
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState("")

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get("session_id")

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
      })
  }, [])

  if (status === "open") {
    return <Navigate to="/checkout" />
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null
}

function App() {
  const localHookdUser = localStorage.getItem("hookd_token")
  const currentUser = JSON.parse(localHookdUser)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Authorized currentUser={currentUser} />}>
            <Route path="/" element={<Home />} />
            <Route path="/rtsproducts" element={<RTSProducts />} />
            <Route path="/cusproducts" element={<CusProducts />} />
            <Route path="/rtsproducts/:id" element={<RTSDetails />} />
            <Route
              path="/cusproducts/:id"
              element={<CusDetails currentUser={currentUser} />}
            />
            <Route
              path="/cart"
              element={<MyCart currentUser={currentUser} />}
            />
            \
            <Route
              path="/user"
              element={<UserProfile currentUser={currentUser} />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/aboutkim" element={<AboutKim />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/return" element={<Return />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
