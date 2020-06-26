import React, { useState } from 'react';
import './DeckBuilder.css';
import CardSearch from "./components/CardSearch";
import Deck from "./components/Deck";


const DeckBuilder = () => {
  const [decklist, setDecklist] = useState([]);

  const addToMain = (card) => addCard(card, 'm');
  const addToSide = (card) => addCard(card, 's');
  const addCard = (card, ms) => setDecklist((prevList) => [ ...prevList, { ...card, ms, index: prevList.length}]);
  const removeCard = (cardToRemove) => setDecklist((prevList) => [ ...prevList.filter(card => card !== cardToRemove)])

  const sideOut = (card) => {
    removeCard(card);
    addToSide(card);
    // setDecklist((prevList) => {
    //   const newList = [...prevList];
    //   const i = card.index;
    //   newList[i].ms = 's';
    //   return newList;
    // });
  }
  const sideIn = (card) => {
    removeCard(card);
    addToMain(card);
    // setDecklist((prevList) => {
    //   const newList = [...prevList];
    //   const i = card.index;
    //   newList[i].ms = 'm';
    //   return newList;
    // });
  }

  const saveDeck = () => localStorage.setItem('savedDeck', JSON.stringify(decklist));
  const loadDeck = () => setDecklist(JSON.parse(localStorage.getItem('savedDeck')));

  return (
    <div className="deck-builder">
      <Deck decklist={decklist} sideIn={sideIn} sideOut={sideOut} saveDeck={saveDeck} loadDeck={loadDeck} removeCard={removeCard}/>
      {/*<hr/>*/}
      <CardSearch addCard={addCard}/>
    </div>
  );
};

export default DeckBuilder;