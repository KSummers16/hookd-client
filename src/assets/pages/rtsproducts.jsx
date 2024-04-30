import { useEffect, useState } from "react"
import { getAllCategories, getAllRTS } from "../managers/productmanager.jsx"
import { Link } from "react-router-dom"

import "./products.css"

export const RTSProducts = () => {
  const [showRtsProducts, setShowRtsProducts] = useState([])
  const [category, setCategory] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    getAllRTS().then((RTSarray) => {
      setShowRtsProducts(RTSarray)
      setFilteredProducts(RTSarray)
    })
  }, [])

  useEffect(() => {
    getAllCategories().then((catArray) => {
      setCategory(catArray)
    })
  }, [])

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredProducts(showRtsProducts)
    } else {
      const filtered = showRtsProducts.filter((product) =>
        product.category.name.includes(selectedCategory)
      )
      setFilteredProducts(filtered)
    }
  }, [selectedCategory, showRtsProducts])

  return (
    <>
      <h2>RTS Products</h2>
      <div className="filter-btn">
        <button onClick={() => setSelectedCategory("Stuffies")}>
          Stuffies
        </button>
        <button onClick={() => setSelectedCategory("Accessories")}>
          Accessories
        </button>
        <button onClick={() => setSelectedCategory("Food Accessories")}>
          Food Accessories
        </button>
        <button onClick={() => setSelectedCategory("Home Decor")}>
          Home Decor
        </button>
        <button onClick={() => setSelectedCategory("")}>Show All</button>
      </div>
      <div className="products-show">
        {filteredProducts.map((product) => {
          return (
            <div className="products" key={product.id}>
              <Link to={`/rtsproducts/${product.id}`}>
                <div>
                  <b>{product.name}</b>
                </div>
                <div>${product.price}</div>
                <div>{product.description}</div>
                <div>Pattern by: {product.pattern}</div>
                <div>Made with: {product.yarn}</div>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
