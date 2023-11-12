import React from 'react'
import Login from './LoginPage/Login'
import Register from './RegisterPage/Register'

import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
    </AnimatePresence>
  )
}
