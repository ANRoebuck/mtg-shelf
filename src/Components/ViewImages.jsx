import React from "react";
import Sideboard from './Sideoard';
import Maindeck from './Maindeck';


const ViewImages = ({ maindeck, sideboard, sideOut, sideIn, sortColumnsBy, splitColumnsBy }) => {

  return (
    <div className="view-images">
      <Maindeck maindeck={maindeck} sideOut={sideOut} sortColumnsBy={sortColumnsBy} splitColumnsBy={splitColumnsBy}/>
      <Sideboard sideboard={sideboard} sideIn={sideIn}/>
    </div>
  );
};

export default ViewImages;