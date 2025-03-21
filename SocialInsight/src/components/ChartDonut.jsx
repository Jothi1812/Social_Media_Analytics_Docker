import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDonut = ({ likes, comments, shares }) => {
  // Chart data based on likes, comments, and shares
  const data = {
    labels: ["Likes", "Comments", "Shares"],
    datasets: [
      {
        label: "Engagement Data",
        data: [likes, comments, shares],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
        hoverOffset: 4,
      },
    ],
  };

  // Chart options for a donut style
  const options = {
    responsive: true,
    cutout: "70%", // Makes the chart a donut by cutting out the middle
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="chart-donut-container">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ChartDonut;
