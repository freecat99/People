import React from 'react'
import {useNavigate} from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate();

  return (
    <div className='navbar'> 
      <div className="left">
        <p>People - theSocialApp</p>
      </div>
      <div className="right">
        <button onClick={()=>navigate('/login')}>Login</button>
        <button onClick={()=>navigate('/register')}>Register</button>
      </div>
    </div>
  )
}

export default Navbar
