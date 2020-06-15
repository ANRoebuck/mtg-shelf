import React from "react";
import { viewBy } from "./enums";
import ViewImages from './ViewImages';
import ViewPrintable from './ViewPrintable';

const DeckView = ({decklist, sortColumnsBy, splitColumnsBy, viewDeckBy, sideIn, sideOut}) => {

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
          />
        );
      case viewBy.printable:
        return (
          <ViewPrintable
            maindeck={maindeck} sideboard={sideboard}
            sideOut={sideOut} sideIn={sideIn}
          />);
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