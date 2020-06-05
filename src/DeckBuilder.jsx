import React, { useState } from 'react';
import './DeckBuilder.css';
import CardSearch from "./Components/CardSearch";
import DeckList from "./Components/DeckList";


const DeckBuilder = () => {
  const [deckList, setDeckList] = useState([]);

  const addCard = (card) => setDeckList((prevList) => [...prevList, card]);

  return (
    <div className="deck-builder">
      <DeckList deckList={deckList}/>
      <CardSearch addCard={addCard}/>
    </div>
  );
};

export default DeckBuilder;