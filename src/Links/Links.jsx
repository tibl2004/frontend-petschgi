import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Links.scss';

function Links() {
  const [links, setLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newLink, setNewLink] = useState({ name: '', image: '', description: '', customLinkText: '', customLinkUrl: '' });
  const [linkTitel, setLinkTitel] = useState('');
  const [linkTitelUrl, setLinkTitelUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get('https://backend-petschgi.onrender.com/api/v1/links');
      setLinks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLink({ ...newLink, [name]: value });
  };

  const handleAddLink = async () => {
    try {
      const { description, ...rest } = newLink;
      const updatedDescription = description ? `${description} ${createLinkMarkup(linkTitel, linkTitelUrl)}` : `${createLinkMarkup(linkTitel, linkTitelUrl)}`;
      await axios.post('https://backend-petschgi.onrender.com/api/v1/links', { ...rest, description: updatedDescription });
      setNewLink({ name: '', image: '', description: '', customLinkText: '', customLinkUrl: '' });
      setLinkTitel('');
      setLinkTitelUrl('');
      setShowForm(false);
      fetchLinks();
    } catch (error) {
      console.error('Error adding new link:', error);
    }
  };

  const createLinkMarkup = (text, url) => {
    return `<a href="${url}" target="_blank">${text}</a>`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-petschgi.onrender.com/api/v1/links/${id}`);
      fetchLinks();
      setShowPopup(false);
      setSelectedLink(null);
      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  return (
    <div className="links">
      <h2>Links</h2>
      <div className="links-liste">
        {links.map((link, index) => (
          <div key={index} className="link" onMouseEnter={() => setSelectedLink(link.id)} onMouseLeave={() => setSelectedLink(null)}>
            {selectedLink === link.id && (
              <div className="link-actions">
                <button className="delete-button" onClick={() => setShowPopup(true)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                {showPopup && selectedLink === link.id && (
                  <div className="popup">
                    <p>Möchten Sie diesen Link wirklich löschen?</p>
                    <button onClick={() => handleDelete(link.id)}>Ja</button>
                    <button onClick={() => setShowPopup(false)}>Abbrechen</button>
                  </div>
                )}
              </div>
            )}
            <img src={link.image} alt={link.name} className="link-image" />
            <div className="link-details">
              <h3 className="link-name">{link.name}</h3>
              <p className="link-description" dangerouslySetInnerHTML={{ __html: link.description }}></p>
            </div>
          </div>
        ))}
      </div>
      {showForm ? (
        <div className="link-form">
          <h3>Neuen Link hinzufügen</h3>
          <input type="text" name="name" placeholder="Name" value={newLink.name} onChange={handleInputChange} className="link-input-field" />
          <input type="text" name="image" placeholder="Bild URL" value={newLink.image} onChange={handleInputChange} className="input-field" />
          <textarea
            name="description"
            placeholder="Beschreibung"
            value={newLink.description}
            onChange={handleInputChange}
            cols="30"
            rows="5"
            className="textarea-field"
          />
          <div className="link-insertion">
            <input
              type="text"
              placeholder="Link Titel"
              value={linkTitel}
              onChange={(e) => setLinkTitel(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Link Titel URL"
              value={linkTitelUrl}
              onChange={(e) => setLinkTitelUrl(e.target.value)}
              className="input-field"
            />
            <button className="link-button" onClick={handleAddLink}>
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="add-button">
        + Link hinzufügen
      </button>
      )}
    </div>
  );
}

export default Links;
