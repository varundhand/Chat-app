import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Room from './pages/Room'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Room/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
