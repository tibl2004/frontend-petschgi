// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import SpielerMelden from './CommunityServer/Report/SpielerMelden';
import CommunityServer from './CommunityServer/CommunityServer';
import BugMelden from './CommunityServer/Bug/BugMelden';

const isAdmin = localStorage.getItem('isAdmin');

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/spielermelden"
            element={
              <>
                <Navbar />
                <SpielerMelden />
              </>
            }
          />
          <Route
            path="/bugmelden"
            element={
              <>
                <Navbar />
                <BugMelden />
              </>
            }
          />
          <Route
            path="/communityserver"
            element={
              <>
                <Navbar />
                <CommunityServer />
              </>
            }
          />
         
         
          {/*

          
          {isAdmin ? (
           
          ) : (
            <Route
              path="/login"
              element={
                <>
                  <Navbar />
                  <Login />
                </>
              }
            />
          )}
            */}
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
