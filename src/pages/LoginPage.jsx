import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../appwriteConfig'

const LoginPage = () => {
  const [user,setUser ] = useState(null)
  // const userCheck = useSelector((state) => state.auth.accountDetails)
  // console.log('here',userCheck)

  const dispatch = useDispatch() 
  const navigateTo = useNavigate()

  const [credentials,setCredentials] = useState({
    email:'',
    password: ''
  })

  useEffect(() => {
    getUserOnLoad();
    // getUserOnLoad()

    // const checkSession = async () => {
    //   try{
    //     const accountDetails = await account.get();
    //     if( accountDetails.$id){
    //       setUser(accountDetails);
    //       navigateTo('/');
    //       console.log(accountDetails)
    //       console.log('user logged in')
    //     }
    //   }catch(error){
    //     console.error(error)
    //   }
    // }
    // checkSession();
    
  },[])

  const getUserOnLoad =  async () => {
    try{
      const accountDetails = await account.get(); // gives the correct logged in user details
      console.log('id',accountDetails.$id)
      if (accountDetails.$id){
        dispatch(login(accountDetails))
        navigateTo('/');
      }
      setUser(accountDetails)
    }catch(error){
      if (error?.message === 'User (role: guests) missing scope (account)'){
        console.log('User not logged in')
      }
    }
  }

  const handleLogin = async (e, credentials) => {
    e.preventDefault()

    try {
      const response = await account.createEmailSession(credentials.email, credentials.password);
      console.log('handlelogin resp:',response)
      // console.log('id',response.$id)
      
      localStorage.setItem('authId', response.$id) // using local storage to persist the user
      
      
      const accountDetails = await account.get();

      dispatch(login(accountDetails)) // we pass the response to the login action in order to get the accountDetails
      setUser(accountDetails)
      navigateTo('/')
      console.log('user',user)

    } catch(error){ 
      console.error(error)
    }  
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value

    setCredentials({...credentials, [name]:value})
  }

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

        <p>Dont have an account yet? Register <Link to='/register'>here</Link></p>
      </div>
    </div>
  )
}

export default LoginPage
