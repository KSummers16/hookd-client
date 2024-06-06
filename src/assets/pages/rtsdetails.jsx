import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { addRTSToOrder, getRTSbyId } from "../managers/productmanager.jsx"

export const RTSDetails = ({ currentUser }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [product, setProduct] = useState({})

  const addToCart = (productId) => {
    if (currentUser) {
      addRTSToOrder({ rtsproduct_id: productId }).then(() => {
        alert("Product added to cart!")
      })
    } else {
      navigate("/login", { state: { from: location.pathname } })
    }
  }

  useEffect(() => {
    getRTSbyId(id).then((productData) => {
      setProduct(productData)
    })
  }, [id])

  if (!product) {
    return <div>No Product Available</div>
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
          <button onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
