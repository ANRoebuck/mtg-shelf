import React from "react";
import Sideboard from './Sideoard';
import Maindeck from './Maindeck';


const ViewImages = ({ sortColumnsBy, splitColumnsBy }) => {

  return (
    <div className="view-images">
      <Maindeck sortColumnsBy={sortColumnsBy} splitColumnsBy={splitColumnsBy} />
      <Sideboard />
    </div>
  );
};

export default ViewImages;