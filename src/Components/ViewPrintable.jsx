import React from "react";
import ColumnSorter from "./ColumnSorter";
import DeckListColumn from "./DeckListColumn";
import { groupCardsByName } from "./utils";


const ViewPrintable = ({ maindeck, sideboard, sideOut, sideIn, sortColumnsBy, splitColumnsBy }) => {

  const groupedMaindeck = groupCardsByName(maindeck);
  console.log(groupedMaindeck);
  console.log(Object.entries(groupedMaindeck));
  Object.entries(groupedMaindeck).forEach(([cardname, cards]) => {
    console.log(cardname);
    console.log(cards);
  });
  const divs = Object.entries(groupedMaindeck).map(([cardname, cards]) =>
    <div>{`${cards.length}  ${cardname}`}</div>);

  return (
    <div className="view-printable">
      {divs}
    </div>
  );
};

export default ViewPrintable;