import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Importiere das Löschen-Icon aus Font Awesome
import './SpielermeldungenAnzeigen.scss'; // Importiere das SCSS-Stylesheet

function SpielermeldungenAnzeigen() {
  const [meldungen, setMeldungen] = useState([]);

  useEffect(() => {
    // Funktion zum Abrufen der Spielermeldungen
    const fetchMeldungen = async () => {
      try {
        const response = await axios.get('https://backend-petschgi.onrender.com/api/v1/spielermelden');
        setMeldungen(response.data.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Spielermeldungen:', error);
      }
    };

    fetchMeldungen(); // Initialer Abruf der Spielermeldungen

  }, []); // Leeres Array als Abhängigkeit, um sicherzustellen, dass der Effekt nur einmal ausgeführt wird

  // Funktion zum Löschen einer Spielermeldung
  const deleteMeldung = async (id) => {
    try {
      await axios.delete(`https://backend-petschgi.onrender.com/api/v1/spielermelden/${id}`);
      // Nach dem Löschen, aktualisiere die Spielermeldungen
      const updatedMeldungen = meldungen.filter(meldung => meldung.id !== id);
      setMeldungen(updatedMeldungen);
    } catch (error) {
      console.error('Fehler beim Löschen der Spielermeldung:', error);
    }
  };

  return (
    <div className="spielermeldungen-anzeigen">
      <h2>Spielermeldungen Anzeigen</h2>
      <div className="meldungen-liste">
        {meldungen && meldungen.length > 0 ? (
          meldungen.map((meldung, index) => (
            <div key={index} className="meldung-box">
              <h3>Spielername: {meldung.spielername}</h3>
              <p>Benutzername: {meldung.benutzername}</p>
              <button onClick={() => deleteMeldung(meldung.id)}><FaTrash /></button>
            </div>
          ))
        ) : (
          <p>Keine Spielermeldungen vorhanden.</p>
        )}
      </div>
    </div>
  );
}

export default SpielermeldungenAnzeigen;
