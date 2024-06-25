import { useEffect, useState } from "react"
import { getAllCategories, getAllRTS } from "../managers/productmanager.jsx"
import { Link } from "react-router-dom"

import "./products.css"

export const RTSProducts = () => {
  const [showRtsProducts, setShowRtsProducts] = useState([])
  const [category, setCategory] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  const refreshProductList = () => {
    getAllRTS().then((RTSarray) => {
      setShowRtsProducts(RTSarray)
      setFilteredProducts(RTSarray)
    })
  }

  useEffect(() => {
    getAllRTS().then((RTSarray) => {
      setShowRtsProducts(RTSarray)
      setFilteredProducts(RTSarray)
    })
  }, [])

  useEffect(() => {
    const handlePurchase = () => refreshProductList()
    window.addEventListener("orderCompleted", handlePurchase)
    return () => {
      window.removeEventListener("orderCompleted", handlePurchase)
    }
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
      <h3>
        Explore our curated collection of handcrafted crochet creations,
        meticulously crafted and ready to ship straight to your doorstep. From
        adorable amigurumi to cozy blankets, find the perfect piece to add a
        touch of handmade charm to your life.
      </h3>
      <div className="filter-btn">
        <button className="product-btn" onClick={() => setSelectedCategory("")}>
          Show All
        </button>
        <button
          className="product-btn"
          onClick={() => setSelectedCategory("Stuffies")}
        >
          Stuffies
        </button>
        <button
          className="product-btn"
          onClick={() => setSelectedCategory("Accessories")}
        >
          Accessories
        </button>
        <button
          className="product-btn"
          onClick={() => setSelectedCategory("Food Accessories")}
        >
          Food Accessories
        </button>
        <button
          className="product-btn"
          onClick={() => setSelectedCategory("Home Decor")}
        >
          Home Decor
        </button>
      </div>
      <div className="products-show">
        {filteredProducts.map((product) => {
          console.log(product)
          return (
            <div className="products" key={product.id}>
              <Link to={`/rtsproducts/${product.id}`}>
                <div>
                  <b className="product-title">{product.name}</b>
                </div>
                {product.image && (
                  <img
                    className="rtsimage"
                    src={product.image}
                    alt={product.name}
                  />
                )}
                <div>${product.price}</div>

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
