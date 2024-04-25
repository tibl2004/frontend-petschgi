import React from 'react';
import './Home.scss';

import homeBG from './homeBG.png';

const Home = () => {
  return (
    <div className="home-container">
      <div className="img-container">
        <img src={homeBG} alt="Diashow" className="slide-image" /> {/* Einzelnes Bild */}
        <div className="overlay"></div>
        <div className="welcome-text">
          <h1>Willkommen</h1>
          <p>Auf der offiziellen Webseite von Petschgi.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
