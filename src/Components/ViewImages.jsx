import React from "react";
import ColumnSorter from "./ColumnSorter";
import DeckListColumn from "./DeckListColumn";
import Sideboard from "./Sideoard";


const Maindeck = ({ maindeck, sideOut, sortColumnsBy, splitColumnsBy }) => {

  return (
    <div className="view-images">
      <Maindeck maindeck={maindeck} sideOut={sideOut} sortColumnsBy={sortColumnsBy} splitColumnsBy={splitColumnsBy}/>
      <Sideboard sideboard={sideboard} sideIn={sideIn}/>
    </div>
  );
};

export default Maindeck;