import React, { useState } from "react";
import DecklistOptions from "./DecklistOptions";
import { sortBy, splitBy, viewBy } from "./enums";
import DeckView from './DeckView';

const Deck = ({ decklist, sideIn, sideOut }) => {
  const [sortColumnsBy, setSortColumnsBy] = useState(sortBy.cmc);
  const [splitColumnsBy, setSplitColumnsBy] = useState(splitBy.none);
  const [viewDeckBy, setViewDeckBy] = useState(viewBy.images);

  return (
    <div className="decklist">
      <DecklistOptions
        sortOptions={Object.keys(sortBy)} setSortBy={setSortColumnsBy}
        splitOptions={Object.keys(splitBy)} setSplitBy={setSplitColumnsBy}
        viewOptions={Object.keys(viewBy)} setViewBy={setViewDeckBy}
      />
      <DeckView
        decklist={decklist}
        sortColumnsBy={sortColumnsBy} splitColumnsBy={splitColumnsBy} viewDeckBy={viewDeckBy}
        sideIn={sideIn} sideOut={sideOut}
      />
    </div>
  );
};

export default Deck;