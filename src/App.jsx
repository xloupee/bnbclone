import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from './components/Navbar'
import SignUp from './pages/signup'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='signup' element={<SignUp />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
