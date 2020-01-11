import React from 'react';

//import axios from 'axios';

//import GreenCheck from '../images/GreenCheck.png';
import DeleteX from '../images/DeleteX.png';

const Post = ({ id, text, handleDelete }) => {
    return (
        <div className='post-box' key={id}>
            <div className='icon-container' onClick={() => handleDelete(id)}>
                <img src={DeleteX} alt='delete' />
            </div>
            <p key={id}>"{text}"</p>
            
    </div>
    )

}

export default Post;