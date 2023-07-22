import React from 'react'
import { LogOut } from 'react-feather'
import { useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector((state) => state.auth.accountDetails)
  console.log(user)
  return (
    <div id='header--wrapper'>
      {user ? (
        <>
          Welcome {user.name} 🤠
          <LogOut className='header--link'/>
        </>
      ):(
        <button>Login</button>
      )}
    </div>
  )
}

export default Header

