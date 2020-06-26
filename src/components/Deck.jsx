import React, { useState } from "react";
import DecklistOptions from "./DecklistOptions";
import { sortBy, splitBy, viewBy } from "./enums";
import DeckView from './DeckView';
import { setDecklist } from "../store/deckBuilder-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectDecklist } from "../store/deckBuilder-selector";

const Deck = () => {

  const [sortColumnsBy, setSortColumnsBy] = useState(sortBy.cmc);
  const [splitColumnsBy, setSplitColumnsBy] = useState(splitBy.none);
  const [viewDeckBy, setViewDeckBy] = useState(viewBy.images);

  const decklist = useSelector(selectDecklist);
  const dispatch = useDispatch();

  const updateDecklist = (newList) => dispatch(setDecklist(newList))

  const saveDeck = () => localStorage.setItem('savedDeck', JSON.stringify(decklist));
  const loadDeck = () => updateDecklist(JSON.parse(localStorage.getItem('savedDeck')));

  return (
    <div className="deck">
      <DecklistOptions
        sortOptions={Object.keys(sortBy)} setSortBy={setSortColumnsBy}
        splitOptions={Object.keys(splitBy)} setSplitBy={setSplitColumnsBy}
        viewOptions={Object.keys(viewBy)} setViewBy={setViewDeckBy}
        saveDeck={saveDeck}
        loadDeck={loadDeck}
      />
      <DeckView
        sortColumnsBy={sortColumnsBy}
        splitColumnsBy={splitColumnsBy}
        viewDeckBy={viewDeckBy}
      />
    </div>
  );
};

export default Deck;