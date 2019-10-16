import React from 'react'
import { Link } from "@reach/router";

import './menu.css'

class Nav extends React.Component {
    render() {
        return (
        <nav className="menu-container" id="menu-container">
            <div className="menu-movile">
                <button>
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <div className="menu-desktop">
                <div className="leftSide">
                    <h1>SaveUp</h1>
                    <Link className='link' to='#'>Listas</Link>
                    <Link className='link' to='search'>productos</Link>
                </div>
                <div className="rightSide">
                    <Link className='link' to='defualt'>juliocefe</Link>
                    <Link className='link' to='#'>logout</Link>
                </div>
            </div>
        </nav>
        )
        
    }

    componentDidMount() {
        document.querySelector('.menu-movile button').addEventListener('click', e=>{
            e.preventDefault()
            let menu = document.querySelector('.menu-desktop')
            if(menu.classList.contains('active')){
                menu.classList.remove('active')
                // document.querySelector('body').style.overflow = 'visible'
            } else {
                menu.classList.add('active')
                // document.querySelector('body').style.overflow = 'hidden'

            }
        })
        // document.querySelector('.layout').addEventListener('click', e=> {
        //     document.querySelector('.menu-desktop').classList.remove('active')
        // })
    }
}



export default Nav
