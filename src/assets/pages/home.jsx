import "./home.css"
import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <>
      <div className="banner">
        <h1 className="welcome">Welcome to Hook'd by Kim</h1>
      </div>

      <section className="shoppingbody">
        <div className="rts-select">
          <h3>Ready To Ship Items!</h3>
          <Link to="/rtsproducts">
            <img
              className="ReadyToSell"
              src="https://res.cloudinary.com/yarn-stash/image/upload/v1715009425/IMG_1572_s7asxs.jpg"
              alt="RTS"
            />
            <div>Shop Now!</div>
          </Link>
        </div>
        <div className="cus-select">
          <h3>Custom Products!</h3>
          <Link to="/cusproducts">
            <img
              className="Customize"
              src="https://res.cloudinary.com/yarn-stash/image/upload/v1715009840/IMG_1573_cy0plu.jpg"
              alt="Customize"
            />
            <div>Shop Now!</div>
          </Link>
        </div>
      </section>
    </>
  )
}
