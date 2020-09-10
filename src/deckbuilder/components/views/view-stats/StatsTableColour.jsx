import React from "react";

const StatsTableColour = ({ statsByColour }) => {

  return (
    <div className="single-stat">
      CARDS BY COLOUR {JSON.stringify(statsByColour)}
    </div>
  );
};

export default StatsTableColour;