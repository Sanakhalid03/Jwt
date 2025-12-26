
import { Toaster } from 'react-hot-toast'
import './App.css'
import Login from './Components/Login'
import Profile from './Components/Profile'
import { Route, Routes } from 'react-router-dom'
import Header from './Header'
import ProtectedRoute from './ProtectedRoute'

function App() {
 

  return (
    <>
    <Toaster/>
    <Header/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route>   
    </Routes>
    </>
  )
}

export default App
