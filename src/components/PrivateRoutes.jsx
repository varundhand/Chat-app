import React from 'react'
import { Outlet,Navigate } from 'react-router-dom' // Outlet component is used within parent route to render child route i.e. allows 'nested child routes'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const PrivateRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  console.log(isAuthenticated)
  
  if (!isAuthenticated ){
    return <Navigate to='/login'/>
  }

  // const user = false
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default PrivateRoutes
