import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from '../utils';
import { Toaster } from 'sonner';

function Posts() {
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const takenArray = token.split('.');
    const payload = JSON.parse(atob(takenArray[1]));

    const userName = payload.name;
    const userEmail = payload.email;

    console.log(payload, userEmail, userName);
    
  },[]);
  
  const handleLogout = () =>{
    handleSuccess('logged out successfully');
    localStorage.removeItem('token');
    setTimeout(()=>{
      navigate('/login');
    },2000)
  }

  const fetchPosts = async()=>{
    const url = 'http://localhost:1601/posts';
    const headers = {
      headers:{
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(url, headers);
    const result = await response.json();
    setPosts(result);
    console.log(result);

  }

  useEffect(()=>{
    fetchPosts();
  },[])

  return (
    <div className='posts'>
      <button onClick={handleLogout}>Logout</button>
      <Toaster richColors/>
    </div>
  )
}

export default Posts
