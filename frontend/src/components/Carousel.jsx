import React from 'react'

function Carousel() {
  return (
    <div className='carousel'>
      <div className="carousel-track">
        {/*Original set*/}
        <img src="/assets/vijay.png" alt="Vijay" />
        <img src="/assets/nitin.png" alt="Nitin" />
        <img src="/assets/tashi.png" alt="Tashi" />
        <img src="/assets/arup.png" alt="Arup" />

        {/*Duplicate set for seamless looping*/}
        <img src="/assets/vijay.png" alt="Vijay copy" />
        <img src="/assets/nitin.png" alt="Nitin copy" />
        <img src="/assets/tashi.png" alt="Tashi copy" />
        <img src="/assets/arup.png" alt="Arup copy" />
      </div>
    </div>
  )
}

export default Carousel
