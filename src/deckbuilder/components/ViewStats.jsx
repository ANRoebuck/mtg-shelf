import React from "react";
import { financeDeck, cardsByCMC, cardsByColour, legalityByFormat } from "../utils";
import { useSelector } from "react-redux";
import { selectMaindeck, selectSideboard } from "../../store/deckBuilder-selector";


const ViewStats = () => {

  const maindeck = useSelector(selectMaindeck);
  const sideboard = useSelector(selectSideboard);

  const statsByFinance = financeDeck([...maindeck, ...sideboard]);
  const statsByCMC = cardsByCMC(maindeck);
  const statsByColour = cardsByColour(maindeck);
  const legalities = legalityByFormat([...maindeck, ...sideboard]);

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
      <div className="single-stat">
        FORMAT LEGALITIES {JSON.stringify(legalities)}
      </div>
    </div>
  );
};

export default ViewStats;