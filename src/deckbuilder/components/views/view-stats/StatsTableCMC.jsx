import React from "react";
import { Bar } from 'react-chartjs-2';

const StatsTableCMC = ({ statsByCMC }) => {

  const labels = Object.keys(statsByCMC);
  const chartData = labels.map(label => statsByCMC[label]);
  // const chartColours = labels.map(label => faker.commerce.color());
  // console.log(chartColours);

  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        // backgroundColor: chartColours
      }
    ]
  };

  // const data = {
  //   labels: [Object.keys(statsByCMC)],
  //   datasets: Object.values(statsByCMC).map(value => ({
  //     barPercentage: 0.5,
  //     barThickness: 6,
  //     maxBarThickness: 8,
  //     minBarLength: 2,
  //     data: [value],
  //   }))
  // };

  return (
    <div className="single-stat">
      CARDS BY CMC {JSON.stringify(statsByCMC)}
      <Bar data={data} />
    </div>
  );
};

export default StatsTableCMC;