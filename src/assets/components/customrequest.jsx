import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const NewCusRequest = ({ currentUser }) => {
  const { id } = useParams()
  const [colorOptions, setColorOptions] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [eyeOptions, setEyeOptions] = useState([])
  const [request, setRequest] = useState({
    cusproduct_id: parseInt(id, 10),
    eyes_id: "",
    color1_id: "",
    color2_id: "",
    customer_id: currentUser.id,
  })

  useEffect(() => {
    const fetchOptions = () => {
      const token = currentUser.token
      fetch(`http://localHost:8000/colors`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setColorOptions(data))

      fetch(`http://localHost:8000/cusproducts/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((product) => {
          if (product.hasEyes) {
            fetch(`http://localHost:8000/eyes`, {
              headers: {
                Authorization: `Token ${token}`,
              },
            })
              .then((response) => response.json())
              .then((data) => setEyeOptions(data))
          }
        })
    }
    fetchOptions()
  }, [id])

  //   const handleSubmit = (e) => {
  //     e.preventDefault()
  //     const requestData = { ...request }
  //     request.cusproductId =
  //       requestData.productId !== "" ? parseInt(requestData.productId, 10) : null
  //     requestData.eyesId =
  //       requestData.eyesId !== "" ? parseInt(requestData.eyesId, 10) : null
  //     requestData.color1Id =
  //       requestData.color1Id !== "" ? parseInt(requestData.color1Id, 10) : null
  //     requestData.color2Id =
  //       requestData.color2Id !== "" ? parseInt(requestData.color2Id, 10) : null

  //     const token = currentUser.token

  //     if (requestData.color2Id === "") {
  //       requestData.color2Id = null
  //     }
  //     fetch(`http://localHost:8000/cart`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${token}`,
  //       },
  //       body: JSON.stringify(requestData),
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json()
  //         } else {
  //           throw new Error("Failed to submit request")
  //         }
  //       })
  //       .then((data) => {
  //         setSuccessMessage("Request submitted successfully")

  //         setRequest({ cusproductId: id, eyesId: "", color1Id: "", color2Id: "" })
  //       })
  //   }
  const handleSubmit = (e) => {
    e.preventDefault()

    // Destructure request object
    const { cusproduct_id, eyes_id, color1_id, color2_id } = request

    // Convert values to integers where necessary
    const requestData = {
      cusproduct_id: cusproduct_id !== "" ? parseInt(cusproduct_id, 10) : null,
      eyes_id: eyes_id !== "" ? parseInt(eyes_id, 10) : null,
      color1_id: color1_id !== "" ? parseInt(color1_id, 10) : null,
      color2_id: color2_id !== "" ? parseInt(color2_id, 10) : null,
      customer_id: currentUser.id,
    }

    // Remove color2Id if it's an empty string
    if (requestData.color2_id === "") {
      delete requestData.color2_id
    }

    const token = currentUser.token

    fetch(`http://localHost:8000/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Failed to submit request")
        }
      })
      .then((data) => {
        setSuccessMessage("Request submitted successfully")

        // Reset request state
        setRequest({
          cusproduct_id: id,
          eyes_id: "",
          color1_id: "",
          color2_id: "",
        })
      })
      .catch((error) => {
        console.error("Error submitting request:", error)
        // Handle error if necessary
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {eyeOptions.length > 0 && (
          <label>
            Eyes:
            <select
              value={request.eyesId}
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
        )}
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
            value={request.color2Id}
            onChange={(e) =>
              setRequest({ ...request, color2_id: e.target.value })
            }
          >
            <option value="">Select Second Color</option>
            {colorOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit Request</button>
      </form>
    </>
  )
}
