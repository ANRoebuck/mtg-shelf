import React, { useState } from 'react';
import './deckbuilder.scss';
import './components/decklist-options.scss';
import { nextInArray } from "./utils/utils";
import SaveAndLoadDecksMenu from "./components/SaveAndLoadDecksMenu";
import {
  columnIcons,
  columnsBy,
  assignLandPositionBy,
  landPositionIcons,
  rowIcons,
  rowsBy,
  viewBy,
  viewIcons
} from "./utils/enums";
import DeckView from "./components/DeckView";
import AddCardsMenu from "./components/AddCardsMenu";
import SaveDeckMenu from "./components/SaveDeckMenu";
import OptionSetImages from "./components/OptionSetImages";

const DeckBuilder = () => {

  const [sortRowsBy, setSortRowsBy] = useState(rowsBy.none);
  const [sortColumnsBy, setSortColumnsBy] = useState(columnsBy.cmc);
  const [landPositionBy, setLandPositionBy] = useState(assignLandPositionBy.bottom);
  const [viewDeckBy, setViewDeckBy] = useState(viewBy.images);
  const [dispalyAddOrSave, setDisplayAddOrSave] = useState('add');

  const displayOptions = ['add', 'save'];
  const toggleDisplayAddOrSave = () =>
    setDisplayAddOrSave(display => nextInArray(displayOptions, display));

  return (
    <div className="deck-builder">

      <div className="decklist-options">
        <OptionSetImages options={Object.keys(columnsBy)} sources={columnIcons} selectOption={setSortColumnsBy}/>
        <OptionSetImages options={Object.keys(rowsBy)} sources={rowIcons} selectOption={setSortRowsBy}/>
        <OptionSetImages options={Object.keys(assignLandPositionBy)} sources={landPositionIcons} selectOption={setLandPositionBy} defaultOption={1}/>
        <OptionSetImages options={Object.keys(viewBy)} sources={viewIcons} selectOption={setViewDeckBy}/>
      </div>

      <SaveAndLoadDecksMenu toggleDisplayAddOrSave={toggleDisplayAddOrSave}/>

      <DeckView
        sortRowsBy={sortRowsBy}
        sortColumnsBy={sortColumnsBy}
        landPositionBy={landPositionBy}
        viewDeckBy={viewDeckBy}
      />

      {dispalyAddOrSave === 'add' ? <AddCardsMenu /> : <SaveDeckMenu />}

    </div>
  );
};

export default DeckBuilder;