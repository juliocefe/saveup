import React, { useState } from 'react'
import { createPortal } from 'react-dom';

import { ModalStyle, ButtonSelect } from './styles'
import 'animate.css/animate.min.css';

export const Modal = (props) => {
        const [ listToSelect, setListToSelect ] = useState(false)
        return(
            createPortal(
                <ModalStyle className="animated bounceInDown" id="myModalDeleter">
                    <div>
                        <h1>Listas generadas</h1>
                        <div  className="listasGeneradas">
                        {
                            props.generatedList.map(list=>{
                                return(
                                    <div key={list.idCompany}>
                                        <button onClick={()=>{
                                              setListToSelect(list)  
                                        }}>
                                            <p>{list.company}</p>
                                            <p>Total: ${list.Total}</p>
                                        </button>
                                     </div>
                                );
                            })
                        }

                        </div>
                        <ButtonSelect>
                                <button onClick={()=>{
                                    props.setGeneratedList({
                                        data:listToSelect,
                                        goToBuy: true
                                    })
                                }}
                                className="btn btn-success"
                                 disabled={listToSelect===false}>Seleccionar</button>
                        </ButtonSelect>

                    </div>
                </ModalStyle>
                ,
                document.getElementById('root-modal')
            )

        )

}



