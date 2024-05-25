import React, { useState } from 'react';
import './Login.scss';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    
    if (users[username] && await compare(password, users[username])) { // Vergleiche die Passwörter
      if (username === 'admin') {
        localStorage.setItem('isAdmin', true);
        window.location.href = '/users';
      } else {
        window.location.href = '/';
      }
    } else {
      alert('Falscher Benutzername oder Passwort.');
    }

    // Setze das Passwort-Feld zurück
    setPassword('');
  };

  // Überprüfe, ob der Benutzer ein Admin ist und rendere das Login-Formular entsprechend
  const renderLoginForm = () => {
    if (localStorage.getItem('isAdmin')) {
      return (
        <div className="login-container">
          <form onSubmit={handleLogin} className="login-form">
            <label>
              Benutzername:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Passwort:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Einloggen</button>
          </form>
        </div>
      );
    } else {
      return null; // Zeige kein Login-Formular an, wenn der Benutzer kein Admin ist
    }
  };

  return (
    <div>
      {renderLoginForm()}
    </div>
  );
};

export default Login;
