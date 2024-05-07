import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { addRTSToOrder, getRTSbyId } from "../managers/productmanager.jsx"

export const RTSDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  const addToCart = (productId) => {
    addRTSToOrder({ rtsproduct_id: productId }).then(() => {
      alert("Product added to cart!")
    })
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
          <button onClick={(event) => addToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
