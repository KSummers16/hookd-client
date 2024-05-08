import { useEffect, useState } from "react"
import {
  fetchEyes,
  getAllCategories,
  addNewCusProd,
} from "../managers/productmanager.jsx"

export const AddNewCus = ({ onCloseForm }) => {
  const [eyes, setEyes] = useState([])
  const [categories, setCategories] = useState([])
  const [cusProduct, setCusProduct] = useState({
    name: "",
    price: "",
    category_id: "",
    eyes_id: "",
    pattern: "",
    yarn: "",
    image: "",
  })

  useEffect(() => {
    getAllCategories().then((catData) => {
      setCategories(catData)
    })
  }, [])

  useEffect(() => {
    fetchEyes().then((eyesData) => {
      setEyes(eyesData)
    })
  }, [])

  const handleChange = (event) => {
    const copy = { ...cusProduct }
    const { id, value } = event.target

    if (id === "price") {
      copy[id] = parseFloat(value)
    } else if (id === "eyes_id" || id === "category_id") {
      copy[id] = parseInt(value)
    } else {
      copy[id] = value
    }

    setCusProduct(copy)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewCusProd(cusProduct).then(() => {
      onCloseForm()
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label htmlFor="name">Name</label>
            <input
              required
              autoFocus
              id="name"
              type="text"
              value={cusProduct.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              required
              id="price"
              type="number"
              value={cusProduct.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="categoryId">Category</label>
            <select
              required
              id="category_id"
              value={cusProduct.category_id}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="eyesId">Eyes</label>
            <select
              required
              id="eyes_id"
              value={cusProduct.eyes_id}
              onChange={handleChange}
            >
              <option value="">Select Eyes</option>
              {eyes.map((eye) => (
                <option key={eye.id} value={eye.id}>
                  {eye.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pattern">Pattern</label>
            <input
              required
              id="pattern"
              type="text"
              value={cusProduct.pattern}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="yarn">Yarn</label>
            <input
              required
              id="yarn"
              type="text"
              value={cusProduct.yarn}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              required
              id="image"
              type="text"
              value={cusProduct.image}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add Custom Product</button>
        </fieldset>
      </form>
    </>
  )
}
