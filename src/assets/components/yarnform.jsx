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
  }, [])

  const handleChange = (event) => {
    const { id, value } = event.target
    setRequest((prevRequest) => {
      const copy = { ...prevRequest }
      if (id === "amount") {
        copy[id] = parseFloat(value)
      } else if (
        id === "base_color_id" ||
        id === "weight_id" ||
        id === "company_id"
      ) {
        copy[id] = parseInt(value)
      } else {
        copy[id] = value
      }
      return copy
    })
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
            <label htmlFor="companyId">Company</label>
            <select
              required
              id="company_id"
              value={request.company_id}
              onChange={handleChange}
            >
              <option value="">Select a company</option>
              {companys.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="baseColorId">Base Color</label>
            <select
              required
              id="base_color_id"
              value={request.base_color_id}
              onChange={handleChange}
            >
              <option value="">Select a base color</option>
              {baseColors.map((baseColor) => (
                <option key={baseColor.id} value={baseColor.id}>
                  {baseColor.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              required
              id="name"
              type="text"
              value={request.name}
              onChange={handleChange}
            />
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                required
                id="amount"
                type="number"
                value={request.amount}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="colorName">Color Name</label>
              <select
                required
                id="color_name"
                type="text"
                value={request.color_name}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
