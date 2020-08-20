import React, { useState } from 'react';
import './deckbuilder.scss';
import { nextInArray } from "./utils/utils";
import SaveAndLoadDecksMenu from "./components/SaveAndLoadDecksMenu";
import DecklistOptions from "./components/DecklistOptions";
import { sortBy, splitBy, viewBy } from "./utils/enums";
import DeckView from "./components/DeckView";
import AddCardsMenu from "./components/AddCardsMenu";
import SaveDeckMenu from "./components/SaveDeckMenu";

const DeckBuilder = () => {

  const [sortColumnsBy, setSortColumnsBy] = useState(sortBy.cmc);
  const [splitColumnsBy, setSplitColumnsBy] = useState(splitBy.none);
  const [viewDeckBy, setViewDeckBy] = useState(viewBy.images);
  const [dispalyAddOrSave, setDisplayAddOrSave] = useState('add');

  const displayOptions = ['add', 'save'];
  const toggleDisplayAddOrSave = () =>
    setDisplayAddOrSave(display => nextInArray(displayOptions, display));

  return (
    <div className="deck-builder">

      <DecklistOptions
        sortOptions={Object.keys(sortBy)} setSortBy={setSortColumnsBy}
        splitOptions={Object.keys(splitBy)} setSplitBy={setSplitColumnsBy}
        viewOptions={Object.keys(viewBy)} setViewBy={setViewDeckBy}
      />

      <SaveAndLoadDecksMenu toggleDisplayAddOrSave={toggleDisplayAddOrSave}/>

      <DeckView
        sortColumnsBy={sortColumnsBy}
        splitColumnsBy={splitColumnsBy}
        viewDeckBy={viewDeckBy}
      />

      {dispalyAddOrSave === 'add' ? <AddCardsMenu /> : <SaveDeckMenu />}

    </div>
  );
};

export default DeckBuilder;