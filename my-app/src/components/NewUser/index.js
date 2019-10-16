import React from 'react'

import { Container, LoginBox } from './styles'

export const NewUser = ()=>{
    return(
        <Container>
            <LoginBox>  
            <h1>Registrarse</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input className='form-control' name="name" id="name" type="text" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastame">Apellidos</label>
                        <input className='form-control' name="lastame" id="lastame" type="text" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usernmae">Nombre de Usuario</label>
                        <input className='form-control' name="username" id="usernmae" type="text" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input className='form-control' name="password" id="password" type="password" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Repita su contraseña</label>
                        <input className='form-control' name="password2" id="password2" type="password"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">
                            Registrarse
                        </button>
                    </div>
                </form>  
            </LoginBox>

        </Container>
    );
}