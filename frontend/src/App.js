import './App.css'
import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './Components/About'
import Home from './Components/Home'
import NoteState from './Context/Notes/NoteState'
import Alert from './Components/Alert'
import Login from './Components/Login'
import Signup from './Components/Signup'

const App = () => {
  const [alert, setAlert] = useState(null)
  const toggleAlert = (msg, typ) => {
    setAlert({
      message: msg,
      type: typ
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar toggleAlert={toggleAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home toggleAlert={toggleAlert} />} />
              <Route path='/about' element={<About />} />
              <Route path='/signup' element={<Signup toggleAlert={toggleAlert} />} />
              <Route path='/login' element={<Login toggleAlert={toggleAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
