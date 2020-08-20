import React from "react";
import closedDeckBoxImg from '../resources/deckbox-closed.jpg';
import './saved-deck-menu-item.scss';
import { addSavedDeck, deleteSavedDeck } from "../utils/localStorageInteractions";
import { setDecklist } from "../../store/deckBuilder-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectDecklist } from "../../store/deckBuilder-selector";

const SavedDeckMenuItem = ({ savedDeck, refresh }) => {

  const decklist = useSelector(selectDecklist);
  const dispatch = useDispatch();

  const saveDeck = () => {
    addSavedDeck(savedDeck.name, decklist);
    refresh();
  };

  const loadDeck = () => dispatch(setDecklist(savedDeck.deck));
  const deleteDeck = () => {
    deleteSavedDeck(savedDeck.name);
    refresh();
  }

  return (
    <div className="saved-deck">
      <div>{savedDeck.name}</div>
      <img className="deck-box-img" src={closedDeckBoxImg}/>
      <button type="button" onClick={() => loadDeck()}>Load</button>
      <button type="button" onClick={() => saveDeck()}>Save</button>
      <button type="button" onClick={() => deleteDeck()}>Delete</button>
    </div>
  );
}

export default SavedDeckMenuItem;