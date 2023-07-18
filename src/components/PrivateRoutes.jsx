import React from 'react'
import { Outlet,Navigate } from 'react-router-dom' // Outlet component is used within parent route to render child route i.e. allows 'nested child routes'

const PrivateRoutes = () => {
  const user = false
  return (
    <div>
      {user ? <Outlet/> :<Navigate to='/login' />}
    </div>
  )
}

export default PrivateRoutes
