import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleDefault, handleFailure, handleSuccess, handleLoading } from '../utils';
import { Toaster, toast } from 'sonner';
import Postcard from '../components/Postcard';

function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{

    
  },[]);
  
  const handleLogout = () =>{
    handleSuccess('logged out successfully');
    localStorage.removeItem('token');
    setTimeout(()=>{
      navigate('/login');
    },2000)
  }

  const fetchPosts = async()=>{
    try {

      const url = 'http://localhost:1601/posts';
      const headers = {
        headers:{
          'Authorization': localStorage.getItem('token')
        }
      }
      const loading= handleLoading('loading...');
      const response = await fetch(url, headers);
  
      const result = await response.json();
      setPosts(result);
      toast.dismiss(loading);
              
    } catch (error) {
      handleFailure(error.message);
    }
    
  }

  const handleLike = async(id)=>{
    try {

      const token = localStorage.getItem('token');
      const takenArray = token.split('.');
      const payload = JSON.parse(atob(takenArray[1]));
      const userId = payload.id;
      
      const url = `http://localhost:1601/posts/${id}/${userId}/like`;
      const headers = {
        method:'PATCH',
        headers:{
          'Authorization': localStorage.getItem('token'),
        }
      }
      console.log(headers);
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log("result",result);
      const liked = result.liked;
      if(liked){
        handleDefault('unliked!');
      }else{
        handleDefault('liked!');
      }
      setPosts(prevPosts =>prevPosts.map(post =>
          post._id === id ? result.updatedPost : post
        )
      );

    } catch (error) {
      handleFailure('Bad Request',error.message)
    }
  }

  useEffect(()=>{
    fetchPosts();
  },[])

  return (
    <>
    <div className='posts'>
      <Postcard posts={posts} handleLike={handleLike} />
      <button onClick={handleLogout}>Logout</button>
    </div>
      <Toaster richColors/>
    </>
  )
}

export default Posts
