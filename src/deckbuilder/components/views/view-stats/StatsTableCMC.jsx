import React from "react";

const StatsTableCMC = ({ statsByCMC }) => {

  return (
    <div className="single-stat">
      CARDS BY CMC {JSON.stringify(statsByCMC)}
    </div>
  );
};

export default StatsTableCMC;