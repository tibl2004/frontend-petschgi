import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import './YouTubeKollegenErstellen.scss'; // Importiere das SCSS-Stylesheet

function YouTubeKollegenErstellen() {
  const [newKollege, setNewKollege] = useState({ name: '', image: '', description: '', customLinkText: '', customLinkUrl: '' });
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [isBold, setIsBold] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewKollege({ ...newKollege, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "isUnderlined") {
      setIsUnderlined(checked);
    } else if (name === "isBold") {
      setIsBold(checked);
    }
  };

  const handleAddKollege = async () => {
    try {
      const { description, ...rest } = newKollege;
      const updatedDescription = description ? `${description} ${createLinkMarkup(linkText, linkUrl)}` : `${createLinkMarkup(linkText, linkUrl)}`;
      await axios.post('https://backend-petschgi.onrender.com/api/v1/youtubekollegen', { ...rest, description: updatedDescription });
      setNewKollege({ name: '', image: '', description: '', customLinkText: '', customLinkUrl: '' });
      setLinkText('');
      setLinkUrl('');
      window.location = "/youtubekollegen";
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
    let styles = '';
    if (isUnderlined) {
      styles += 'text-decoration: underline;';
    } else {
      styles += 'text-decoration: none;';
    }
    if (isBold) {
      styles += 'font-weight: bold;';
    }
    return `<a href="${url}" target="_blank" style="${styles}">${text}</a>`;
  };

  return (
    <div className="youtube-kollegen">
      <h2>YouTube Kollegen hinzufügen</h2>
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
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isUnderlined"
                checked={isUnderlined}
                onChange={handleCheckboxChange}
              />
              Unterstrichen
            </label>
            <label>
              <input
                type="checkbox"
                name="isBold"
                checked={isBold}
                onChange={handleCheckboxChange}
              />
              Fett
            </label>
          </div>
          <button className="link-button" onClick={insertLink}>
            <FontAwesomeIcon icon={faLink} />
          </button>
        </div>
        <button onClick={handleAddKollege} className="add-button">
          Kollege hinzufügen
        </button>
      </div>
    </div>
  );
}

export default YouTubeKollegenErstellen;
