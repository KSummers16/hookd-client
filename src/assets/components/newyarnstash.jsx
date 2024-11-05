import { useEffect, useState } from "react"
import {
  addCustomerYarn,
  getAllCompanys,
  getAllWeights,
  fetchColors,
} from "../managers/productmanager.jsx"

export const AddNewCustomerYarn = ({ onCloseForm, currentUser }) => {
  const [weights, setWeights] = useState([])
  const [baseColors, setBaseColors] = useState([])
  const [companies, setCompanies] = useState([])
  const [request, setRequest] = useState({
    customer_id: currentUser.id,
    company_id: "",
    name: "",
    weight_id: "",
    base_color_id: "",
    color_name: "",
    amount: "",
  })

  useEffect(() => {
    const fetchOptions = () => {
      getAllWeights().then(setWeights)
      fetchColors().then(setBaseColors)
      getAllCompanys().then(setCompanies)
    }
    fetchOptions()
  }, [])

  const handleChange = (field, value) => {
    setRequest((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const yarnData = {
      ...request,
      amount: request.amount !== "" ? parseInt(request.amount, 10) : null,
    }
    addCustomerYarn(yarnData).then(() => {
      window.alert("New yarn added successfully")
      setRequest({
        customer_id: currentUser.id,
        company_id: "",
        name: "",
        weight_id: "",
        base_color_id: "",
        color_name: "",
        amount: "",
      })
      onCloseForm()
    })
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }

  // const yarnData = {
  //   ...request,
  //   weight_id:
  //     request.weight_id !== "" ? parseInt(request.weight_id, 10) : null,
  //   base_color_id:
  //     request.base_color_id !== "" ? parseInt(request.base_color_id, 10) : null,
  //   amount: request.amount !== "" ? parseInt(request.amount, 10) : null,
  // }

  // addCustomerYarn(yarnData).then(() => {
  //   setSuccessMessage("New yarn added successfully")
  //   window.alert("New yarn added successfully")
  // })

  // setRequest({
  //   customer_id: currentUser.id,
  //   company: "",
  //   name: "",
  //   weight_id: "",
  //   base_color_id: "",
  //   color_name: "",
  //   amount: "",
  // }).finally(() => {
  //   setShowForm(false)
  // })

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Customer Yarn</h2>
        <YarnForm
          request={request}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          weights={weights}
          baseColors={baseColors}
          companies={companies}
        />
      </div>
    </div>
  )
}
