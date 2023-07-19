import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleLogin = () => {
    dispatch(login());
    navigateTo('/')
  }

  return (
    <div>
      LOGIN
      <button onClick={handleLogin}>okay</button>
    </div>
  )
}

export default LoginPage
