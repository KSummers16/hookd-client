import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCusById } from "../managers/productmanager.jsx"
import { NewCusRequest } from "../components/customrequest.jsx"

export const CusDetails = ({ currentUser }) => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    getCusById(id).then((productData) => {
      setProduct(productData)
    })
  }, [id])

  if (!product) {
    return <div>No Product Available</div>
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <p>Pattern by: {product.pattern}</p>
      <p>Made with: {product.yarn}</p>
      <button onClick={() => setShowForm(true)}>Add Custom Request</button>
      {showForm && (
        <NewCusRequest currentUser={currentUser} productId={product.id} />
      )}
    </div>
  )
}
