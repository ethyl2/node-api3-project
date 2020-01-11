import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UsersContext } from '../contexts/UsersContext';

const UsersList = () => {
    const users = useContext(UsersContext);

    return (
        <div className='users-box'>
            {users && users.map(user => <Link to={`/users/${user.id}`}><div key={user.id}><h3>{user.name}</h3></div></Link>)}
        </div>
    )
}

export default UsersList;