import React, { useState } from 'react'
import { handleDefault, handleFailure, handleSuccess } from '../utils';

function Create({isPostRefresh}) {

    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const name = payload.name;
    const profilePhoto = payload.photo;
    const [postinfo, setPostinfo] = useState({
      userId: '',
      description : '',
      picturePath : ''
    })

    const handleChange = (e) =>{
      const {name, value} = e.target;
      let copyPostinfo = {...postinfo};
      copyPostinfo[name] = String(value);
      setPostinfo(copyPostinfo);
    }

    const handleSubmit = async(e) =>{
      e.preventDefault();
      if(postinfo.description==='' || postinfo.picturePath===''){
        return handleDefault('write and upload photo to post! ;)')
      }

      try {
        
        const formData = new FormData();
        
        // Append state fields
        for (const key in postinfo) {
          formData.append(key, postinfo[key]);
        }
        const fileInput = document.getElementById("picturePath");
        
        if (fileInput && fileInput.files[0]) {
          formData.append("picturePath", fileInput.files[0]);
        }
        
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;
        formData.set('userId', userId);

        const url = 'http://localhost:1601/posts/upload';
        const headers = {
          method: 'POST',
          headers:{
            'Authorization': token,
          },
          body : formData
        }

        const response = await fetch(url, headers);
        const result = await response.json();

        if(result.success){
          handleSuccess('your post in online!');
          isPostRefresh();
          document.getElementById('description').value = '';
          document.getElementById('picturePath').value = '';
        }else{
          handleDefault('unable to post, retry :(')
        }



      } catch (error) {
        handleFailure(error.message);
      }
    
    }


  return ( 
    <div className='create'>
      <form className="createPost" encType='multipart/form-data' onSubmit={handleSubmit}>
        <div>
            <img className='imgContainer' src={`http://localhost:1601/assets/${profilePhoto}`} alt="photu" />   

            <input type="text" name="description" id="description" placeholder="What's on your mind?" onChange={handleChange}/>
        </div>
        <div>
            <input type="file" name="picturePath" id="picturePath" placeholder='image' onChange={handleChange}/>
            <button type='submit'>Post</button>
        </div>
      </form>
    </div>
  )
}

export default Create
