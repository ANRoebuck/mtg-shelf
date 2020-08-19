import React, { useState } from 'react';
import './deckbuilder.scss';
import CardSearch from "./components/CardSearch";
import CardImport from "./components/CardImport";
import { nextInArray } from "./utils";
import SavedDecksMenu from "./components/SavedDecksMenu";
import DecklistOptions from "./components/DecklistOptions";
import { sortBy, splitBy, viewBy } from "./enums";
import DeckView from "./components/DeckView";

const displayOptions = ['search', 'import'];

const DeckBuilder = () => {
  const [sortColumnsBy, setSortColumnsBy] = useState(sortBy.cmc);
  const [splitColumnsBy, setSplitColumnsBy] = useState(splitBy.none);
  const [viewDeckBy, setViewDeckBy] = useState(viewBy.images);
  const [display, setDisplay] = useState('search');

  const nextDisplay = () => setDisplay(display => nextInArray(displayOptions, display));

  const toDisplay = display === 'search' ? <CardSearch /> : <CardImport />;

  return (
    <div className="deck-builder">

      <DecklistOptions
        sortOptions={Object.keys(sortBy)} setSortBy={setSortColumnsBy}
        splitOptions={Object.keys(splitBy)} setSplitBy={setSplitColumnsBy}
        viewOptions={Object.keys(viewBy)} setViewBy={setViewDeckBy}
      />

      <SavedDecksMenu/>

      <DeckView
        sortColumnsBy={sortColumnsBy}
        splitColumnsBy={splitColumnsBy}
        viewDeckBy={viewDeckBy}
      />

      <div className="search-container">
        <button type="button" onClick={nextDisplay}>Search / Import</button>
        {toDisplay}
      </div>

    </div>
  );
};

export default DeckBuilder;