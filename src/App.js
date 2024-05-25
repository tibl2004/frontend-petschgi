import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import SpielerMelden from './CommunityServer/Report/SpielerMelden';
import CommunityServer from './CommunityServer/CommunityServer';
import BugMelden from './CommunityServer/Bug/BugMelden';
import SpielermeldungenAnzeigen from './Admin/SpielermeldungenAnzeigen';
import YouTubeKollegen from './YoutubeKollegen/YouTubeKollegen';
import YouTubeKollegenErstellen from './Admin/YouTubeKollegenErstellen';
import EditYouTubeKollege from './Admin/EditYoutubeKollege';
import Links from './Links/Links';

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
            path="/links"
            element={
              <>
                <Navbar />
                <Links />
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
            path="/bearbeiten/:kollegeId"
            element={
              <>
                <Navbar />
                <EditYouTubeKollege />
              </>
            }
          />
          <Route
            path="/spielermeldungenanzeigen"
            element={
              <>
                <Navbar />
                <SpielermeldungenAnzeigen />
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
          <Route
            path="/youtubekollegen"
            element={
              <>
                <Navbar />
                <YouTubeKollegen />
              </>
            }
          />
          <Route
            path="/youtubekollegen-erstellen"
            element={
              <>
                <Navbar />
                <YouTubeKollegenErstellen />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
