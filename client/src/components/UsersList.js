import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { UsersContext } from '../contexts/UsersContext';

import DeleteX from '../images/DeleteX.png';
import Plus from '../images/Plus.png';
import GreenCheck from '../images/GreenCheck.png';

const UsersList = () => {
    const { users, updateUsers } = useContext(UsersContext);

    const [isAdding, setIsAdding] = useState(false);
    const [addedName, setAddedName] = useState('');

    const handleAddChange = e => {
        setAddedName(e.target.value);
    }

    const handleAddSubmit = e => {
        e.preventDefault();
        setIsAdding(!isAdding);
        axios.post('http://localhost:9000/users', {"name": addedName})
            .then(response => {
                console.log(response);
                updateUsers();
            })
            .catch(err => {
                console.log(err);
            })

    }
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

    const toggleAdd = () => {
        setIsAdding(!isAdding);
    }

    return (

        <div className='users-box'>
            {!isAdding && 
            <button onClick={toggleAdd}>
                <div className='icon-container'>
                    <img src={Plus} alt='add' />
                </div>
            </button>
            }

            {isAdding && <form className='add-form' onSubmit={handleAddSubmit}>
                        <input type='text' name='name' id='name' onChange={handleAddChange} value={addedName}/>
                        <button type='submit'>
                                <img src={GreenCheck} alt='submit new user'/>
                        </button>
                    </form>}

            {users && <div className='inner-users-box'>
                {users.map(user => {
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
            </div>}
            </div>
    )
}

export default UsersList;