import { useEffect, useState } from "react"

export const ContactMe = () => {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [csrfToken, setCsrfToken] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8000/token`)
      .then((response) => response.json())
      .then((data) => {
        setCsrfToken(data.csrfToken)
      })
  }, [])

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!csrfToken) {
      console.error("CSRF token is missing. Cannot submit the form")
    }

    const formData = new FormData()
    formData.append("name", message.name)
    formData.append("email", message.email)
    formData.append("message", message.message)

    fetch(`http://localhost:8000/contact`, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("hookd_token")).token
        }`,
      },
      body: formData,
    }).then((response) => {
      response.json()
      setIsSubmitted(true) // Set isSubmitted to true on successful submission
      setMessage({ name: "", email: "", message: "" }) // Reset form fields
    })
  }

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }
  }, [isSubmitted])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={message.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={message.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={message.message}
          onChange={handleChange}
        />

        <button type="submit">Send Message</button>
      </form>
    </>
  )
}
