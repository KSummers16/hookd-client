import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { addCusToOrder, getCusById } from "../managers/productmanager.jsx"

export const CusDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  const addToCart = (productId) => {
    addCusToOrder({ cusproduct_id: productId }).then(() => {
      alert("Product added to cart!")
    })
  }

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
      <button onClick={(event) => addToCart(product.id)}>Add to Cart</button>
    </div>
  )
}
