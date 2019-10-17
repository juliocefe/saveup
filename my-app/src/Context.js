import React, { createContext, useState } from 'react'
export const Context = createContext()

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(()=>{
    return window.sessionStorage.getItem('token')
  })

  const value = {
    isAuth,
    activateAuth: ({token, username}) => {
      window.sessionStorage.setItem('token',token)
      window.sessionStorage.setItem('username',username)
      setIsAuth(true)
    },
    logOut: ()=>{
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('username')
      window.location.href = '/'
    }
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Consumer: Context.Consumer
}