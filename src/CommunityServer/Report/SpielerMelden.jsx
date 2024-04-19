import React, { useState } from 'react';
import './SpielerMelden.scss'; // Importiere das SCSS-Stylesheet

function SpielerMelden() {
  const [spielername, setSpielername] = useState('');
  const [benutzername, setBenutzername] = useState('');

  const handleSpielernameChange = (e) => {
    setSpielername(e.target.value);
  };

  const handleBenutzernameChange = (e) => {
    setBenutzername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier könntest du die Daten senden oder weiterverarbeiten
    console.log('Spielername:', spielername);
    console.log('Benutzername:', benutzername);
    // Zurücksetzen des Formulars nach dem Absenden
    setSpielername('');
    setBenutzername('');
  };

  return (
    <div className="spieler-melden-container"> {/* Verwende die CSS-Klasse */}
      <h2>Spieler melden</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Spielername:
          <input
            type="text"
            value={spielername}
            onChange={handleSpielernameChange}
            required // Das input-Feld wird hier als Pflichtfeld markiert
          />
        </label>
        <label>
          Benutzername:
          <input
            type="text"
            value={benutzername}
            onChange={handleBenutzernameChange}
            required // Das input-Feld wird hier als Pflichtfeld markiert
          />
        </label>
        <button type="submit">Spieler melden</button>
      </form>
    </div>
  );
}

export default SpielerMelden;
