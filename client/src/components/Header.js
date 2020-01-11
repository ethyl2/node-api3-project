import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to='/'><h1>Hobbit Blog</h1></Link>
            <nav>
                <Link to='/'>Home</Link>
            </nav>
        </header>
    )
}

export default Header;