import React from 'react'
import { useNavigate } from 'react-router-dom';

function About() {

  const navigate = useNavigate();
  return (
    <div className='about'>
      <div className="main">
        <p>It's your posts.</p>
        <p>It's your profile.</p>
        <p className='special'>It's all about you.</p>
      </div>

      <div className="cards">
        <div className='carousel'>
          <img src="/assets/vijay.png" alt="Vijay" className='card1'/>
          <img src="/assets/nitin.png" alt="Nitin" className='card2' />
          <img src="/assets/tashi.png" alt="Tashi" className='card3' />
        </div>
        <button className="makeProfile" onClick={()=>navigate('/register')}>Make your profile now!</button>
      </div>
    </div>
  )
}

export default About
