import React from 'react'
import { Outlet,Navigate } from 'react-router-dom' // Outlet component is used within parent route to render child route i.e. allows 'nested child routes'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {
  // const dispatch = useDispatch()
  // const navigateTo = useNavigate()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const accountDetails = useSelector((state) => state.auth.accountDetails)
  // console.log('pvt routes:',accountDetails)
  
  // useEffect(() => {
  //   const authId = localStorage.getItem('authId')
  //   console.log(authId)
  //   if (authId) {
      // console.log('in here ')
  //     dispatch(login())
  //     navigateTo('/')
  //   }
  // },[dispatch])

  
  if (!isAuthenticated ){
    return <Navigate to='/login'/>
  }

  // const user = false
  return (
    <div>
      <Outlet accountDetails={accountDetails}/>
    </div>
  )
}

export default PrivateRoutes
