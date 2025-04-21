
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import AnimatedRoutes from './AnimatedRoutes'





createRoot(document.getElementById('root')).render(
  <AuthProvider>
    
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
  </AuthProvider>
)
