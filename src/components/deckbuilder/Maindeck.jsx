import React from "react";
import ColumnSorter from "./ColumnSorter";
import DeckListColumn from "./DeckListColumn";
import { useDispatch, useSelector } from "react-redux";
import { selectMaindeck } from "../../store/deckBuilder-selector";
import { sideOut } from "../../store/deckBuilder-actions";


const Maindeck = ({ sortColumnsBy, splitColumnsBy }) => {
  const maindeck = useSelector(selectMaindeck);
  const dispatch = useDispatch();

  const columnSorter = new ColumnSorter();
  const columns = columnSorter.assignColumns(maindeck, sortColumnsBy);

  const columnsToRender = Object.entries(columns).map(([ cmc, cards ]) =>
    <DeckListColumn cards={cards} sideInOrOut={(card) => dispatch(sideOut(card))} split={splitColumnsBy} />);

  return (
    <div className="maindeck">
      {columnsToRender}
    </div>
  );
};

export default Maindeck;