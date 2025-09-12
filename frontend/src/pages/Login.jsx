import React, { useState } from 'react'

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
    }
    try {
      
    } catch (error) {
      res.status()
    }
  }
  return (
    <div className='container'>
      <form>
        <div className="entity">
          <label htmlFor="email">Email</label>
          <input type='email' id='email' name='email' required onChange={handleChange}/>
        </div>
        <div className="entity">
          <label htmlFor="password">Password</label>
          <input type='password' id='password' name='password' required onChange={handleChange}/>
        </div>
        <button onClick={handleSubmit}>Login</button>
      </form>
      <p><a href='/register'>Don't have an account?</a></p>
    </div>
  )
}

export default Login
