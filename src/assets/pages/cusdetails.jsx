import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCusById } from "../managers/productmanager.jsx"
import { NewCusRequest } from "../components/customrequest.jsx"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../components/AuthContext.jsx"

export const CusDetails = () => {
  const { currentUser } = useAuth()
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getCusById(id).then((productData) => {
      setProduct(productData)
    })
  }, [id])

  if (!product) {
    return <div>No Product Available</div>
  }

  const handleAddCustomRequest = () => {
    if (currentUser) {
      setShowForm(true)
    } else {
      navigate("/login", { state: { from: location.pathname } })
    }
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <div className="itemdetails">
        <div>
          {product.image && (
            <img
              className="rtsdetailimage"
              src={product.image}
              alt={product.name}
            />
          )}
        </div>
        <div className="product-details">
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
          <p>
            <b>Pattern by:</b> {product.pattern}
          </p>
          <p>
            <b>Made with:</b> {product.yarn}
          </p>
          <button onClick={handleAddCustomRequest}>Add Custom Request</button>
          {showForm && (
            <NewCusRequest currentUser={currentUser} productId={product.id} />
          )}
        </div>
      </div>
    </div>
  )
}
