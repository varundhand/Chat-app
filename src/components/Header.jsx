import React from 'react'
import { LogOut } from 'react-feather'
import { useSelector } from 'react-redux'
import { account } from '../appwriteConfig'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { toast } from 'react-hot-toast'

const Header = () => {
  const user = useSelector((state) => state.auth.accountDetails)
  const dispatch = useDispatch()
  // console.log('header user',user)

  const handleLogout = async () => {
    await account.deleteSession('current')
    dispatch(logout())
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('accountDetails');
    toast('You have successfully logged out! ')
  }

  return (
    <div id='header--wrapper'>
      {user ? (
        <>
          Howdy {user.name} 🤠
          <LogOut onClick={handleLogout} className='header--link'/>
        </>
      ):(
        <button>Login</button>
      )}
    </div>
  )
}

export default Header

