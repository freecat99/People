import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleDefault, handleFailure, handleSuccess } from '../utils';
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
      console.log("payload",payload);
      const userId = payload.id;
      console.log("her:",userId);
      
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
      <div className="postContainer">
        {posts.map((post)=>{
            const token = localStorage.getItem('token');
            const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
            const userId = payload?.id;

            const isLiked = post.likes && post.likes[userId]; 
        return(
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
                <div className="likes">
                  <div onClick={()=>handleLike(post._id)}>{isLiked?'Unlike':'Like'}</div>
                  <span>{Object.keys(post.likes).length}</span>
                </div>
                <ul>
                  <legend>Comments</legend>
                  {
                    post.comments.map((comment, i)=>(
                      <li key={i}>{comment}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          )     
      })}
      </div>
      <button onClick={handleLogout}>Logout</button>
      <Toaster richColors/>
    </div>
    </>
  )
}

export default Posts
