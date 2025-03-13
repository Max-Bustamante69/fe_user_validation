import React from 'react'
import Layout from './pages/Layout'
import Home from './pages/Home'
import DiditForm from './components/DiditForm'
import { useLocation } from 'react-router'
import { Routes, Route } from 'react-router'
import { AnimatePresence } from 'framer-motion'



function AnimatedRoutes() {

    const location = useLocation()

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/didit" element={<DiditForm />} />
        </Route>
        </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes