import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { account } from '../appwriteConfig'
import { ID } from 'appwrite'

const RegisterPage = () => {
  const [credentials,setCredentials] = useState({
    name:'',
    email:'',
    password1: '',
    password2: ''
  })

  const handleRegister = async (e,credentials) => {
    e.preventDefault()
    if (credentials.password1 !== credentials.password2){
      alert('The passwords doesnt match!')
      return 
    }

    try{
      let resposne = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      )
      console.log('resgistered:',resposne)
    }catch(error){
      console.error(error)
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
            className='btn btn--lg btn--main' 
            type="submit" 
            value='Login' 
          />
        </div>

      </form>

      <p>Already have an account yet? Register <Link to='/login'>here</Link></p>
    </div>
  </div>
  )
}

export default RegisterPage
