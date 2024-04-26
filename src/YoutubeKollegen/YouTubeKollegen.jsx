// YouTubeKollegen.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './YouTubeKollegen.scss'; // Importiere das SCSS-Stylesheet

function YouTubeKollegen() {
  const [kollegen, setKollegen] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedKollege, setSelectedKollege] = useState(null);

  useEffect(() => {
    fetchKollegen();
  }, []);

  const fetchKollegen = async () => {
    try {
      const response = await axios.get('https://backend-petschgi.onrender.com/api/v1/youtubekollegen');
      setKollegen(response.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-petschgi.onrender.com/api/v1/youtubekollegen/${id}`);
      fetchKollegen();
      setShowPopup(false);
      setSelectedKollege(null);
    } catch (error) {
      console.error('Error deleting Kollege:', error);
    }
  };

  const handleEdit = (kollegeId) => {
    // Weiterleitung zur Bearbeitungsseite mit der Kollegen-ID
    window.location.href = `/bearbeiten/${kollegeId}`;
  };

  return (
    <div className="youtube-kollegen">
      <h2>YouTube Kollegen</h2>
      <Link to="/YouTubekollegen-erstellen">
        <button className="add-button">+</button>
      </Link>
      <div className="kollegen-liste">
        {kollegen.map((kollege, index) => (
          <div key={index} className="kollege" onMouseEnter={() => setSelectedKollege(kollege.id)} onMouseLeave={() => setSelectedKollege(null)}>
            <div className="kollege-actions">
              <button className="delete-button" onClick={() => setShowPopup(true)}>
                <FontAwesomeIcon icon={faTrash} className='trash'/>
              </button>
              <button className="edit-button" onClick={() => handleEdit(kollege.id)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              {showPopup && selectedKollege === kollege.id && (
                <div className="popup">
                  <p>Möchten Sie diesen Kollegen wirklich löschen?</p>
                  <button onClick={() => handleDelete(kollege.id)}>Ja</button>
                  <button onClick={() => setShowPopup(false)}>Abbrechen</button>
                </div>
              )}
            </div>
            <img src={kollege.image} alt={kollege.name} className="kollege-image" />
            <div className="kollege-details">
              <h3 className="kollege-name">{kollege.name}</h3>
              <p className="kollege-description" dangerouslySetInnerHTML={{ __html: kollege.description }}></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeKollegen;
