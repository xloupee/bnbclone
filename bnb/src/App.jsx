import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from './components/Navbar'
import SignUp from './pages/signup'
import Login from './pages/login'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='login' element={<Login />}/>
          <Route path='signup' element={<SignUp />}/>
          <Route path='home' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
