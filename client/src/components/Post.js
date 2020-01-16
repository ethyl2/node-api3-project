import React, { useState } from 'react';

import axios from 'axios';

import GreenCheck from '../images/GreenCheck.png';
import Quill from '../images/quill.png';
import DeleteX from '../images/DeleteX.png';

const Post = ({ id, text, handleDelete, userId }) => {
    const [post, setPost] = useState({"text": text, "id": id, "user_id": userId});
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({"text": text, "id": id, "user_id": userId});

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    }
    
    const handleEditChange = e => {
        setEditedPost({...editedPost, [e.target.name]: e.target.value});
    }

    const handleEditSubmit = e => {
        e.preventDefault();
        console.log('time to edit post. Body to submit: ', editedPost);
        
        axios.put(`http://localhost:9000/posts/${id}`, editedPost)
            .then(response => {
                console.log(response);
                setPost(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        setIsEditing(!isEditing);
    }

    return (
        <div>
            <div className='post-box'>
                <div className='icon-container' onClick={() => handleDelete(post.id)}>
                    <img src={DeleteX} alt='delete' />
                </div>

                <p>"{post.text}"</p>
                
                {!isEditing && <div className='icon-container' onClick={toggleEdit}>
                        <img src={Quill} alt='edit' />
                    </div>}
                
            </div>

            {isEditing && <form className='edit-post-form' onSubmit={handleEditSubmit}>
                                <input className='post'
                                    type='text'  
                                    name='text' 
                                    id='text' 
                                    onChange={handleEditChange} 
                                    value={editedPost.text}/>
                                <button type='submit'>
                                    <img src={GreenCheck} alt='submit post changes'/>
                                </button>
                        </form>}
        </div>  
    )

}

export default Post;