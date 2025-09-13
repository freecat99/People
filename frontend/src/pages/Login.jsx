import React, { useState } from 'react'
import{ToastContainer} from 'react-toastify'
import { FaEnvelope, FaLock } from "react-icons/fa"

function Login() {
  const [userInfo, setUserInfo] = useState({
    email:'',
    password:''
  })
  const handleChange =(e)=>{
    const {name, value} = e.target;
    let copyUserInfo = {...userInfo};
    copyUserInfo[name] = value;
    setUserInfo(copyUserInfo);

  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {email, password} = userInfo;
    if(!email || !password){
      console.log("enter email password")
    }
    try {
      
    } catch (error) {
      //correct
    }
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <div className="entity">
          <label htmlFor="email"><FaEnvelope className='icon'/></label>
          <input type='email' id='email' name='email' onChange={handleChange} placeholder='Email' required/>
        </div>
        <div className="entity">
          <label htmlFor="password"><FaLock className='icon' /></label>
          <input type='password' id='password' name='password' onChange={handleChange} placeholder='Password' required/>
        </div>
        <button type='submit'>Login</button>
        <span><a href='/register'>Don't have an account?</a></span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
