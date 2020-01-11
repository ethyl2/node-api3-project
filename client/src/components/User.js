import React, { useState, useEffect, useContext } from 'react';
import { UsersContext } from '../contexts/UsersContext';
import axios from 'axios';

const User = (props) => {
    const users = useContext(UsersContext);
    const [user, setUser] = useState({name: '', id:''});
    const [posts, setPosts] = useState();
    const id = props.match.params.id;
    
    
    useEffect(() => {
        if (users) {
            const winner = users.find(user => Number(user.id) === Number(id));
            setUser({...user, name: winner.name, id: winner.id} );
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
            {user && <h2>{user.name}</h2>}
            <div className='posts-box'>
                {posts && posts.map(post => <p key={post.id}>"{post.text}"</p>)}
            </div>
        </div>
    )
}

export default User;
