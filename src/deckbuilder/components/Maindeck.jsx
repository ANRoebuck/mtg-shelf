import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMaindeck } from "../../store/deckBuilder-selector";
import { sideOut } from "../../store/deckBuilder-actions";
import RowSorter from "./RowSorter";
import DeckListRow from "./DeckListRow";

const Maindeck = ({ sortRowsBy, sortColumnsBy, landPositionBy }) => {

  const maindeck = useSelector(selectMaindeck);
  const dispatch = useDispatch();

  const rowSorter = new RowSorter();
  let rows = rowSorter.sortRowsBy(maindeck, sortRowsBy);
  rows = rowSorter.landPositionBy(rows, landPositionBy);

  const rowsToRender = Object.entries(rows).map(([key, cards]) =>
    <DeckListRow
      cards={cards}
      sideInOrOut={(card) => dispatch(sideOut(card))}
      sortColumnsBy={key === 'lands' ? 'lands' : sortColumnsBy}
    />);

  return (
    <div className="maindeck">
      {rowsToRender}
    </div>
  );
};

export default Maindeck;