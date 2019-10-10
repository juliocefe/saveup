
import React from 'react';
import './styles/login.css'
import logo from './images/money-bag.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
class Login extends React.Component {
    render(){
        return(
            <div className="main">
                <div className="login-container">
                    <img src={logo} alt='logo'/>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" 
                            placeholder="nombre de usuario" name="username" required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control"
                            placeholder="Contraseña" name="password" required/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block mt-5">
                                Iniciar sesión
                            </button>
                        </div>
                        <button type="button" className="btn btn-default" aria-label="Left Align">
                        <span className="glyphicon glyphicon-apple" aria-hidden="true"></span>
                        </button>
                    
                        <p className="mt-4 d-inline mr-2">
                            No tienes una cuenta Aún?
                        </p>
                        <a href="#">Registrate aquí.</a>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default Login
