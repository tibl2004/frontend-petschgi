import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import './YouTubeKollegen.scss'; // Importiere das SCSS-Stylesheet

function YouTubeKollegen() {
  const [kollegen, setKollegen] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newKollege, setNewKollege] = useState({ name: '', image: '', description: '', customLinkText: '', customLinkUrl: '' });
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewKollege({ ...newKollege, [name]: value });
  };

  const handleAddKollege = async () => {
    try {
      const { description, ...rest } = newKollege;
      const updatedDescription = description ? `${description} ${createLinkMarkup(linkText, linkUrl)}` : `${createLinkMarkup(linkText, linkUrl)}`;
      await axios.post('https://backend-petschgi.onrender.com/api/v1/youtubekollegen', { ...rest, description: updatedDescription });
      setNewKollege({ name: '', image: '', description: '', customLinkText: '', customLinkUrl: '' });
      setLinkText('');
      setLinkUrl('');
      setShowForm(false);
      fetchKollegen();
    } catch (error) {
      console.error('Error adding new Kollege:', error);
    }
  };

  const insertLink = () => {
    const updatedDescription = newKollege.description + ' ' + createLinkMarkup(linkText, linkUrl);
    setNewKollege({ ...newKollege, description: updatedDescription });
    setLinkText('');
    setLinkUrl('');
  };

  const createLinkMarkup = (text, url) => {
    return `<a href="${url}" target="_blank">${text}</a>`;
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

  return (
    <div className="youtube-kollegen">
      <h2>YouTube Kollegen</h2>
      <div className="kollegen-liste">
        {kollegen.map((kollege, index) => (
          <div key={index} className="kollege" onMouseEnter={() => setSelectedKollege(kollege.id)} onMouseLeave={() => setSelectedKollege(null)}>
            {selectedKollege === kollege.id && (
              <div className="kollege-actions">
                <button className="delete-button" onClick={() => setShowPopup(true)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                {showPopup && selectedKollege === kollege.id && (
                  <div className="popup">
                    <p>Möchten Sie diesen Kollegen wirklich löschen?</p>
                    <button onClick={() => handleDelete(kollege.id)}>Ja</button>
                    <button onClick={() => setShowPopup(false)}>Abbrechen</button>
                  </div>
                )}
              </div>
            )}
            <img src={kollege.image} alt={kollege.name} className="kollege-image" />
            <div className="kollege-details">
              <h3 className="kollege-name">{kollege.name}</h3>
              <p className="kollege-description" dangerouslySetInnerHTML={{ __html: kollege.description }}></p>
            </div>
          </div>
        ))}
      </div>
      {showForm ? (
        <div className="kollege-form">
          <h3>Neuen Kollegen hinzufügen</h3>
          <input type="text" name="name" placeholder="Name" value={newKollege.name} onChange={handleInputChange} className="input-field" />
          <input type="text" name="image" placeholder="Bild URL" value={newKollege.image} onChange={handleInputChange} className="input-field" />
          <textarea
            name="description"
            placeholder="Beschreibung"
            value={newKollege.description}
            onChange={handleInputChange}
            cols="30"
            rows="5"
            className="textarea-field"
          />
          <div className="link-insertion">
            <input
              type="text"
              placeholder="Link Text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="input-field"
            />
            <button className="link-button" onClick={insertLink}>
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          <button onClick={handleAddKollege} className="add-button">
            Kollege hinzufügen
          </button>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="add-button">
          + Kollege hinzufügen
        </button>
      )}
    </div>
  );
}

export default YouTubeKollegen;
