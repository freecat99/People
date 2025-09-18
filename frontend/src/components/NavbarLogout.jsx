import React from 'react'
import {useNavigate} from 'react-router-dom'
import { handleSuccess } from '../utils';


function NavbarLogout({user}) {

  const navigate = useNavigate();
  const handleLogout = () => {
    handleSuccess('logged out successfully');
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className='navbar'> 
      <div className="left">
        <p>People</p>
      </div>
      <div className="right">
        <button >{user}</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default NavbarLogout
