import React from "react";
import { Bar } from "react-chartjs-2";
import { cardsByColour, coloursByColourIndex, colourToColourName, nonLands } from "../../../utils/utils";
import { useSelector } from "react-redux";
import { selectMaindeck } from "../../../../../store/deckBuilder-selector";
import { chartOptions } from "./utils";

const StatsTableColour = () => {

  const maindeck = useSelector(selectMaindeck);

  const nonLandCards = nonLands(maindeck);
  const statsByColour = cardsByColour(nonLandCards);

  const labels = Object.keys(statsByColour).sort(coloursByColourIndex);
  const chartData = labels.map(label => statsByColour[label]);
  const chartColours = labels.map(label => colourToColourName(label));
  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: chartColours,
      }
    ],
  };

  const options = chartOptions(`Nonland Cards by Colour (${nonLandCards.length})`);

  return (
    <div className="single-stat colour">
      <Bar data={data} options={options}/>
    </div>
  );
};

export default StatsTableColour;
