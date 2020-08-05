import React, { useState } from 'react';
import '../DeckBuilder.css';
import CardSearch from "./components/CardSearch";
import Deck from "./components/Deck";
import CardImport from "./components/CardImport";
import { nextInArray } from "./utils";

const displayOptions = ['search', 'import'];

const DeckBuilder = () => {

  const [display, setDisplay] = useState('import');

  const nextDisplay = () => setDisplay(display => nextInArray(displayOptions, display));

  const toDisplay = display === 'search' ? <CardSearch /> : <CardImport />;

  return (
    <div className="deck-builder">
      <Deck />
      <div className="search-container">
        <button type="button" onClick={nextDisplay}>Search / Import</button>
        {toDisplay}
      </div>
    </div>
  );
};

export default DeckBuilder;