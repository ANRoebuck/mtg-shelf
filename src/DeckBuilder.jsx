import React from 'react';
import './DeckBuilder.css';
import CardSearch from "./components/CardSearch";
import Deck from "./components/Deck";


const DeckBuilder = () => {

  return (
    <div className="deck-builder">
      <Deck />
      <CardSearch />
    </div>
  );
};

export default DeckBuilder;