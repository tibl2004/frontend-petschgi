import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditYouTubeKollege.scss';

function EditYouTubeKollege() {
  const { kollegeId } = useParams();

  const [kollege, setKollege] = useState({
    name: '',
    image: '',
    description: '',
    customLinkText: '',
    customLinkUrl: ''
  });

  useEffect(() => {
    console.log('Ausgewählter Kollege:', kollegeId); // Kollegen-ID in der Konsole ausgeben
    fetchKollege();
  }, [kollegeId]); // Trigger das Laden des Kollegen, wenn sich die Kollege-ID ändert

  const fetchKollege = async () => {
    try {
      const response = await axios.get(`https://backend-petschgi.onrender.com/api/v1/youtubekollegen/${kollegeId}`);
      setKollege(response.data.data[0] || {}); // Die Daten des ersten Kollegen in der Antwort setzen
    } catch (error) {
      console.error('Error fetching Kollege:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://backend-petschgi.onrender.com/api/v1/youtubekollegen/${kollegeId}`, kollege);
      window.location = "/youtubekollegen";
    } catch (error) {
      console.error('Error updating Kollege:', error);
    }
  };

  return (
    <div className="edit-kollege-container">
      <h2>Kollege bearbeiten</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={kollege.name}
        onChange={(e) => setKollege({ ...kollege, name: e.target.value })}
        className="input-field"
      />
      <label htmlFor="image">Bild URL:</label>
      <input
        type="text"
        id="image"
        value={kollege.image}
        onChange={(e) => setKollege({ ...kollege, image: e.target.value })}
        className="input-field"
      />
      <label htmlFor="description">Beschreibung:</label>
      <textarea
        id="description"
        value={kollege.description}
        onChange={(e) => setKollege({ ...kollege, description: e.target.value })}
        className="input-field textarea-field"
      ></textarea>
      <label htmlFor="customLinkText">Benutzerdefinierter Link Text:</label>
      <input
        type="text"
        id="customLinkText"
        value={kollege.customLinkText}
        onChange={(e) => setKollege({ ...kollege, customLinkText: e.target.value })}
        className="input-field"
      />
      <label htmlFor="customLinkUrl">Benutzerdefinierte Link URL:</label>
      <input
        type="text"
        id="customLinkUrl"
        value={kollege.customLinkUrl}
        onChange={(e) => setKollege({ ...kollege, customLinkUrl: e.target.value })}
        className="input-field"
      />
      <button onClick={handleSave} className="save-button">Speichern</button>
    </div>
  );
}

export default EditYouTubeKollege;
