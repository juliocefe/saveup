import React from 'react';
import './login.css'
import logo from './../../images/money-bag.svg'
import { Logo } from './../Logo/index'
import {  Link } from '@reach/router'

import { useInputValue } from './../../hooks/useInputValue'
import Context from './../../Context'

export const Login = () => {
    const username = useInputValue('')
    const password = useInputValue('')
    
    const handleSubmit = (toDo,event) =>{
        event.preventDefault()

        fetch("/auth/login",{
            method: 'POST',
            body: JSON.stringify({username: "juliocefe", password:123}),
            headers: new Headers({
                "content-type": "application/json",
                // El metodo login de la API me pide una atorizaicón tipo básica
                // btoa me crea un codigo base64.
                "Authorization": "Basic "+btoa(username.value+":"+password.value)
            })
    
        }).then(function(response){
            response.json().then(function(data){
                window.sessionStorage.setItem('token',data.token)
                toDo()
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
                });
        })
    }
        return(
            <Context.Consumer>
            {
                ({ isAuth, activateAuth })=>{
                    return <div className="main">
                        <Logo/>
                        <div className="login-container">
                            <img src={logo} alt='logo'/>
                            <form onSubmit={(e)=>{
                                return handleSubmit(activateAuth, e)
                            }}>
                                <div className="form-group">
                                    <input className="form-control" 
                                    placeholder="nombre de usuario" {...username} required/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control"
                                    placeholder="Contraseña" {...password} required/>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block mt-5">
                                        Iniciar sesión
                                    </button>
                                </div>
                                <p className="mt-4 d-inline mr-2">
                                    No tienes una cuenta Aún?
                                </p>
                                <Link to="newUser">Registrate aquí.</Link>
                            </form>
                        </div>
                    </div>
                }
            }
            </Context.Consumer>
        );
}

