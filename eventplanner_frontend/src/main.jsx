import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login from './components/login.jsx'
import Register from './components/register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const isAuthenticated = localStorage.getItem('access_token');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={ isAuthenticated ?  <App /> : <Login />} />
      </Routes> 
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> 
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes> 
    </BrowserRouter>
  </StrictMode>,
)
