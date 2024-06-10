import { useState } from "react"

export const ContactMe = ({ onFormSubmitted }) => {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:hookdbykim@gmail.com?subject=Contact%20from%20${encodeURIComponent(
      message.name
    )}&body=${encodeURIComponent(
      `Name: ${message.name}\nEmail: ${message.email}\nMessage: ${message.message}`
    )}`
    window.location.href = mailtoLink
    setIsSubmitted(true)
    setMessage({ name: "", email: "", message: "" })

    // Call the onFormSubmitted callback
    if (onFormSubmitted) {
      onFormSubmitted()
    }
  }

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
          type="email"
          name="email"
          placeholder="Email"
          value={message.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={message.message}
          onChange={handleChange}
        />
        <button type="submit">Send Message</button>
      </form>
      {isSubmitted && <p>Email client opened to send your message!</p>}
    </>
  )
}
