import React, {useEffect, useContext , useState } from 'react'
import { Link, navigate } from "@reach/router";
import { Context } from './../../Context'

import './menu.css'

export const Nav = ()=> {
    const { logOut, history }= useContext(Context)

    const handleNavigate = route=>e=>{
        e.preventDefault()
        document.querySelector('.menu-desktop').classList.remove('active')
        setTimeout(() => {
            navigate(route)
        }, 315);
    }
    console.log('RENDEREING NAV')
    useEffect(()=> {
    document.querySelector('.menu-movile button').addEventListener('click', e=>{
        e.preventDefault()
        let menu = document.querySelector('.menu-desktop')
        if(menu.classList.contains('active'))
            menu.classList.remove('active')
        else 
            menu.classList.add('active')
        })
    },[])
    
    return <nav className="menu-container" id="menu-container">
                <div className="menu-movile">
                    <button>
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <div className="menu-desktop">
                    <div className="leftSide">
                        <Link className="header" to='' onClick={handleNavigate('/dashboard')}>SaveUp</Link>
                        <Link  to='' className='link disable'>Favoritos</Link>
                        <Link to='' onClick={handleNavigate('/search')} className='link'>productos</Link>
                    </div>
                    <div className="rightSide">
                        <Link onClick={e => e.preventDefault()} className='link' to='defualt'>{ window.sessionStorage.getItem('username') }</Link>
                        <button className='link' onClick={()=>{
                                logOut()
                            }}>logout</button>
                    </div>
                </div>
            </nav>
        

}

export default Nav
