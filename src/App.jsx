import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'

// import { increment } from './features/auth/authSlice'
import { Provider } from 'react-redux'
import { store } from './app/store'

import LoginPage from './pages/LoginPage'
import Room from './pages/Room'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>       
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>

          <Route element={<PrivateRoutes/>}>  {/* Protected pages will come under this */}
            <Route path='/' element={<Room/>}/>
          </Route>

        </Routes>
      </Router>
    </Provider>
  )
}

export default App
