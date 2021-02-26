import React, { useState } from 'react';
import './deckbuilder.scss';
import './components/decklist-options.scss';
import ActiveDeckWindow from "./components/ActiveDeckWindow";
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
import { useSelector } from "react-redux";
import { selectSearchOrDecks } from "../../store/deckBuilder-selector";

const DeckBuilder = () => {

  const searchOrDecks = useSelector(selectSearchOrDecks);

  const [sortRowsBy, setSortRowsBy] = useState(rowsBy.none);
  const [sortColumnsBy, setSortColumnsBy] = useState(columnsBy.cmc);
  const [landPositionBy, setLandPositionBy] = useState(assignLandPositionBy.bottom);
  const [viewDeckBy, setViewDeckBy] = useState(viewBy.images);

  const optionstoRender = () => {
    switch (viewDeckBy) {
      case viewBy.images:
        return (
          <div className="main-view-options">
            <OptionSetImages options={Object.keys(viewBy)} sources={viewIcons} selectOption={setViewDeckBy}/>

            <OptionSetImages options={Object.keys(columnsBy)} sources={columnIcons}
                             selectOption={setSortColumnsBy}/>
            <OptionSetImages options={Object.keys(rowsBy)} sources={rowIcons}
                             selectOption={setSortRowsBy}/>
            <OptionSetImages options={Object.keys(assignLandPositionBy)} sources={landPositionIcons}
                             selectOption={setLandPositionBy} defaultOption={1}/>
          </div>
        );
      default:
        return <OptionSetImages options={Object.keys(viewBy)} sources={viewIcons} selectOption={setViewDeckBy}/>

    }
  }

  return (
    <div className="deck-builder-container">

      <div className="deck-builder">

        <div className="decklist-options">
          {optionstoRender()}
          <ActiveDeckWindow/>
        </div>

        <div className="decklist-side-panel">
          {searchOrDecks === 'search' ? <AddCardsMenu/> : <SaveDeckMenu/>}
        </div>

        <DeckView
          sortRowsBy={sortRowsBy}
          sortColumnsBy={sortColumnsBy}
          landPositionBy={landPositionBy}
          viewDeckBy={viewDeckBy}
        />

      </div>

    </div>
  );
};

export default DeckBuilder;
