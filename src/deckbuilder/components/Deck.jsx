import React, { useState } from "react";
import DecklistOptions from "./DecklistOptions";
import { sortBy, splitBy, viewBy } from "../enums";
import DeckView from './DeckView';
import './deck.scss';

const Deck = () => {

  const [sortColumnsBy, setSortColumnsBy] = useState(sortBy.cmc);
  const [splitColumnsBy, setSplitColumnsBy] = useState(splitBy.none);
  const [viewDeckBy, setViewDeckBy] = useState(viewBy.images);


  return (
    <div className="deck">
      <DecklistOptions
        sortOptions={Object.keys(sortBy)} setSortBy={setSortColumnsBy}
        splitOptions={Object.keys(splitBy)} setSplitBy={setSplitColumnsBy}
        viewOptions={Object.keys(viewBy)} setViewBy={setViewDeckBy}

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