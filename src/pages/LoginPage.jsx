import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../appwriteConfig'
import toast from 'react-hot-toast';
import Footer from '../components/Footer'

const LoginPage = () => {
  const [user,setUser ] = useState(null)
  // const [showNotification, setShowNotification] = useState(false)
  const [credentials,setCredentials] = useState({
    email:'',
    password: ''
  })

  // const userCheck = useSelector((state) => state.auth.accountDetails)
  // console.log('here',userCheck)

  // toast notification 
//   const SuccessNotify = () =>{
//     toast.success('Clicked me!', {
//     duration: 2000,
//     position: 'top-center'
//   })
//   console.log('now here')
// }

  // useEffect(() => {
  //   console.log('in here')
  //   const timer = setTimeout(() => {
  //     SuccessNotify()
  //   }, 2000);

  //   return () => clearTimeout(timer) // cleanup timer on unmount
  // },[showNotification])

  // console.log(showNotification)
  const dispatch = useDispatch() 
  const navigateTo = useNavigate()

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
        console.log('User not Logged in')
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
      // setShowNotification(true)
      // console.log('user',user)
      toast.success('You have successfully logged in!', {
        duration: 2000,
        position: 'top-center'
      });

    } catch(error){ 
      toast.error('Invalid credentials. Please try again.',{
        duration: 2000,
        position: 'top-center'
      })
    }  
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value

    setCredentials({...credentials, [name]:value})
  }

  return (
    <>
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
              className='btn--auth btn--lg btn--main' 
              type="submit" 
              value='Login' 
            />
          </div>

        </form>

        <p>Dont have an account yet? Register <Link to='/register'>here</Link></p>
        {/* <button onClick={() => setShowNotification(true)}>click me</button> */}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default LoginPage
