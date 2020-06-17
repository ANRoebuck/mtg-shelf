import React from "react";
import { financeDeck, cardsByCMC, cardsByColour } from "./utils";


const ViewStats = ({ maindeck, sideboard }) => {

  const statsByFinance = financeDeck([...maindeck, ...sideboard]);
  const statsByCMC = cardsByCMC(maindeck);
  const statsByColour = cardsByColour(maindeck);

  return (
    <div className="view-stats">
      STATS
      <div className="single-stat">
        FINANCE {JSON.stringify(statsByFinance)}
      </div>
      <div className="single-stat">
        CARDS BY CMC {JSON.stringify(statsByCMC)}
      </div>
      <div className="single-stat">
        CARDS BY COLOUR {JSON.stringify(statsByColour)}
      </div>
    </div>
  );
};

export default ViewStats;