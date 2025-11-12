import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//import App from './App'
import ProfileSelection from './ProfileSelection/ProfileSelection'
import LoginCliente from './components/LoginCliente'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App - ProfileSelection/> */}
    <LoginCliente />
  </StrictMode>,
)
