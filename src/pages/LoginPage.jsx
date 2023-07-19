import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch() 
  const navigateTo = useNavigate()

  //! new code
  const [credentials,setCredentials] = useState({
    email:'',
    password: ''
  })

  const handleLogin = async (e, credentials) => {
    // e.preventDefault()

    try {

    } catch(error){
      console.error(error)
    }
    dispatch(login());
    navigateTo('/')
  }

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value

    setCredentials({...credentials, [name]:value})
  }

  // useEffect(() => {
  //   console.log(credentials);
  // }, [credentials])

  return (
    <div className='auth--container'>
      <div className="form--wrapper">
        <form action="" onSubmit={(e) => handleLogin(e,credentials)}>

          <div className="field--wrapper">
            <label htmlFor="">Email:</label>
            <input 
              type="email" 
              required
              name='email'
              placeholder='Enter Your Email...'
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="">Password:</label>
            <input 
              type="password" 
              required
              name='password'
              placeholder='Enter Your Password...'
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <input 
              className='btn btn--lg btn--main' 
              type="submit" 
              value='Login' 
            />
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage
