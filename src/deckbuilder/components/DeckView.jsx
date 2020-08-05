import React from "react";
import { viewBy } from "../enums";
import ViewImages from './ViewImages';
import ViewPrintable from './ViewPrintable';
import ViewStats from './ViewStats';

const DeckView = ({ sortColumnsBy, splitColumnsBy, viewDeckBy }) => {

  const selectView = (viewDeckBy) => {
    switch (viewDeckBy) {
      case viewBy.images:
        return <ViewImages sortColumnsBy={sortColumnsBy} splitColumnsBy={splitColumnsBy} />
      case viewBy.printable:
        return <ViewPrintable />
      case viewBy.stats:
        return <ViewStats />
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