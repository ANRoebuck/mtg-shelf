import React from "react";
import { cardsByName } from "../../../utils/utils";
import { useSelector } from "react-redux";
import { selectMaindeck, selectSideboard } from "../../../../../store/deckBuilder-selector";


const ViewPrintable = () => {

  const maindeck = useSelector(selectMaindeck);
  const sideboard = useSelector(selectSideboard);

  const groupedMaindeck = cardsByName(maindeck);
  const groupedSideboard = cardsByName(sideboard);

  const maindeckRows = Object.entries(groupedMaindeck).map(([cardname, cards]) =>
    <div>{`${cards.length}  ${cardname}`}</div>);

  const sideboardRows = Object.entries(groupedSideboard).map(([cardname, cards]) =>
    <div>{`${cards.length}  ${cardname}`}</div>);

  const maindeckCount = `(${maindeck.length})`
  const sideboardCount = `(${sideboard.length})`

  return (
    <div className="view-printable">
      <div className="printable-column">
        <div className="printable-column-title">Maindeck {maindeckCount}</div>
        <div className="printable-column-cards">{maindeckRows}</div>
      </div>
      <div className="printable-column">
        <div className="printable-column-title">Sideboard {sideboardCount}</div>
        <div className="printable-column-cards">{sideboardRows}</div>
      </div>
    </div>
  );
};

export default ViewPrintable;
