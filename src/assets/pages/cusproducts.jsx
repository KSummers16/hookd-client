import { useEffect, useState } from "react"
import { getAllCategories, getAllCus } from "../managers/productmanager.jsx"
import { Link } from "react-router-dom"

export const CusProducts = () => {
  const [showCusProducts, setShowCusProducts] = useState([])
  const [category, setCategory] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    getAllCus().then((cusarray) => {
      setShowCusProducts(cusarray)
      setFilteredProducts(cusarray)
    })
  }, [])

  useEffect(() => {
    getAllCategories().then((catArray) => {
      setCategory(catArray)
    })
  }, [])

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredProducts(showCusProducts)
    } else {
      const filtered = showCusProducts.filter((product) =>
        product.category.name.includes(selectedCategory)
      )
      setFilteredProducts(filtered)
    }
  }, [selectedCategory, showCusProducts])

  return (
    <>
      <h2>Custom Products</h2>
      <h3>
        Design your dream crochet creation with our customizable options. Choose
        your favorite colors, styles, and details to create a truly
        one-of-a-kind piece that reflects your unique personality and
        preferences. Let your imagination run wild as we bring your vision to
        life stitch by stitch.
      </h3>
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
              <Link to={`/cusproducts/${product.id}`}>
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
