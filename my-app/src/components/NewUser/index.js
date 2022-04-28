import React, { useContext } from "react";
import { Context } from "./../../Context";
import { useInputValue } from "./../../hooks/useInputValue";

import { Container, LoginBox } from "./styles";

export const NewUser = () => {
  const { activateAuth } = useContext(Context);
  const username = useInputValue("");
  const password1 = useInputValue("");
  const password2 = useInputValue("");
  const name = useInputValue("");
  const lastname = useInputValue("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/users/newUser", {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password1: password1.value,
          password2: password2.value,
          name: name.value,
          lastname: lastname.value,
        }),
        headers: new Headers({
          "content-type": "application/json",
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        activateAuth({ token: data.token, username: data.username });
      } else {
        alert(data);
      }
    } catch (error) {
      console.log("Fetch Error :-S", error);
    }
  };

  return (
    <Container>
      <LoginBox>
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input className="form-control" {...name} />
          </div>
          <div className="form-group">
            <label htmlFor="lastame">Apellidos</label>
            <input className="form-control" {...lastname} />
          </div>
          <div className="form-group">
            <label htmlFor="usernmae">Nombre de Usuario</label>
            <input className="form-control" {...username} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" className="form-control" {...password1} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Repita su contraseña</label>
            <input type="password" className="form-control" {...password2} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block">Registrarse</button>
          </div>
        </form>
      </LoginBox>
    </Container>
  );
};
