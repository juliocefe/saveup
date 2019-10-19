import React, {useContext} from 'react'
import { Context } from './../../Context'
import { useInputValue } from './../../hooks/useInputValue'

import { Container, LoginBox, BackButton } from './styles'

export const NewUser = ()=>{
    const { activateAuth }  = useContext(Context)
    const email = useInputValue('')
    const username = useInputValue('')
    const password1 = useInputValue('')
    const password2 = useInputValue('')
    const name = useInputValue('')
    const lastname = useInputValue('')

    const handleSubmit = (event) =>{
        event.preventDefault()
        fetch("/users/newUser",{
            method: 'POST',
            body: JSON.stringify(
                {
                    username: username.value, 
                    password1: password1.value,
                    password2: password2.value,
                    name: name.value,
                    lastname: lastname.value,
                }),
            headers: new Headers({
                "content-type": "application/json",
                // El metodo login de la API me pide una atorizaicón tipo básica
                // btoa me crea un codigo base64.
                "Authorization": "Basic "+btoa(`${username.value}:${password1.value}`)
            })
    }).then(function(response){
            response.json().then(function(data){
                activateAuth({"token": data.token, "username": data.username })
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
                });
        })
    }

    return(
        <Container>
            <LoginBox>  
            <h1>Registrarse</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name">Nombre</label>
                            <input id="name" className='form-control' {...name}/>
                        </div>
                        <div className="col">
                            <label htmlFor="lastame">Apellidos</label>
                            <input id="lastname" className='form-control' {...lastname}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usernmae">Nombre de Usuario</label>
                        <input id="usernmae" className='form-control' {...username} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electronico</label>
                        <input id="email" className='form-control' {...email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Contraseña</label>
                        <input type="password" id="password1" className='form-control' {...password1}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Repita su contraseña</label>
                        <input type="password" id="password1"  className='form-control' {...password2}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">
                            Registrarse
                        </button>
                    </div>
                </form>  
                <BackButton to="/login"><i class="fas fa-backspace"></i></BackButton>
            </LoginBox>

        </Container>
    );
}