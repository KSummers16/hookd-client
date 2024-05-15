import "./aboutKim.css"
import { ContactMe } from "../components/contactme.jsx"
import { useState } from "react"

export const AboutKim = () => {
  const [showForm, setShowForm] = useState(false)
  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/Hookd-By-Kim-101353409404632`,
      `_blank`
    )
  }

  const handleInstaGram = () => {
    window.open(
      `https://www.instagram.com/hookd_by_kim?igsh=MnEyZm01Mm9manJh&utm_source=qr`,
      `_blank`
    )
  }

  const handleYouTube = () => {
    window.open(`https://www.youtube.com/@HookdbyKim`, `_blank`)
  }

  return (
    <>
      <h1>About Kim</h1>
      <section className="about">
        <img
          src="https://res.cloudinary.com/yarn-stash/image/upload/v1715106962/IMG_8898_vpiyyo.jpg"
          alt="Kim"
          style={{ width: "300px", height: "auto" }}
        />
        <p className="info">
          I am 40 years old and am married and have a beautiful daughter. Me and
          my family live in Tennessee and I like that we are never far from
          something fun to do out here. I started to crochet because I was
          always fidgeting with my hands and thought I should give them
          something to do. In late 2020 I decided to lookup some YouTube videos
          and slowly but surely taught myself how to crochet. I started with
          coasters and blankets, and then moved on to amigurumi. I then decided
          to start showing off my products at local craft fairs and on Facebook,
          thus Hook'd by Kim was born! I always like to try new projects, so if
          you don't see something you like...just ask!{" "}
        </p>
        <button onClick={() => setShowForm(true)}>Contact me!</button>
        {showForm && <ContactMe />}
      </section>

      <h3>Checkout my social sites!</h3>
      <div className="socials">
        <button onClick={handleFacebook}>
          <img
            src="https://res.cloudinary.com/yarn-stash/image/upload/v1715107596/Facebook1_rdv8xa.jpg"
            alt="Facebook Logo"
            style={{ width: "20px", marginRight: "5px" }}
          />{" "}
          Hook'd by Kim on Facebook!
        </button>
        <button onClick={handleInstaGram}>
          <img
            src="https://res.cloudinary.com/yarn-stash/image/upload/v1715107622/Instagram_Glyph_Gradient_copy_ytw9xi.jpg"
            alt="IG Logo"
            style={{ width: "20px", marginRight: "5px" }}
          />
          Hook'd by Kim on IG!
        </button>
        <button onClick={handleYouTube}>
          <img
            src="https://i.pngimg.me/thumb/f/720/m2i8K9A0i8m2d3i8.jpg"
            alt="YouTube Logo"
            style={{ width: "20px", marginRight: "5px" }}
          />
          Hook'd by Kim on YouTube
        </button>
      </div>
    </>
  )
}
