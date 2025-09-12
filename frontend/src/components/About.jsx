import React from 'react'
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';

function About() {

  const navigate = useNavigate();
  return (
    <>
    <div className='about'>
        <p>It's your posts.</p>
        <p>It's your profile.</p>
        <p className='special'>It's all about you.</p>

      <div className="cards">
        <Carousel/>
        <button className="makeProfile" onClick={()=>navigate('/')}>Make your profile now!</button>
      </div>
    </div>
    </>
  )
}

export default About
