import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleDefault, handleFailure, handleSuccess, handleLoading } from '../utils';
import { Toaster, toast } from 'sonner';
import Postcard from '../components/Postcard';
import NavbarLogout from '../components/NavbarLogout';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const user = payload.name;

  const fetchPosts = async () => {
    try {
      const url = 'http://localhost:1601/posts';
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const loading = handleLoading('loading...');
      const response = await fetch(url, headers);
      const result = await response.json();
      setPosts(result);
      toast.dismiss(loading);
    } catch (error) {
      handleFailure(error.message);
    }
  };

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      const url = `http://localhost:1601/user/${userId}/friends`;
      const headers = {
        headers: {
          Authorization: token,
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setFriends(result);
    } catch (error) {
      handleFailure(error.message);
    }
  };

  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      const url = `http://localhost:1601/posts/${id}/${userId}/like`;
      const headers = {
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      const liked = result.liked;
      if (liked) {
        handleDefault('unliked!');
      } else {
        handleDefault('liked!');
      }
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? result.updatedPost : post
        )
      );
    } catch (error) {
      handleFailure('Bad Request', error.message);
    }
  };

  const handleFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      const url = `http://localhost:1601/user/${userId}/${friendId}`;
      const headers = {
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setFriends(result.friendList);
    } catch (error) {
      handleFailure(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchFriends();
  }, []);

  return (
    <div className="postPage">
      <NavbarLogout user={user}/>
      <div className="posts">
        <Postcard
          posts={posts}
          handleLike={handleLike}
          handleFriend={handleFriend}
          friends={friends}
        />
      </div>
      <Toaster richColors />
    </div>
  );
}

export default Posts;
