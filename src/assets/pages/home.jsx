import "./home.css"
import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <>
      <div className="banner">
        <h1 className="welcome">Welcome to Hook'd by Kim</h1>
        <img
          className="logo"
          src="/images/HookdLogo.png"
          alt="Hook'd by Kim Logo"
        />
      </div>

      <section className="shoppingbody">
        <div className="rts-select">
          <h3>Ready To Sell Items!</h3>
          <Link to="/rtsproducts">
            <button className="rtsbutton">Shop Now</button>
          </Link>
        </div>
        <div className="cus-select">
          <h3>Custom Products!</h3>
          <Link to="/cusproducts">
            <button className="cusbutton">Shop Now</button>
          </Link>
        </div>
      </section>
    </>
  )
}
