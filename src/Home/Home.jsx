import React from 'react';
import './Home.scss';


import DiaShow from './diashow.jpg';


const Home = () => {
  
  return (
    <div className="container">
      <div className="slide-container">
        <img src={DiaShow} alt="Diashow" className="slide-image" /> {/* Einzelnes Bild */}
      </div>
      <div className='text-container'>
        <div className='titel'>
          <h1>Unsere Dienstleistungen</h1>
        </div>
        <div className='text'>
          <p>
            Wir bieten eine breite Palette von Dienstleistungen an, die Ihre Bedürfnisse erfüllen. Von der Webseitenprogrammierung bis zur Erstellung professioneller Diashows und der Zusammenstellung eines optimal passenden Gaming-PCs stehen wir Ihnen zur Verfügung.
          </p>
          <p>
            Unser erfahrenes Team wird sicherstellen, dass Ihre Anforderungen mit hoher Qualität und Präzision erfüllt werden.
          </p>
          <p>
            Kontaktieren Sie uns noch heute, um mehr über unsere Dienstleistungen zu erfahren und wie wir Ihnen helfen können.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
