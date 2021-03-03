export const chartOptions = (titleText: string) => {
  return {
    scales: {
      yAxes: [{ticks: {beginAtZero: true, stepSize: 2}}]
    },
    title: {
      display: true,
      text: titleText,
    },
    legend: {
      display: false,
    },
  };
}