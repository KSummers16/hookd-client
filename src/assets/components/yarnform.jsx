import { useEffect, useState } from "react"
import {
  fetchColors,
  getAllCompanys,
  getAllWeights,
} from "../managers/productmanager.jsx"
import { AddNewCustomerYarn } from "./newyarnstash.jsx"

export const YarnForm = ({ currentUser }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    AddNewCustomerYarn(request).then(() => {})
  }
}
