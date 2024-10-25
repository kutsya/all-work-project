import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "./DialogsChart.css";
import { color } from 'chart.js/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  datasets: [
      {
          label: 'Total number of dialogs',
          data: [22, 5, 3, 16, 2, 10, 15, 29, 45, 16, 22, 45],
          backgroundColor: [
              'rgba(0, 255, 255, 0.2)',
              'rgba(255, 0, 255, 0.2)',
              'rgba(255, 165, 0, 0.2)',
              'rgba(128, 0, 128, 0.2)',
              'rgba(255, 192, 203, 0.2)',
              'rgba(165, 42, 42, 0.2)',
              'rgba(0, 255, 255, 0.2)',
              'rgba(255, 0, 255, 0.1)',
              'rgba(255, 165, 0, 0.2)',
              'rgba(128, 0, 128, 0.2)',
              'rgba(238, 130, 238, 0.2)',
              'rgba(165, 42, 42, 0.2)',
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(99, 255, 132, 1)',
          ],
          borderWidth: 1,
      },
  ],
};

const options = {
  scales: {
      y: {
          beginAtZero: true,
      },
  },
};

const DialogsChart = () => {
  return <Bar data={data} options={options} />;
};

export default DialogsChart;