import React from "react";
import { viewBy } from "../enums";
import ViewImages from './ViewImages';
import ViewPrintable from './ViewPrintable';
import ViewStats from './ViewStats';

const StatsTableCMC = ({ statsByCMC }) => {

  return (
    <div className="single-stat">
      CARDS BY CMC {JSON.stringify(statsByCMC)}
    </div>
  );
};

export default StatsTableCMC;