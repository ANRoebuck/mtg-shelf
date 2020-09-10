import React from "react";
import { viewBy } from "../utils/enums";
import ViewImages from './views/view-images/ViewImages';
import ViewPrintable from './views/view-printable/ViewPrintable';
import ViewStats from './views/view-stats/ViewStats';
import './deck-view.scss';

const DeckView = ({ sortRowsBy, sortColumnsBy, landPositionBy, viewDeckBy }) => {

  const selectView = (viewDeckBy) => {
    switch (viewDeckBy) {
      case viewBy.images:
        return <ViewImages sortRowsBy={sortRowsBy} sortColumnsBy={sortColumnsBy} landPositionBy={landPositionBy} />
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