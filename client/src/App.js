import React, { useState, useEffect } from 'react';
import {  Route } from 'react-router-dom';
import axios from 'axios';

import { UsersContext } from './contexts/UsersContext';

import './App.css';

import Header from './components/Header';
import Home from  './components/Home';
import UsersList from './components/UsersList';
import User from './components/User';


function App() {

  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/users')
    .then(response => {
      console.log(response);
      setUsers(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  const updateUsers = () => {
    axios.get('http://localhost:9000/users')
    .then(response => {
      console.log(response);
      setUsers(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="App">
      <Header />
      
      <UsersContext.Provider value={{users: users, updateUsers: updateUsers}}>
        <Route exact path='/' component={Home} />
        <Route exact path='/users' component={UsersList} />
        <Route path ='/users/:id' component={User} />
      </UsersContext.Provider>

    </div>
  );
}

export default App;
