import React, { useState } from 'react';
import './DeckBuilder.css';
import CardSearch from "./Components/CardSearch";
import DeckList from "./Components/DeckList";


const DeckBuilder = () => {
  const [maindeck, setMaindeck] = useState([]);
  const [sideboard, setSideboard] = useState([]);

  const addToMaindeck = (card) => setMaindeck((prevList) => [...prevList, card]);
  const removeFromMaindeck = (cardIndex) => setMaindeck((prevList) => prevList.filter((c, i) => i !== cardIndex));

  const addToSideboard = (card) => setSideboard((prevList) => [...prevList, card]);
  const removeFromSideboard = (cardIndex) => setSideboard((prevList) => prevList.filter((c, i) => i !== cardIndex));

  const sideOut = (card) => {
    removeFromMaindeck(card.index);
    addToSideboard(card);
  };
  const sideIn = (card) => {
    removeFromSideboard(card.index);
    addToMaindeck(card);
  };

  return (
    <div className="deck-builder">
      <DeckList maindeck={maindeck} sideboard={sideboard} sideIn={sideIn} sideOut={sideOut}/>
      <CardSearch addCard={addToMaindeck}/>
    </div>
  );
};

export default DeckBuilder;