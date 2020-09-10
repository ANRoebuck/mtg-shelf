import React from "react";
import Sideboard from '../../Sideoard';
import Maindeck from '../../Maindeck';


const ViewImages = ({ sortRowsBy, sortColumnsBy, landPositionBy }) => {

  return (
    <div className="view-images">
      <Maindeck sortRowsBy={sortRowsBy} sortColumnsBy={sortColumnsBy} landPositionBy={landPositionBy} />
      <Sideboard />
    </div>
  );
};

export default ViewImages;