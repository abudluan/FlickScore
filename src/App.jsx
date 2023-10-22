import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'

import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './components/Home';

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
