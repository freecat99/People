import React from 'react'

function Create() {

    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const name = payload.name;
    const profilePhoto = payload.photo;

  return (
    <div className='create'>
      <div className="createPost">
        <div>
            <img className='imgContainer' src={`http://localhost:1601/assets/${profilePhoto}`} alt="photu" />   

            <input type="text" name="" id="" placeholder="What's on your mind?"/>
        </div>
        <div>
            <label htmlFor="postPicture" className='fileLabel'>Upload </label>
            <input type="file" name="postPicture" id="postPicture" placeholder='image'/>
            <button>Post</button>
        </div>
      </div>
    </div>
  )
}

export default Create
