import { useState, useCallback, useEffect, useRef } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import { Signuppage } from './pages/Signuppage'
import { Toaster } from 'react-hot-toast'
import { Loginpage } from './pages/Loginpage'
import './App.css'
import { useAuthStore } from './store/useAuthStore'
import { Firstpage } from './pages/Firstpage'
import Home from './pages/Homepage'



const App=()=>{
  const { authUser ,checkauth} = useAuthStore()
  console.log(authUser)

  useEffect(()=>{
    checkauth()
  },[]);


  return (
    <div>
    <Routes>
      <Route path="/" element={<Firstpage />} />
      <Route path="/signup" element={!authUser ?<Signuppage /> : <Home/>} />
      <Route path="/login" element={!authUser ? <Loginpage /> : <Home/>} />
  
   
    </Routes>

    <Toaster />
    </div>
  )
}

export default App

