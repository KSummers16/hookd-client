import { useEffect, useState } from "react"
import "./deleteproducts.css"
import {
  deleteCusItem,
  deleteRTSItem,
  getAllCus,
  getAllRTS,
} from "../managers/productmanager.jsx"

export const Delete = () => {
  const [rtsProducts, setRtsProducts] = useState([])
  const [cusProducts, setCusProducts] = useState([])

  useEffect(() => {
    getAllRTS().then((RTSarray) => {
      setRtsProducts(RTSarray)
    })
  }, [])

  useEffect(() => {
    getAllCus().then((cusArray) => {
      setCusProducts(cusArray)
    })
  }, [])

  const deleteRTS = (id) => {
    deleteRTSItem(id)
      .then(() => {
        return getAllRTS()
      })
      .then((updatedRtsArray) => {
        setRtsProducts(updatedRtsArray)
      })
  }

  const deleteCUS = (id) => {
    deleteCusItem(id)
      .then(() => {
        return getAllCus()
      })
      .then((updatedCusArray) => {
        setCusProducts(updatedCusArray)
      })
  }

  return (
    <>
      <h2>Delete Products from Inventory</h2>
      <div className="deleteproducts">
        <div className="rts">
          <h3 className="title">Ready to Sell Products</h3>
          {rtsProducts.map((rtsproduct) => {
            return (
              <div className="drts" key={rtsproduct.id}>
                {rtsproduct.name}
                <button
                  className="delete btn"
                  onClick={() => deleteRTS(rtsproduct.id)}
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>
        <div className="cus">
          <h3 className="title">Custom Products</h3>
          {cusProducts.map((cusproduct) => {
            return (
              <div className="dcus" key={cusproduct.id}>
                {cusproduct.name}
                <button
                  className="delete btn"
                  onClick={() => deleteCUS(cusproduct.id)}
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
