// src/App.js
import React from 'react';
import './App.css';
import CustomNavbar from './components/Navbar';
import Home from './pages/Home';
import New from './pages/New';
import Update from './pages/Update';
import Delete from './pages/Delete';
import Login from './pages/Login';
import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./components/authentication-guard";

function App() {
  return (
      <div className="App">
        <CustomNavbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/new"
              element={<AuthenticationGuard component={New} />}
            />
            <Route
              path="/update"
              element={<AuthenticationGuard component={Update} />}
            />
            <Route
              path="/delete"
              element={<AuthenticationGuard component={Delete} />}
            />
          </Routes>
        </div>
      </div>
  );
}

export default App;
