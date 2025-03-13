
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import AnimatedRoutes from './AnimatedRoutes'





createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
)
