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
import { selectSearchOrDecks } from "../store/deckBuilder-selector";

const DeckBuilder = () => {

  const searchOrDecks = useSelector(selectSearchOrDecks);

  const [sortRowsBy, setSortRowsBy] = useState(rowsBy.none);
  const [sortColumnsBy, setSortColumnsBy] = useState(columnsBy.cmc);
  const [landPositionBy, setLandPositionBy] = useState(assignLandPositionBy.bottom);
  const [viewDeckBy, setViewDeckBy] = useState(viewBy.images);

  const subOptionstoRender = () => {
    switch (viewDeckBy) {
      case viewBy.images:
        return (
          <div className="view-sub-options">
            <OptionSetImages options={Object.keys(columnsBy)} sources={columnIcons} selectOption={setSortColumnsBy}/>
            <OptionSetImages options={Object.keys(rowsBy)} sources={rowIcons} selectOption={setSortRowsBy}/>
            <OptionSetImages options={Object.keys(assignLandPositionBy)} sources={landPositionIcons} selectOption={setLandPositionBy} defaultOption={1}/>
          </div>
        );
      default:
        return <div></div>;
    }
  }

  return (
    <div className="deck-builder">

      <div className="decklist-options">
        <div className="main-view-options">
          <OptionSetImages options={Object.keys(viewBy)} sources={viewIcons} selectOption={setViewDeckBy}/>
        </div>
        {subOptionstoRender()}
        <ActiveDeckWindow />
      </div>

      {searchOrDecks === 'search' ? <AddCardsMenu /> : <SaveDeckMenu />}

      <DeckView
        sortRowsBy={sortRowsBy}
        sortColumnsBy={sortColumnsBy}
        landPositionBy={landPositionBy}
        viewDeckBy={viewDeckBy}
      />


    </div>
  );
};

export default DeckBuilder;