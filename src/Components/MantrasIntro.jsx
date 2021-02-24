import React from 'react'
import '../styles/MantrasIntro.css'
// import Logo from '../assets/mala.png'

const MantrasIntro = () => {
  // const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

  return (
    <div className="intro-container">
      <p className="intro_title">Mantras for Lama Ole&apos;s 80th Birthday</p>
      {/* if you want to have an image uncomment below */}
      {/* <img src={Logo} alt="Logo" className="intro_image" /> */}
      <p className="intro_text">
      March 19th is Lama Ole&apos;s 80th birthday! As a present from our Canadian Sangha, we are dedicating Mantras to him from any of our Diamond Way practices. We want to express our gratitude for his many decades of selfless activity for the benefit of all. We will then forward the final number to him along with a birthday wish.
      </p>
    </div>
  )
}

export default MantrasIntro
