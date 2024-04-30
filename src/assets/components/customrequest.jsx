import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCusById } from "../managers/productmanager.jsx"

export const NewCusRequest = ({ currentUser }) => {
  const { id } = useParams()
  const [colorOptions, setColorOptions] = useState([])
  const [eyeOptions, setEyeOptions] = useState([])
  const [request, setRequest] = useState({
    productId: id,
    eyesId: "",
    color1Id: "",
    color2Id: "",
    customerId: currentUser.id,
  })

  useEffect(() => {
    const fetchOptions = () => {
      fetch(`/api/colors`)
        .then((response) => response.json())
        .then((data) => setColorOptions(data))

      fetch(`/api/cusproducts/${id}`)
        .then((response) => response.json())
        .then((product) => {
          if (product.hasEyes) {
            fetch(`/api/eyes`)
              .then((response) => response.json())
              .then((data) => setEyeOptions(data))
          }
        })
    }
    fetchOptions()
  }, [id])
  return <></>
}
