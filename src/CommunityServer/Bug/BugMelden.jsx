import React, { useState } from 'react';
import './BugMelden.scss'; // Importiere das SCSS-Stylesheet

function BugMelden() {
    const [bugBeschreibung, setBugBeschreibung] = useState('');
    const [benutzername, setBenutzername] = useState('');

    const handleBugChange = (e) => {
        setBugBeschreibung(e.target.value);
    };

    const handleBenutzernameChange = (e) => {
        setBenutzername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier könntest du die Daten senden oder weiterverarbeiten
        console.log('Bug Beschreibung:', bugBeschreibung);
        console.log('Benutzername:', benutzername);
        // Zurücksetzen des Formulars nach dem Absenden
        setBugBeschreibung('');
        setBenutzername('');
    };

    return (
        <div className="bug-melden-container"> {/* Verwende die CSS-Klasse */}
            <h2>Bug melden</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Benutzername:
                    <input
                        type="text"
                        value={benutzername}
                        onChange={handleBenutzernameChange}
                        required // Das input-Feld wird hier als Pflichtfeld markiert
                    />
                </label>
                <label>
                    Beschreiben Sie den Bug so genau wie möglich und wann und wo er auftritt:
                    <textarea
                        value={bugBeschreibung}
                        onChange={handleBugChange}
                        required // Das textarea-Feld wird hier als Pflichtfeld markiert
                    />
                </label>

                <button type="submit">Bug melden</button>
            </form>
        </div>
    );
}

export default BugMelden;
