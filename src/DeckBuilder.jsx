import React, { useState } from 'react';
import './DeckBuilder.css';
import CardSearch from "./Components/CardSearch";
import Deck from "./Components/Deck";


const DeckBuilder = () => {
  return (
    <div className="deck-builder">
      <CardSearch/>
      <Deck/>
    </div>
  );
};

export default DeckBuilder;