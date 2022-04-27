import React, { useEffect, useContext } from "react";
import { Link } from "@reach/router";
import { Context } from "./../../Context";

import "./menu.css";

export const Nav = () => {
  const { logOut } = useContext(Context);
  useEffect(() => {
    document
      .querySelector(".menu-movile button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        let menu = document.querySelector(".menu-desktop");
        if (menu.classList.contains("active")) menu.classList.remove("active");
        else menu.classList.add("active");
      });
  }, []);
  return (
    <nav className="menu-container" id="menu-container">
      <div className="menu-movile">
        <button>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="menu-desktop">
        <div className="leftSide">
          <Link className="header" to="dashboard">
            SaveUp
          </Link>
          <Link
            onClick={(e) => e.preventDefault()}
            className="link disable"
            to="#"
          >
            Listas
          </Link>
          <Link className="link" to="search">
            productos
          </Link>
        </div>
        <div className="rightSide">
          <Link
            onClick={(e) => e.preventDefault()}
            className="link"
            to="defualt"
          >
            {window.sessionStorage.getItem("username")}
          </Link>
          <button
            className="link"
            onClick={() => {
              logOut();
            }}
          >
            logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
