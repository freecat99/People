import React from 'react'
import { useNavigate } from 'react-router-dom';

function Postcard({ posts, handleLike, handleFriend, friends }) {
  const navigate = useNavigate();

  return (
    <div className="postContainer">
      {posts.map((post) => {
        const token = localStorage.getItem('token');
        const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const userId = payload?.id;

        const isLiked = post.likes && post.likes[userId];
        const isFriend = friends?.includes(post.userId); 

        return (
          <div className="postCard" key={post._id}>
            <div className="cardTop">
              <div>
                <img
                  src={`http://localhost:1601/assets/${post.userPicturePath}`}
                  alt="avatar"
                />
                <a
                  href="#"
                  className="userlink"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/profile/${post.userId}`);
                  }}
                >
                  <span className="username">
                    <p>{post.firstName}</p>
                  </span>
                </a>
              </div>

              {userId !== post.userId && (
                <button
                  className="toggleFriend"
                  onClick={() => handleFriend(post.userId)}
                >
                  {isFriend ? 'Remove Friend' : 'Add Friend'}
                </button>
              )}
            </div>

            <div className="cardMid">
              <p className="description">{post.description}</p>
              {post.picturePath && (
                <img
                  src={`http://localhost:1601/assets/${post.picturePath}`}
                  alt="post"
                />
              )}
            </div>

            <div className="cardBottom">
              <div className="likes">
                <div onClick={() => handleLike(post._id)}>
                  {isLiked ? 'Unlike' : 'Like'}
                </div>
                <span>{Object.keys(post.likes).length}</span>
              </div>

              <ul>
                <legend>Comments</legend>
                {post.comments.map((comment, i) => (
                  <li key={i}>{comment}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Postcard;
