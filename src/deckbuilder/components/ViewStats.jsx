import React from "react";
import { financeDeck, cardsByCMC, cardsByColour, legalityByFormat } from "../utils/utils";
import { useSelector } from "react-redux";
import { selectMaindeck, selectSideboard } from "../../store/deckBuilder-selector";
import StatsTableCMC from "./StatsTableCMC";
import Finance from "./Finance";
import StatsTableColour from "./StatsTableColour";
import Legalities from "./Legalities";


const ViewStats = () => {

  const maindeck = useSelector(selectMaindeck);
  const sideboard = useSelector(selectSideboard);

  const statsByCMC = cardsByCMC(maindeck);
  const statsByColour = cardsByColour(maindeck);
  const legalities = legalityByFormat([...maindeck, ...sideboard]);
  // const finance = financeDeck([...maindeck, ...sideboard]);

  return (
    <div className="view-stats">
      STATS
      <StatsTableCMC statsByCMC={statsByCMC} />
      <StatsTableColour statsByColour={statsByColour} />
      <Legalities legalities={legalities} />
      {/*<Finance finance={finance} />*/}
    </div>
  );
};

export default ViewStats;