import React from "react";
import { Bar } from "react-chartjs-2";
import { coloursByColourIndex, colourToColourName } from "../../../utils/utils";

const StatsTableColour = ({statsByColour}) => {

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

  const options = {
    scales: {
      yAxes: [{ticks: {beginAtZero: true, stepSize: 1}}]
    },
    title: {
      display: true,
      text: 'Nonland Cards by Colour',
    },
    legend: {
      display: false,
    },
  };

  return (
    <div className="single-stat">
      <Bar data={data} options={options}/>
    </div>
  );
};

export default StatsTableColour;