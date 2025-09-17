import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { handleDefault, handleFailure, handleSuccess, handleLoading } from '../utils';

import Postcard from '../components/Postcard';
import { Toaster } from 'sonner';

function Profile() {
  const params = useParams();
  const userId = params.userId;

  const[userPosts, setUserPosts] = useState([]);

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
      setUserPosts(prevPosts =>prevPosts.map(post =>
          post._id === id ? result.updatedPost : post
        )
      );

    } catch (error) {
      handleFailure('Bad Request',error.message)
    }
  }

  

  const fetchUserPosts = async(userId) =>{

    const url = `http://localhost:1601/posts/${userId}`;
    const headers = {
      headers:{
        'Authorization': localStorage.getItem('token')
      }
    }

    const response = await fetch(url, headers);
    const result = await response.json();
    setUserPosts(result);
    console.log(result)


  }

  useEffect(()=>{
    fetchUserPosts(userId);
  },[])

  return (
    <>
    <div className='posts'>
      <Postcard posts={userPosts} handleLike={handleLike}/>
    </div>
    <Toaster/>
    </>
  )
}

export default Profile
