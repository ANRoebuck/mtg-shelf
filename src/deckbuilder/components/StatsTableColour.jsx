import React from "react";
import { viewBy } from "../enums";
import ViewImages from './ViewImages';
import ViewPrintable from './ViewPrintable';
import ViewStats from './ViewStats';

const StatsTableColour = ({ statsByColour }) => {

  return (
    <div className="single-stat">
      CARDS BY COLOUR {JSON.stringify(statsByColour)}
    </div>
  );
};

export default StatsTableColour;