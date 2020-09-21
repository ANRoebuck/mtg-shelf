import React from "react";
import closedDeckBoxImg from '../resources/deckbox-closed.jpg';
import './saved-deck-menu-item.scss';
import { addSavedDeck, deleteSavedDeck } from "../utils/localStorageInteractions";
import { loadDeck, toggleSearchOrDecks } from "../../store/deckBuilder-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectDecklist, selectDeckName, selectSaveOrSaveAs } from "../../store/deckBuilder-selector";

const SavedDeckMenuItem = ({ savedDeck, refresh }) => {

  const decklist = useSelector(selectDecklist);
  const activeDeckName = useSelector(selectDeckName);
  const saveOrSaveAs = useSelector(selectSaveOrSaveAs);
  const dispatch = useDispatch();

  const emptyDeck = decklist.length === 0;
  const saveAsMode = saveOrSaveAs === 'saveAs';
  const saveOrOverwrite = !saveAsMode && activeDeckName === savedDeck.name ? 'Save' : 'Overwrite';

  const saveDeck = () => {
    addSavedDeck(savedDeck.name, decklist);
    refresh();
  };

  const load = () => {
    dispatch(loadDeck(savedDeck));
    dispatch(toggleSearchOrDecks());
  }
  const deleteDeck = () => {
    deleteSavedDeck(savedDeck.name);
    dispatch(toggleSearchOrDecks());
    refresh();
  }

  return (
    <div className="saved-deck">
      <div className="deck-name">{savedDeck.name}</div>
      <img className="deck-box-img" src={closedDeckBoxImg}/>
      <div className="button-set-vertical">
        <button type="button" onClick={() => load()} disabled={saveAsMode}>
          Load</button>
        <button type="button" onClick={() => saveDeck()} disabled={emptyDeck}>
          {saveOrOverwrite}</button>
        <button type="button" onClick={() => deleteDeck()}>
          Delete</button>
      </div>
    </div>
  );
}

export default SavedDeckMenuItem;