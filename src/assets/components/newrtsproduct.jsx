import { useEffect, useState } from "react"
import {
  fetchEyes,
  getAllCategories,
  addNewRtsProd,
} from "../managers/productmanager.jsx"

export const AddNewRTS = ({ onCloseForm }) => {
  const [eyes, setEyes] = useState([])
  const [categories, setCategories] = useState([])
  const [rtsProduct, setRtsProduct] = useState({
    name: "",
    price: "",
    description: "",
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
    const copy = { ...rtsProduct }
    const { id, value } = event.target

    if (id === "price") {
      copy[id] = parseFloat(value)
    } else if (id === "eyes_id" || id === "category_id") {
      copy[id] = parseInt(value)
    } else {
      copy[id] = value
    }

    setRtsProduct(copy)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewRtsProd(rtsProduct).then(() => {
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
              value={rtsProduct.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              required
              id="price"
              type="number"
              value={rtsProduct.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              required
              id="description"
              type="text"
              value={rtsProduct.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="categoryId">Category</label>
            <select
              required
              id="category_id"
              value={rtsProduct.category_id}
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
              value={rtsProduct.eyes_id}
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
              value={rtsProduct.pattern}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="yarn">Yarn</label>
            <input
              required
              id="yarn"
              type="text"
              value={rtsProduct.yarn}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              required
              id="image"
              type="text"
              value={rtsProduct.image}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add RTS Product</button>
        </fieldset>
      </form>
    </>
  )
}
