import { useState } from 'react'
import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import In from './Sign/In'
import Up from './Sign/Up'
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<In />} />
          <Route path='/signUp' element={<Up />} />
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
