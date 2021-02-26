import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDecklist,
  selectDeckName,
  selectSaveOrSaveAs,
  selectSearchOrDecks
} from "../../../store/deckBuilder-selector";
import {
  loadDeck,
  setDeckName,
  toggleSaveOrSaveAs,
  toggleSearchOrDecks
} from "../../../store/deckBuilder-actions";
import closedDeckBoxImg from "../resources/deckbox-closed.jpg";
import { addSavedDeck } from "../utils/localStorageInteractions";

const ActiveDeckWindow = () => {

  const decklist = useSelector(selectDecklist);
  const deckName = useSelector(selectDeckName);
  const searchOrDecks = useSelector(selectSearchOrDecks);
  const saveOrSaveAs = useSelector(selectSaveOrSaveAs);
  const dispatch = useDispatch();

  const [newDeckName, setNewDeckName] = useState('');

  const clearDeck = () => dispatch(loadDeck({name: '', deck: []}));

  const emptyDeck = decklist.length === 0;
  const noNewNameSet = newDeckName === '';
  const saveMode = saveOrSaveAs === 'save';
  const saveAsMode = saveOrSaveAs === 'saveAs';

  const deckNameDisplay = () => {
    return emptyDeck || saveAsMode
      ? <div className="active-deck-name">
        <input
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          placeholder="new deck"/>
      </div>
      : <div className="active-deck-name">{deckName}</div>;
  }

  const saveDisabled = emptyDeck || (saveAsMode && noNewNameSet);
  const handleSaveDeck = () => {
    if (saveMode) {
      addSavedDeck(deckName, decklist);
    } else if (saveAsMode) {
      addSavedDeck(newDeckName, decklist);
      dispatch(setDeckName(newDeckName));
      dispatch(toggleSearchOrDecks());
      dispatch(toggleSaveOrSaveAs());
      setNewDeckName('');
    }
  }

  const saveAsDisabled = emptyDeck;
  const handleClickSaveAs = () => {
    dispatch(toggleSaveOrSaveAs());
    dispatch(toggleSearchOrDecks());
  }
  const saveAsDisplay = () => {
    return saveAsMode
      ? <button type="button" onClick={handleClickSaveAs} disabled={saveAsDisabled}>Cancel</button>
      : <button type="button" onClick={handleClickSaveAs} disabled={saveAsDisabled}>Save As</button>;
  }


  return (
    <div className="active-deck-window">
      {/*<div className="deck-box-img-container">*/}
      {/*  <img className="deck-box-img" src={closedDeckBoxImg}/>*/}
      {/*</div>*/}
      <div className="this-deck">
        {deckNameDisplay()}
        <div className="button-set-horizontal">
          <button type="button" onClick={handleSaveDeck} disabled={saveDisabled}>Save</button>
          {saveAsDisplay()}
        </div>
      </div>
      <div className="other-decks">
        <div className="button-set-vertical">
          <button type="button" onClick={clearDeck} disabled={emptyDeck || saveAsMode}>
            Clear</button>
          <button type="button" onClick={() => dispatch(toggleSearchOrDecks())} disabled={saveAsMode}>
            {searchOrDecks === 'search' ? 'Manage Decks' : 'Card Search'}</button>
        </div>
      </div>
    </div>
  );
}

export default ActiveDeckWindow;
