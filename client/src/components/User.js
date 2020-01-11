import React, { useState, useEffect, useContext } from 'react';
import { UsersContext } from '../contexts/UsersContext';
import axios from 'axios';

import Quill from '../images/quill.png';
import GreenCheck from '../images/GreenCheck.png';

const User = (props) => {
    const { users } = useContext(UsersContext);
    const [user, setUser] = useState({name: '', id:''});
    const [posts, setPosts] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(user.name || 'holder');
    const id = props.match.params.id;
    
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    }
    
    const handleEditChange = e => {
        setEditedName(e.target.value);
    }

    const handleEditSubmit = e => {
        e.preventDefault();
        console.log('time to edit');
        axios.put(`http://localhost:9000/users/${id}`, {"name": editedName, "id": user.id})
            .then(response => {
                console.log(response);
                setUser(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        setIsEditing(!isEditing);
        setEditedName(user.name);
    }

    useEffect(() => {
        if (users) {
            const winner = users.find(user => Number(user.id) === Number(id));
            setUser({...user, name: winner.name, id: winner.id} );
            setEditedName(winner.name);
            
            axios.get(`http://localhost:9000/users/${id}/posts`)
                .then(response => {
                    console.log(response);
                    setPosts(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [users]);

    return (
        <div className='user-box'>
            <div className='name-box'>
                {!isEditing && user && <h2>{user.name}</h2>}
                {isEditing && <form className='edit-form' onSubmit={handleEditSubmit}>
                        <input type='text' name='name' id='name' onChange={handleEditChange} value={editedName}/>
                        <button type='submit'>
                                <img src={GreenCheck} />
                        </button>
                    </form>}
                {!isEditing && <div className='icon-container' onClick={toggleEdit}>
                    <img src={Quill} alt='edit' />
                </div>}
            </div>
            <div className='posts-box'>
                {posts && posts.map(post => <p key={post.id}>"{post.text}"</p>)}
            </div>
        </div>
    )
}

export default User;
