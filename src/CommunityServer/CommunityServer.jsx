import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Importiere die Icons
import './CommunityServer.scss';

function CommunityServer() {
  const [serverInfo, setServerInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInput, setShowInput] = useState(false); // Zustand für das Anzeigen des Eingabefelds
  const [newServerName, setNewServerName] = useState('');
  const textToCopy = isLoading ? "Loading..." : (serverInfo.length > 0 ? serverInfo[0].minecraftservername : "Error");

  useEffect(() => {
    axios.get('https://backend-petschgi.onrender.com/api/v1/minecraft')
      .then(response => {
        setServerInfo(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching server info:', error);
        setIsLoading(false);
      });
  }, []);

  const handleCopy = () => {
    alert('Text copied!');
    // Zusätzliche Aktionen nach dem Kopieren könnten hier ausgeführt werden
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this server?')) {
      return;
    }
    axios.delete(`https://backend-petschgi.onrender.com/api/v1/minecraft/${id}`)
      .then(response => {
        alert('Server deleted successfully!');
        // Aktualisiere den Serverinfo-Array, wenn der Server gelöscht wurde
        setServerInfo(serverInfo.filter(server => server.id !== id));
      })
      .catch(error => {
        console.error('Error deleting server:', error);
        alert('An error occurred while deleting the server.');
      });
  };

  const handleCreate = () => {
    setShowInput(true); // Zeige das Eingabefeld an, wenn auf das Plus-Symbol geklickt wird
  };

  const handleSave = () => {
    // Führe den POST-Request aus, um einen neuen Minecraft-Server zu erstellen
    axios.post('https://backend-petschgi.onrender.com/api/v1/minecraft', {
      minecraftservername: newServerName
    })
    .then(response => {
      alert('Server created successfully!');
      setShowInput(false); // Verstecke das Eingabefeld nach dem Speichern
      setServerInfo([...serverInfo, response.data.data]); // Füge den neuen Server zur Liste hinzu
    })
    .catch(error => {
      console.error('Error creating server:', error);
      alert('An error occurred while creating the server.');
    });
  };

  const handleEdit = (id) => {
    // Implementiere die Logik für das Bearbeiten hier
    alert(`Edit button clicked for server with ID ${id}!`);
  };

  return (
    <div className="community-server-container">
      <h2>Community Server</h2>
      <div className="button-container">
        <button className="icon-button" onClick={handleCreate}><FaPlus /></button>
      </div>
      {showInput && (
        <div className="create-server">
          <input
            type="text"
            placeholder="Enter Minecraft Server Name"
            value={newServerName}
            onChange={(e) => setNewServerName(e.target.value)}
          />
          <button className="icon-button" onClick={handleSave}>Save</button>
        </div>
      )}
      {!isLoading && serverInfo.length === 0 && !showInput && (
        <p>No Minecraft servers available.</p>
      )}
      {serverInfo.map(server => (
        <div className="server-info" key={server.id}>
          <CopyToClipboard text={server.minecraftservername} onCopy={handleCopy}>
              <button className="servername-button">{server.minecraftservername}</button>
            </CopyToClipboard>
          <div className="button-container">
            <button className="icon-button" onClick={() => handleEdit(server.id)}><FaEdit /></button>
            <button className="icon-button" onClick={() => handleDelete(server.id)}><FaTrash /></button>
            
          </div>
        </div>
      ))}
      <div className="link-container">
        <Link to="/spielermelden" className="link">Spieler Melden</Link>
        <Link to="/bugmelden" className="link">Bug Melden</Link>
      </div>
    </div>
  );
}

export default CommunityServer;
