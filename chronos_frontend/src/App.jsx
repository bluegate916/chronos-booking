import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from "./pages/Login"
import Register from './pages/Register';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import RoomDetailScreen from './pages/RoomDetailScreen';
import BookingSummaryScreen from './pages/BookingSummaryScreen';
import './App.css'

// function Logout() {
//   // this function will simply clear the access and refresh tokens
//   localStorage.clear()
//   return <Navigate to="login" />
// }

// function RegisterAndLogout() {
//   localStorage.clear()
//   return <Register />
// }

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="app-container">
        {/* Global Navigation Header */}
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="brand-logo">
              CHRONOS<span className="brand-subtext">BOOKING</span>
            </Link>
            <div className="nav-links">
              <Link to="/register" className="nav-link">Sign Up</Link>
              <Link to="/login" className="nav-link">Log In</Link>
              <Link to="/summary" className="btn-my-bookings">My Bookings</Link>
            </div>
          </div>
        </nav>

        {/* Dynamic Route Pages */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/room/:id" element={<RoomDetailScreen />} />
            <Route path="/summary" element={<BookingSummaryScreen />} />
          </Routes>
        </main>
      </div>

        {/* <Routes>
          Self contained component 
          <Route 
            path='/'
            element={
            <ProtectedRoute>
            Home is for people authenticated and authorized
              <Home />
            </ProtectedRoute>
          }
          />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/*' element={<NotFound />}></Route>
          <Route />
        </Routes> */}
      </BrowserRouter>
    </>
  )
}

export default App
