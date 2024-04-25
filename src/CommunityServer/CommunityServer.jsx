import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './CommunityServer.scss';

function CommunityServer() {
  const textToCopy = "communityserverpt.g-portal.game";

  const handleCopy = () => {
    alert('Text kopiert!');
    // Hier könntest du zusätzliche Aktionen nach dem Kopieren ausführen
  };

  return (
    <div className="community-server-container">
      <h2>Community Server</h2>
      <div className="minecraft-container">
        <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
          <span className="copy-text" style={{ backgroundColor: 'green', cursor: 'pointer' }}>
            {textToCopy}
          </span>
        </CopyToClipboard>
      </div>
      <div className="link-container">
        <Link to="/spielermelden">Spieler Melden</Link>
        <Link to="/bugmelden">Bug Melden</Link>
      </div>
    </div>
  );
}

export default CommunityServer;
