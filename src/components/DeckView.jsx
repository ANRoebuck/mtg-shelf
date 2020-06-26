import React from "react";
import { viewBy } from "./enums";
import ViewImages from './ViewImages';
import ViewPrintable from './ViewPrintable';
import ViewStats from './ViewStats';

const DeckView = ({decklist, sortColumnsBy, splitColumnsBy, viewDeckBy, sideIn, sideOut, removeCard }) => {

  const maindeck = decklist.filter(({ms}) => ms === 'm');
  const sideboard = decklist.filter(({ms}) => ms === 's');

  const selectView = (viewDeckBy) => {
    switch (viewDeckBy) {
      case viewBy.images:
        return (
          <ViewImages
            maindeck={maindeck} sideboard={sideboard}
            sideOut={sideOut} sideIn={sideIn}
            sortColumnsBy={sortColumnsBy} splitColumnsBy={splitColumnsBy}
            removeCard={removeCard}
          />
        );
      case viewBy.printable:
        return (
          <ViewPrintable
            maindeck={maindeck} sideboard={sideboard}
            sideOut={sideOut} sideIn={sideIn}
          />);
      case viewBy.stats:
        return (
          <ViewStats maindeck={maindeck} sideboard={sideboard}/>
        )
      default:
        return null;
    }
  };

  const viewToRender = selectView(viewDeckBy);

  return (
    <div className="deck-view">
      {viewToRender}
    </div>
  );
};

export default DeckView;