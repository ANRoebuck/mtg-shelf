import React from 'react';
import './DeckBuilder.css';
import CardSearch from "./components/deckbuilder/CardSearch";
import Deck from "./components/deckbuilder/Deck";


const DeckBuilder = () => {

  return (
    <div className="deck-builder">
      <Deck />
      <CardSearch />
    </div>
  );
};

export default DeckBuilder;