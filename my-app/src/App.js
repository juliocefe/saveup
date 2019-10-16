import React from 'react';

import { Router } from '@reach/router'

import Nav from './components/Nav';
import { Login } from './components/Login/login.js';
import { Search }  from './components/Search'
import { GlobalStyle } from './styles/GlobalStyles'
import { NewUser } from './components/NewUser'
import Context  from './Context'


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Context.Consumer>
        {
          ({ isAuth }) =>
            isAuth
              ? <div>
                <Nav/>
                <Router>
                  <Search path='search'/>
                  <NewUser path='newUser'/>
                </Router>
              </div>
              : <Router>
                  <Login default/>
              </Router>
        }
      </Context.Consumer>
    </div>
  );
}

export default App;
