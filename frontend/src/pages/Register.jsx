import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { FaEnvelope, FaLock, FaAlignJustify , FaSuitcase, FaLocationArrow    } from "react-icons/fa"
import { IoPersonCircle     } from "react-icons/io5"
import {Toaster} from 'sonner'
import { handleFailure, handleSuccess } from '../utils'


function Register() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    picturePath:'',
    location:'',
    occupation:''
  })
  const handleChange =(e)=>{
    const {name, value} = e.target;
    let copyUserInfo = {...userInfo};
    copyUserInfo[name] = String(value);
    setUserInfo(copyUserInfo);

  }
  const handleSubmit = async(e)=>{
    e.preventDefault();

    const formData = new FormData();

    // Append state fields
    for (const key in userInfo) {
      formData.append(key, userInfo[key]);
    }
    const fileInput = document.getElementById("avatar");
    if (fileInput && fileInput.files[0]) {
      formData.append("avatar", fileInput.files[0]);
    }


    console.log(userInfo);
    const {email, password, firstName, lastName} = userInfo;
    if(!email || !password || !firstName || !lastName){
      return handleFailure("all fields required")
    }
    try {
      const url = "http://localhost:1601/auth/register";
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      })
      const result = await response.json();
      console.log(result);
      const{success, message, error} = result;

      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
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
    <div className='container'>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <div className="entity">
          <label htmlFor="firstName"><FaAlignJustify   className='icon' /></label>
          <input type='text' id='firstName' name='firstName' onChange={handleChange} placeholder='First Name' />
        </div>
        <div className="entity">
          <label htmlFor="lastName"><FaAlignJustify   className='icon' /></label>
          <input type='text' id='lastName' name='lastName' onChange={handleChange} placeholder='Last Name' />
        </div>
        
        <div className="entity">
          <label htmlFor="email"><FaEnvelope className='icon' /></label>
          <input type='email' id='email' name='email' onChange={handleChange} placeholder='Email' />
        </div>
        <div className="entity">
          <label htmlFor="password"><FaLock className='icon' /></label>
          <input type='password' id='password' name='password' onChange={handleChange} placeholder='Password' />
        </div>
        <div className="entity">
          <label htmlFor="occupation"><FaSuitcase   className='icon' /></label>
          <input type='text' id='occupation' name='occupation' onChange={handleChange} placeholder='Occupation' />
        </div>
        <div className="entity">
          <label htmlFor="location"><FaLocationArrow  className='icon'/></label>
          <input type='text' id='location' name='location' onChange={handleChange} placeholder='Location' />
        </div>
        <div className="entity">
          <label htmlFor="avatar"><IoPersonCircle   className='icon'/></label>
          <input type='file' id='avatar' name='avatar'placeholder='Your Avatar' />
        </div>
        
        <button type='submit'>Register</button>
        <span><a href='/register'>Don't have an account?</a></span>
      </form>
      <Toaster richColors/>
    </div>
    </>
  )
}

export default Register
