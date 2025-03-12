import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import Layout from './pages/Layout'
import Home from './pages/Home'




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home/>} />
      </Route>
      
      
    
    </Routes>
  </BrowserRouter>
)
