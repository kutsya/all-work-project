import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "./FreelancersChart.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const data = {
  labels: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  datasets: [
      {
          label: 'Total number of freelancers',
          data: [33, 26, 13, 26, 29, 70, 81, 67, 37, 55, 78, 26],
          backgroundColor: [
              'rgba(128, 0, 128, 0.2)',
              'rgba(0, 255, 0, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(99, 255, 132, 0.2)',
              'rgba(238, 130, 238, 0.2)',
              'rgba(128, 128, 0, 0.2)',
              'rgba(255, 215, 0, 0.2)',
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(99, 255, 132, 1)',
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

const FreelancersChart = () => {
  

  return <Bar data={data} options={options} />;
};

export default FreelancersChart;