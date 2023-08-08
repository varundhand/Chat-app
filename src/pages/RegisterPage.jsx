import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../appwriteConfig'
import { ID } from 'appwrite'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [credentials,setCredentials] = useState({
    name:'',
    email:'',
    password1: '',
    password2: ''
  })
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const toastSettings = {
    duration: 2000,
    position: 'top-center'
  }

  const handleRegister = async (e,credentials) => {
    e.preventDefault()
    if (credentials.password1 !== credentials.password2){
      toast.error('The passwords doesnt match!',toastSettings)
      return 
    }

    try{
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      )
    await account.createEmailSession(credentials.email,credentials.password1)
    const accountDetails = await account.get(); // we need to create email session after creating the account
    dispatch(login(accountDetails))
    navigateTo('/')
    // toast.
    toast.success('Welcome aboard! Registration successful.',toastSettings)
      
    }catch(error){
      toast('Password must be at least 8 characters.',toastSettings)
    }
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    let name = e.target.name
    let value = e.target.value

    setCredentials({...credentials, [name]:value})
  }

  return (
    <div className='auth--container'>
    <div className="form--wrapper">
      <form action="" onSubmit={(e) => handleRegister(e,credentials)}>
        <div className="field--wrapper">
          <label htmlFor="">Name:</label>
          <input 
            type='text'
            required
            name='name'
            placeholder='Enter Your Username...'
            value={credentials.name}
            onChange={handleInputChange}
          />
        </div>
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
            name='password1'
            placeholder='Enter Your Password...'
            value={credentials.password1}
            onChange={handleInputChange}
          />
        </div>
        <div className="field--wrapper">
          <label htmlFor="">Confirm Password:</label>
          <input 
            type="password" 
            required
            name='password2'
            placeholder='Confirm your Password...'
            value={credentials.password2}
            onChange={handleInputChange}
          />
        </div>
        <div className="field--wrapper">
          <input 
            className='btn--auth btn--lg btn--main' 
            type="submit" 
            value='Register' 
          />
        </div>

      </form>

      <p>Already have an account yet? Login <Link to='/login'>here</Link></p>
    </div>
  </div>
  )
}

export default RegisterPage
