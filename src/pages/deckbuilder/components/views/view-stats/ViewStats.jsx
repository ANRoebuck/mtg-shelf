import React from 'react';
import Legalities from './Legalities';
import StatsTableCMC from './StatsTableCMC';
import StatsTableColour from './StatsTableColour';
import StatsTableSampleHand from './StatsTableSampleHand';
import StatsTableType from './StatsTableType';
import './view-stats.scss';


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
