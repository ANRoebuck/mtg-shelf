import React from "react";
import DeckListColumn from "./DeckListColumn";
import { splitBy } from "./enums";
import { useSelector } from "react-redux";
import { selectSideboard } from "../store/deckBuilder-selector";
import { sideIn } from "../store/deckBuilder-actions";

const Sideboard = () => {
  const sideboard = useSelector(selectSideboard);

  return (
    <div className="sideboard">
      <DeckListColumn cards={sideboard} sideInOrOut={sideIn} split={splitBy.none} />
    </div>
  );
};

export default Sideboard;