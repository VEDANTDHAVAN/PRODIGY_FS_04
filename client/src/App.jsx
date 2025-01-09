import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import {UserProvider} from './context/user.context'
import Project from './pages/Project'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
     <UserProvider>
      <Navbar/>
      <Toaster position='bottom-left' toastOptions={{duration: 3000}}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/project" element={<Project/>}/>
      </Routes>
      </UserProvider>
    </>
  )
}

export default App
