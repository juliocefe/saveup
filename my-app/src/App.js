import React, { useContext } from "react";

import { Router } from "@reach/router";

import Nav from "./components/Nav";
import { Login } from "./components/Login/login.js";
import { Search } from "./components/Search";
import { GlobalStyle } from "./styles/GlobalStyles";
import { NewUser } from "./components/NewUser";
import { Dashboard } from "./components/Dashboard";
import { Context } from "./Context";

import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

function App() {
  const { isAuth } = useContext(Context);
  return (
    <div>
      <GlobalStyle />
      {isAuth ? (
        <div>
          <Nav />
          <Router>
            <Dashboard default path="dashboard" />
            <Search path="search" />
          </Router>
        </div>
      ) : (
        <Router>
          <Login default />
          <NewUser path="newUser" />
        </Router>
      )}
    </div>
  );
}

export default App;
