import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {Toaster} from 'sonner'
import { handleFailure, handleSuccess } from '../utils'


function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email:'',
    password:''
  })
  const handleChange =(e)=>{
    const {name, value} = e.target;
    let copyUserInfo = {...userInfo};
    copyUserInfo[name] = String(value);
    setUserInfo(copyUserInfo);

  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {email, password} = userInfo;
    if(!email || !password){
      return handleFailure("email and password required")
    }
    try {
      const url = "http://localhost:1601/auth/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(userInfo)
      })
      const result = await response.json();
      const{success, message, error, token} = result;

      if(success){
        handleSuccess(message);
        localStorage.setItem('token', token);
        setTimeout(()=>{
          navigate('/posts')
        },2000);

      }else if(error){
        handleFailure(error.details[0].message);

      }else{
        handleFailure(message);
      }
      
    } catch (error) {
      //correct
      return handleFailure("something went wrong, please try again", error)

    }
  }
  
  return (
    <>
    <div className="main">
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <div className="entity">
          <input type='email' id='email' name='email' onChange={handleChange} placeholder='Email' />
        </div>
        <div className="entity">
          <input type='password' id='password' name='password' onChange={handleChange} placeholder='Password' />
        </div>
        <button type='submit'>Login</button>
        <span><a href='/register'>Don't have an account?</a></span>
      </form>
    </div>
    </div>
      <Toaster richColors/>
    </>
  )
}

export default Login
