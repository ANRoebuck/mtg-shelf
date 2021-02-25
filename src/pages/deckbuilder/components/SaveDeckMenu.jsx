import React, { useEffect, useState } from "react";
import SavedDeckMenuItem from "./SavedDeckMenuItem";
import { addSavedDeck, getSavedDecks } from "../utils/localStorageInteractions";
import { useSelector } from "react-redux";
import { selectDecklist } from "../../../store/deckBuilder-selector";
import './saved-deck-menu.scss';

const SaveDeckMenu = () => {

  const [savedDecks, setSavedDecks] = useState([]);
  const [newDeckName, setNewDeckName] = useState('');

  const decklist = useSelector(selectDecklist);
  useEffect(() => refreshSavedDecks(), []);

  const refreshSavedDecks = () => setSavedDecks(getSavedDecks());

  const handleChange = (e) => setNewDeckName(e.target.value);

  const handleSaveDeck = () => {
    addSavedDeck(newDeckName, decklist);
    refreshSavedDecks();
  }

  const savedDecksToRender = savedDecks.map(savedDeck =>
    <SavedDeckMenuItem savedDeck={savedDeck} refresh={refreshSavedDecks} />)

  return (
    <div className="saved-decks-menu">
      {/*<div className="new-deck">*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    value={newDeckName}*/}
      {/*    onChange={(e) => handleChange(e)}*/}
      {/*    placeholder="new deck name"/>*/}
      {/*  <div className="option-set">*/}
      {/*    <button type="button" onClick={handleSaveDeck}>Save</button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {savedDecksToRender}
    </div>
  );
}

export default SaveDeckMenu;
