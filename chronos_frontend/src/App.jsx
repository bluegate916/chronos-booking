import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigation, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function Logout() {
  // this function will simply clear the access and refresh tokens
  localStorage.clear()
  return <Navigate to="login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Self contained component */}
          <Route 
            path='/'
            element={
            <ProtectedRoute>
              {/* Home is for people authenticated and authorized */}
              <Home />
            </ProtectedRoute>
          }
          />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/*' element={<NotFound />}></Route>
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
