import './App.css'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Edit from './components/Edit'
import Details from './components/Details'

function App() {



  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="home/edit/:id" element={<Edit />} />
          <Route path="home/view/:id" element={<Details />} />
        </Routes>
   
    </>
  )
}

export default App
