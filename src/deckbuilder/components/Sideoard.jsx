import React from "react";
import DeckListColumn from "./DeckListColumn";
import { splitBy } from "../utils/enums";
import { useDispatch, useSelector } from "react-redux";
import { selectSideboard } from "../../store/deckBuilder-selector";
import { sideIn } from "../../store/deckBuilder-actions";

const Sideboard = () => {
  const sideboard = useSelector(selectSideboard);
  const dispatch = useDispatch();

  return (
    <div className="sideboard">
      <DeckListColumn cards={sideboard} sideInOrOut={(card) => dispatch(sideIn(card))} split={splitBy.none} />
    </div>
  );
};

export default Sideboard;