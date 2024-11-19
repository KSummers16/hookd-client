import { useEffect, useState } from "react"
import {
  fetchColors,
  getAllCompanys,
  getAllWeights,
} from "../managers/productmanager.jsx"
import { AddNewCustomerYarn } from "./newyarnstash.jsx"

export const YarnForm = ({ currentUser, onCloseForm }) => {
  const [request, setRequest] = useState({
    customer_id: currentUser.id,
    name: "",
    company_id: "",
    base_color_id: "",
    amount: "",
    weight_id: "",
    color_name: "",
  })
  const [baseColors, setBaseColors] = useState([])
  const [companys, setCompanys] = useState([])
  const [weights, setWeights] = useState([])
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    const fetchOptions = () => {
      fetchColors().then((colorData) => {
        setBaseColors(colorData)
      })
      getAllCompanys().then((companyData) => {
        setCompanys(companyData)
      })
      getAllWeights().then((weightData) => {
        setWeights(weightData)
      })
    }
    fetchOptions()
  }, [id])

  const handleChange = (event) => {
    const copy = { ...request }
    const { id, value } = event.target

    if (id === "amount") {
      copy[id] = parseFloat(value)
    } else if (
      id === "base_color_id" ||
      id === "weight_id" ||
      id === "copmany_id"
    ) {
      copy[id] = parseInt(value)
    } else {
      copy[id] = value
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    AddNewCustomerYarn(request).then(() => {
      onCloseForm()
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label htmlFor="weight">Weight</label>
            <select
              required
              id="weight_id"
              value={request.weight_id}
              onChange={handleChange}
            >
              <option value="">Select a weight</option>
              {weights.map((weight) => (
                <option key={weight.id} value={weight.id}>
                  {weight.id}.{weight.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label></label>
          </div>
        </fieldset>
      </form>
    </>
  )
}
