import React from "react";
import StatsTableCMC from "./StatsTableCMC";
import Finance from "./Finance";
import StatsTableColour from "./StatsTableColour";
import Legalities from "./Legalities";
import './view-stats.scss';
import StatsTableType from "./StatsTableType";


const ViewStats = () => {

  return (
    <div className="view-stats">
      <StatsTableCMC />
      <StatsTableColour />
      <StatsTableType />
      {/*<Legalities legalities={legalities} />*/}
      {/*<Finance finance={finance} />*/}
    </div>
  );
};

export default ViewStats;