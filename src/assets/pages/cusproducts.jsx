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
              <Link to={`/cusproducts/${product.id}`}>
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
