import React from 'react';
import Login from './components/Login/login.js';

import { Router } from '@reach/router'

import Nav from './components/Nav';
import { Search }  from './components/Search'
import { GlobalStyle } from './styles/GlobalStyles'
import { NewUser } from './components/NewUser'
import { Context } from './Context'


import 'bootstrap/dist/css/bootstrap.min.css';

const UserLogged = ({ children }) => {
  return children({ isAuth: true })
}

function App() {
  return (
    <div>
      <GlobalStyle />
      <UserLogged>
      {
        ({ isAuth }) =>
        isAuth ?
        <div>
          <Nav/>
          <Router>
            <Search path='search'/>
            <NewUser path='newUser'/>
          </Router>
        </div>
        : 
        <Router>
          <Login default/>
        </Router>
      }
      </UserLogged>
    </div>
  );
}

export default App;
