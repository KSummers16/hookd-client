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
          <h3>
            Explore our curated collection of handcrafted crochet creations,
            meticulously crafted and ready to ship straight to your doorstep.
            From adorable amigurumi to cozy blankets, find the perfect piece to
            add a touch of handmade charm to your life.
          </h3>
          <Link to="/rtsproducts">
            <button className="rtsbutton">Shop Now</button>
          </Link>
        </div>
        <div className="cus-select">
          <h3>
            Design your dream crochet creation with our customizable options.
            Choose your favorite colors, styles, and details to create a truly
            one-of-a-kind piece that reflects your unique personality and
            preferences. Let your imagination run wild as we bring your vision
            to life stitch by stitch.
          </h3>
          <Link to="/cusproducts">
            <button className="cusbutton">Shop Now</button>
          </Link>
        </div>
      </section>
    </>
  )
}
