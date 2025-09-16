import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleFailure, handleSuccess } from '../utils';
import { FaHeart } from "react-icons/fa";

import { Toaster } from 'sonner';

function Posts() {
  const [user, setUser] = useState('');
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
      const response = await fetch(url, headers);
      const result = await response.json();
      setPosts(result);
    
    } catch (error) {
      handleFailure(error.message);
    }
    
  }

  const handleLike = async(id)=>{
    try {

      const token = localStorage.getItem('token');
      const takenArray = token.split('.');
      const payload = JSON.parse(atob(takenArray[1]));

      const userId = payload._id;
      
      const url = `http://localhost:1601/posts/${id}/like`;
      const headers = {
        method:'PATCH',
        headers:{
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId}),
      }
      console.log("sa", userId)
      console.log(headers);
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);


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
      <div className="postContainer">
        {posts.map((post)=>(
            <div className="postCard" key={post._id}>
              <div className="cardTop">
                <img src={`http://localhost:1601/assets/${post.userPicturePath}`} alt="avatar" />
                <span className='username'>
                  <p>{post.firstName}</p>
                  <p>{post.lastName}</p>
                </span>
              </div>
              <div className="cardMid">
                <span className="description">{post.description}</span>
                <img src={`http://localhost:1601/assets/${post.picturePath}`} alt="post" />
                
              </div>
              <div className="cardBottom">
                <span className="likes">
                  <button onClick={()=>handleLike(post._id)}>Likes: </button>
                  <span>{Object.keys(post.likes).length}</span>
                  </span>
                <ul>
                  {
                    post.comments.map((comment, i)=>(
                      <li key={i}>{comment}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          )     
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
      <Toaster richColors/>
    </div>
    </>
  )
}

export default Posts
