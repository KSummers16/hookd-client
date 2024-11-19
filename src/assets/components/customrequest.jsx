import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchColors, fetchEyes } from "../managers/productmanager.jsx"

export const NewCusRequest = ({ currentUser }) => {
  const { id } = useParams()
  const [colorOptions, setColorOptions] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [eyeOptions, setEyeOptions] = useState([])
  const [product, setProduct] = useState(null)
  const [request, setRequest] = useState({
    cusproduct_id: parseInt(id, 10),
    eyes_id: "",
    color1_id: "",
    color2_id: "",
    customer_id: currentUser.id,
  })
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    const fetchOptions = () => {
      fetchColors().then((colorData) => {
        setColorOptions(colorData)
      })
      fetchEyes().then((eyeData) => {
        setEyeOptions(eyeData)
      })
    }
    fetchOptions()
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestData = {
      cusproduct_id:
        request.cusproduct_id !== ""
          ? parseInt(request.cusproduct_id, 10)
          : null,
      eyes_id: request.eyes_id !== "" ? parseInt(request.eyes_id, 10) : null,
      color1_id:
        request.color1_id !== "" ? parseInt(request.color1_id, 10) : null,
      color2_id:
        request.color2_id !== "" ? parseInt(request.color2_id, 10) : null,
      customer_id: currentUser.id,
    }

    if (requestData.color2_id === null) {
      delete requestData.color2_id
    }

    const token = currentUser.token

    fetch(`https://coral-app-da9ux.ondigitalocean.app/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.text()
        } else {
          throw new Error(`Failed to submit request: ${response.status}`)
        }
      })
      .then((text) => {
        if (!text) {
          return {}
        }
        try {
          return JSON.parse(text)
        } catch (error) {
          throw new Error("Invalid JSON in response")
        }
      })
      .then((data) => {
        setSuccessMessage("Request submitted successfully")
        window.alert("Request submitted successfully")

        setRequest({
          cusproduct_id: id,
          eyes_id: "",
          color1_id: "",
          color2_id: "",
        })
      })
      .catch((error) => {
        window.alert("Failed to submit request. Please try again.")
      })
      .finally(() => {
        setShowForm(false)
      })
  }
  return (
    <>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Eyes:
            <select
              value={request.eyes_id}
              onChange={(e) =>
                setRequest({ ...request, eyes_id: e.target.value })
              }
            >
              <option value="">Select Eyes</option>
              {eyeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Color 1:
            <select
              value={request.color1Id}
              onChange={(e) =>
                setRequest({ ...request, color1_id: e.target.value })
              }
            >
              <option value="">Select First Color</option>
              {colorOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Color 2:
            <select
              value={request.color2_id}
              onChange={(e) =>
                setRequest({ ...request, color2_id: e.target.value })
              }
            >
              <option value="">Choose Second Color</option>
              {colorOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Submit Request</button>
        </form>
      )}
    </>
  )
}
