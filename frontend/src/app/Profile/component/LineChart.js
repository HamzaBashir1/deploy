import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // Data for the chart
  const data = {
    labels: [
      '10. aug 2024',
      '14. aug 2024',
      '18. aug 2024',
      '22. aug 2024',
      '26. aug 2024',
      '30. aug 2024',
      '3. sep 2024',
      '7. sep 2024',
    ],
    datasets: [
      {
        label: 'Views',
        data: [0, 0, 0, 0, 0, 0, 400, 600],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Chart options for responsiveness
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 12 : 14, // Adjusted based on mobile/tablet/desktop
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 600,
        ticks: {
          stepSize: 100,
          font: {
            size: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 12 : 14, // Adjusted for better readability
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: { size: window.innerWidth < 640 ? 12 : window.innerWidth < 768 ? 14 : 16 }, // Adjusted for better readability
        bodyFont: { size: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 12 : 14 },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Curved line for better visual effect
      },
    },
  };

  return (
    <div className="lg:w-full w-[325px] h-52 p-2">
      <h2 className="mb-2 text-sm sm:text-lg md:text-xl font-semibold">
        View Accommodation
      </h2>
      <div className="h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
