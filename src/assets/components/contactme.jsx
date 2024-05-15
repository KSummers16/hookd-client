import { useState } from "react"

export const ContactMe = () => {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value })
  }
}
