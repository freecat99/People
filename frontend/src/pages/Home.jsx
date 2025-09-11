import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import About from '../components/About'
import Copy from '../components/Copy'

function Home() {
  return (
    <div>
      <Navbar/>
      <About/>
      <Carousel/>
      <Copy/>
    </div>
  )
}

export default Home
