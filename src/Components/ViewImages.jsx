import React from "react";
import Sideboard from './Sideoard';
import Maindeck from './Maindeck';


const ViewImages = ({ maindeck, sideboard, sideOut, sideIn, sortColumnsBy, splitColumnsBy, removeCard }) => {

  return (
    <div className="view-images">
      <Maindeck maindeck={maindeck} sideOut={sideOut} sortColumnsBy={sortColumnsBy} splitColumnsBy={splitColumnsBy} removeCard={removeCard} />
      <Sideboard sideboard={sideboard} sideIn={sideIn} removeCard={removeCard}/>
    </div>
  );
};

export default ViewImages;