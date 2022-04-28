import React, { useContext } from "react";
import "./login.css";
import logo from "./../../images/money-bag.svg";
import { Logo } from "./../Logo/index";
import { Link } from "@reach/router";

import { useInputValue } from "./../../hooks/useInputValue";
import { Context } from "./../../Context";

export const Login = () => {
  const { activateAuth } = useContext(Context);
  const username = useInputValue("");
  const password = useInputValue("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        headers: new Headers({
          "content-type": "application/json",
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        activateAuth({ token: data.token, username: data.username });
      } else {
        alert("usuario o contrasena incorrectos.");
      }
    } catch (error) {
      console.log("Fetch Error :-S", error);
    }
  };
  return (
    <div className="main">
      <Logo />
      <div className="login-container">
        <img src={logo} alt="logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="nombre de usuario"
              {...username}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              {...password}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block mt-5">
              Iniciar sesión
            </button>
          </div>
          <p className="mt-4 d-inline mr-2">No tienes una cuenta Aún?</p>
          <Link to="newUser">Registrate aquí.</Link>
        </form>
      </div>
    </div>
  );
};
