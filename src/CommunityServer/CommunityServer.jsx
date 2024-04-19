import React from 'react';
import { Link } from 'react-router-dom';
import './CommunityServer.scss'; // Importiere das SCSS-Stylesheet

function CommunityServer() {
  return (
    <div className="community-server-container"> {/* Verwende die CSS-Klasse */}
      <h2>Community Server</h2>
      <div className="link-container">
        <Link to="/spielermelden">Spieler Melden</Link>
        <Link to="/bugmelden">Bug Melden</Link>
      </div>
     
    </div>
  );
}

export default CommunityServer;
