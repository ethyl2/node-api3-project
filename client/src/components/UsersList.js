import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { UsersContext } from '../contexts/UsersContext';

import DeleteX from '../images/DeleteX.png';

const UsersList = () => {
    const { users, updateUsers } = useContext(UsersContext);

    const handleDelete = id => {
        console.log('time to delete', id)
        axios.delete(`http://localhost:9000/users/${id}`)
            .then(response => {
                console.log(response);
                updateUsers();
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    const handleMouseEnter = id => {
        console.log('time to hover');
        const name = document.getElementById(`name${id}`);
        name.style.textDecoration = 'line-through';
    }

    const handleMouseLeave = id => {
        const name = document.getElementById(`name${id}`);
        name.style.textDecoration = 'none';
    }

    return (

        <div className='users-box'>
            {users && users.map(user => {
                return (
                
                    <div key={user.id} className='user-name-box'>
                        <div className='icon-container' 
                            onClick={() => handleDelete(user.id)} 
                            onMouseEnter={() => handleMouseEnter(user.id)}
                            onMouseLeave={() => handleMouseLeave(user.id)}
                            >
                            <img src={DeleteX} alt='delete' />
                        </div>
                        <Link  to={`/users/${user.id}`}>
                        <h2 id={`name${user.id}`}>{user.name}</h2>
                        </Link>
                        
                    </div>
                )}
            )}
            </div>
    )
}

export default UsersList;