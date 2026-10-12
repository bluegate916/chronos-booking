import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from "./pages/Login"
import Register from './pages/Register';
import Home from './pages/Home'
// import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import RoomDetailScreen from './pages/RoomDetailScreen';
import BookingSummaryScreen from './pages/BookingSummaryScreen';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Logout from './pages/Logout';
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
        {/* Dynamic Route Pages */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/room/:id" element={<RoomDetailScreen />} />
            <Route path="/logout" element={<Logout />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/summary" element={<BookingSummaryScreen />} />
          </Routes>
        </main>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
