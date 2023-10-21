import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css'

import Home from './components/Home';

function App() {
  return (
    <>
      <Router> 
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
       
       
      </Router>
    </>
  )
}

export default App
