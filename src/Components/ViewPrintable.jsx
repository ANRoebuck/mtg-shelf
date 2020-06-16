import React from "react";
import ColumnSorter from "./ColumnSorter";
import DeckListColumn from "./DeckListColumn";
import { groupCardsByName } from "./utils";


const ViewPrintable = ({ maindeck, sideboard, sideOut, sideIn, sortColumnsBy, splitColumnsBy }) => {

  const groupedMaindeck = groupCardsByName(maindeck);
  const groupedSideboard = groupCardsByName(sideboard);

  const maindeckRows = Object.entries(groupedMaindeck).map(([cardname, cards]) =>
    <div>{`${cards.length}  ${cardname}`}</div>);

  const sideboardRows = Object.entries(groupedSideboard).map(([cardname, cards]) =>
    <div>{`${cards.length}  ${cardname}`}</div>);

  const maindeckCount = `(${maindeckRows.length})`
  const sideboardCount = `(${sideboardRows.length})`

  return (
    <div className="view-printable">
      <div className="printable-column">
        Maindeck {maindeckCount}
        {maindeckRows}
      </div>
      <div className="printable-column">
        Sideboard {sideboardCount}
        {sideboardRows}
      </div>
    </div>
  );
};

export default ViewPrintable;