import React from "react";
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { selectMaindeck } from "../../../../store/deckBuilder-selector";
import { cardsByCMC, nonLands } from "../../../utils/utils";
import { chartOptions } from "./utils";

const StatsTableCMC = () => {

  const maindeck = useSelector(selectMaindeck);

  const nonLandCards = nonLands(maindeck);
  const statsByCMC = cardsByCMC(nonLandCards);

  const labels = Object.keys(statsByCMC);
  const chartData = labels.map(label => statsByCMC[label]);
  const chartColours = labels.map(label => 'black');
  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: chartColours,
      }
    ]
  };

  const options = chartOptions(`Nonland Cards by CMC (${nonLandCards.length})`);

  return (
    <div className="single-stat cmc">
      <Bar data={data} options={options}/>
    </div>
  );
};

export default StatsTableCMC;