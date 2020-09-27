import React from "react";
import StatsTableCMC from "./StatsTableCMC";
import Finance from "./Finance";
import StatsTableColour from "./StatsTableColour";
import Legalities from "./Legalities";
import './view-stats.scss';
import StatsTableType from "./StatsTableType";
import StatsTableSampleHand from "./StatsTableSampleHand";


const ViewStats = () => {

  return (
    <div className="view-stats">
      <StatsTableCMC />
      <StatsTableColour />
      <StatsTableType />
      <StatsTableSampleHand />
      <Legalities />
      {/*<Finance finance={finance} />*/}
    </div>
  );
};

export default ViewStats;