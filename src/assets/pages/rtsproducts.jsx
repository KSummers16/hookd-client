import { useEffect, useState } from "react"
import { getAllRTS } from "../managers/rtsmanager.jsx"

export const RTSProducts = () => {
  const [showRtsProducts, setShowRtsProducts] = useState([])

  useEffect(() => {
    getAllRTS().then((RTSarray) => {
      setShowRtsProducts(RTSarray)
    })
  }, [])

  return (
    <>
      <h2>RTS Products</h2>
      <div className="rts-show">
        {showRtsProducts.map((product) => {
          return (
            <div key={product.id}>
              <div className="rts-show">
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.description}</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
