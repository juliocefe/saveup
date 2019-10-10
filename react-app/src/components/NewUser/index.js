import React from 'react'

import { Container, LoginBox } from './styles'

import { Logo } from './../Logo/index'

export const NewUser = ()=>{
    return(
        <Container>
            <LoginBox>  
                <Logo/>
                <form>
                    <div className="form-group">
                        <label for="name">Nombre</label>
                        <input className='form-control' name="name" id="name" type="text" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label for="lastame">Apellidos</label>
                        <input className='form-control' name="lastame" id="lastame" type="text" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label for="usernmae">Nombre de Usuario</label>
                        <input className='form-control' name="username" id="usernmae" type="text" placeholder=""/>
                    </div>s
                    <div className="form-group">
                        <label for="password">Contraseña</label>
                        <input className='form-control' name="password" id="password" type="password" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label for="password">Repita su contraseña</label>
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