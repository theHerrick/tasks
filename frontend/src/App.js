import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./components/authentication-guard";
import CustomNavbar from './components/Navbar';
import Home from './pages/Home';
import New from './pages/New';
import Update from './pages/Update';
import Delete from './pages/Delete';


function App() {
  return (
      <div className="App">
        <CustomNavbar />
        <div className="container mt-5">
          <Routes>
          <Route
              path="/"
              element={<AuthenticationGuard component={Home} />}
            />
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
