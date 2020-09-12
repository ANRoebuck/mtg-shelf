import React from "react";
import { Bar } from "react-chartjs-2";
import { cardsByType, typesByTypeIndex } from "../../../utils/utils";
import { useSelector } from "react-redux";
import { selectMaindeck } from "../../../../store/deckBuilder-selector";
import { chartOptions } from "./utils";

const StatsTableType = () => {

  const maindeck = useSelector(selectMaindeck);

  const statsByType = cardsByType(maindeck);


  const labels = Object.keys(statsByType).sort(typesByTypeIndex);
  const chartData = labels.map(label => statsByType[label]);
  const chartColours = labels.map(label => 'black');
  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: chartColours,
      }
    ],
  };

  const options = chartOptions(`Cards by Type (${maindeck.length})`);

  return (
    <div className="single-stat">
      <Bar data={data} options={options}/>
    </div>
  );
};

export default StatsTableType;