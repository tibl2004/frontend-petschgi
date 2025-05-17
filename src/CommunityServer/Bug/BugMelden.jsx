import React, { useState } from 'react';
import './BugMelden.scss';

function BugMelden() {
  const [bugBeschreibung, setBugBeschreibung] = useState('');
  const [benutzername, setBenutzername] = useState('');

  const handleBugChange = (e) => setBugBeschreibung(e.target.value);
  const handleBenutzernameChange = (e) => setBenutzername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bug Beschreibung:', bugBeschreibung);
    console.log('Benutzername:', benutzername);
    setBugBeschreibung('');
    setBenutzername('');
  };

  return (
    <div className="bug-melden-container">
      <h2>Bug melden</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Benutzername:
          <input
            type="text"
            value={benutzername}
            onChange={handleBenutzernameChange}
            placeholder="Dein Benutzername"
            required
            autoComplete="username"
          />
        </label>
        <label>
          Beschreiben Sie den Bug so genau wie möglich und wann und wo er auftritt:
          <textarea
            value={bugBeschreibung}
            onChange={handleBugChange}
            placeholder="Bug Beschreibung"
            required
            rows={5}
          />
        </label>
        <button type="submit">Bug melden</button>
      </form>
    </div>
  );
}

export default BugMelden;
