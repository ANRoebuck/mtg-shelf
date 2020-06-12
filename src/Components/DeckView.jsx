import React, { useState } from "react";
import Maindeck from './Maindeck';
import Sideboard from './Sideoard';
import DecklistOptions from "./DecklistOptions";
import { sortBy, splitBy, viewBy } from "./enums";
import ViewImages from "./ViewImages";
import ViewPrintable from "./ViewPrintable";

const DeckView = ({ decklist, sortColumnsBy, splitColumnsBy, viewDeckBy, sideIn, sideOut }) => {

  const maindeck = decklist.filter(({ ms }) => ms === 'm');
  const sideboard = decklist.filter(({ ms }) => ms === 's');

  const selectView = (viewDeckBy) => {
    switch (viewDeckBy) {
      case viewBy.images:
        return (<ViewImages />);
      case viewBy.printable:
        return (<ViewPrintable />);
      default:
        return null;
    };
  };

  const viewToRender = selectView(viewDeckBy);

  return (
    <div className="deck-view">
      {viewToRender}
    </div>
  );
};

export default DeckView;