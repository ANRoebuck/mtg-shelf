import React from "react";
import { Bar } from 'react-chartjs-2';

const StatsTableCMC = ({statsByCMC}) => {

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

  const options = {
    scales: {
      yAxes: [{ticks: {beginAtZero: true, stepSize: 1}}]
    },
    title: {
      display: true,
      text: 'Nonland Cards by CMC',
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

export default StatsTableCMC;