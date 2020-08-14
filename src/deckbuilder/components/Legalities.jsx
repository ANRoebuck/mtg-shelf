import React from "react";
import { viewBy } from "../enums";
import ViewImages from './ViewImages';
import ViewPrintable from './ViewPrintable';
import ViewStats from './ViewStats';

const Legalities = ({ legalities }) => {

  return (
    <div className="single-stat">
      FORMAT LEGALITIES {JSON.stringify(legalities)}
    </div>
  );
};

export default Legalities;