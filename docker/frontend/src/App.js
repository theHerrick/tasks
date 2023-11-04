// src/App.js
import React from 'react';
import './App.css';
import CustomNavbar from './components/Navbar';
import Home from './pages/Home';
import New from './pages/New';
import Update from './pages/Update';
import Delete from './pages/Delete';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomNavbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/update" element={<Update />} />
            <Route path="/delete" element={<Delete />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
