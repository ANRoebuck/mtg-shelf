// import React, { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDecklist } from "../../store/deckBuilder-selector";
import { setDecklist } from "../../store/deckBuilder-actions";

const SavedDecksMenu = () => {

  // const [currentDeck, setCurrentDeck] = useState([]);
  // const [savedDecks, setSavedDecks] = useState([]);

  const decklist = useSelector(selectDecklist);
  const dispatch = useDispatch();

  const updateDecklist = (newList) => dispatch(setDecklist(newList));

  // const getSavedDecks = () => JSON.parse(localStorage.getItem('savedDecks'));
  // const addSavedDeck = (newDeckName) => {
  //   const decklists = JSON.parse(localStorage.getItem('savedDecks'));
  //   if((decklists.filter(decklist => decklist !== newDeckName)).length === 0){
  //     decklists.push(newDeckName)
  //     localStorage.setItem('savedDecks', decklists);
  //   }
  // }

  const saveDeck = () => localStorage.setItem('savedDeck', JSON.stringify(decklist));
  const loadDeck = () => updateDecklist(JSON.parse(localStorage.getItem('savedDeck')));
  const clearDeck = () => updateDecklist([]);

  return (
    <div className="decklist-options">
      <div className="option-set">
        <button type="button" onClick={saveDeck}>Save</button>
        <button type="button" onClick={loadDeck}>Load</button>
        <button type="button" onClick={clearDeck}>Clear</button>
      </div>
    </div>
  );
}

export default SavedDecksMenu;