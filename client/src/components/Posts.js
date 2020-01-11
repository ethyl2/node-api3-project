import React, { useContext, useState, useEffect } from 'react';
import { UsersContext } from '../contexts/UsersContext';
import axios from 'axios';

import Post from './Post';

import GreenCheck from '../images/GreenCheck.png';
import Plus from '../images/Plus.png';

const Posts = ( { id }) => {
    const { users } = useContext(UsersContext);
    const [posts, setPosts] = useState();

    const [isAddingPost, setIsAddingPost] = useState(false);
    const [newPost, setNewPost ] = useState('');

    const toggleAdd = () => {
        setIsAddingPost(!isAddingPost);
    }

    const handleAddChange = e => {
        setNewPost(e.target.value);
    }

    const handleAddSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:9000/users/${id}/posts`, {"text": newPost})
        .then(response => {
            console.log(response);
            setPosts([...posts, response.data]);
        })
        .catch(err => {
            console.log(err);
        });
        setIsAddingPost(!isAddingPost);
        setNewPost('');
    }

    const handleDelete = postId => {
        console.log('Time to delete post of id ', postId);
        axios.delete(`http://localhost:9000/posts/${postId}`)
        .then(response => {
            console.log(response);
            setPosts(posts.filter(post => Number(post.id) !== Number(postId)));
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    useEffect(() => {
        if (users) {
            const winner = users.find(user => Number(user.id) === Number(id));
            
            axios.get(`http://localhost:9000/users/${winner.id}/posts`)
                .then(response => {
                    console.log(response);
                    setPosts(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [users, id]);

    return (
        <div className='posts-box'>
                <button onClick={toggleAdd}>
                    <div className='icon-container'>
                        <img src={Plus} alt='add' />
                    </div>
                </button>

                {isAddingPost && 
                    <form className='add-post-form' onSubmit={handleAddSubmit}>
                    <textarea name='text' id='text' onChange={handleAddChange} value={newPost}/>
                    <button type='submit'>
                            <img src={GreenCheck} alt='submit post'/>
                    </button>
                </form>
                }
                {posts && posts.map(post => <Post key={post.id} id={post.id} text={post.text} handleDelete={handleDelete} />)}
            </div>
    )
}

export default Posts;