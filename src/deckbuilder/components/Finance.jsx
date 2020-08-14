import React from "react";
import { viewBy } from "../enums";
import ViewImages from './ViewImages';
import ViewPrintable from './ViewPrintable';
import ViewStats from './ViewStats';

const Finance = ({ finance }) => {

  return (
    <div className="single-stat">
      FINANCE {JSON.stringify(finance)}
    </div>
  );
};

export default Finance;