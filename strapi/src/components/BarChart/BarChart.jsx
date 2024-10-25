import './BarChart.css';
import { income } from '../../income';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import PropTypes from 'prop-types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const currentDate = new Date();
const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', currentMonth],
    datasets: [
        {
            label: 'Sales',
            data: income,
            backgroundColor: [
                'rgba(248,124,238,0.8)',
                'rgba(126,207,251,0.8)',
                'rgba(250,216,125,0.8)',
                'rgba(126,250,223,0.8)',
                'rgba(168,126,251,0.8)',
                'rgba(246,185,122,0.8)',
                'rgba(124,246,150,0.8)',
                'rgba(122,143,250,0.8)',
                'rgba(246,95,174,0.8)',
                'rgba(246,121,143,0.8)',
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
    plugins: {
        legend: {
            labels: {
                font: {
                    size: 18,
                },
            },
        },
        datalabels: {
            anchor: 'end',
            align: 'end',
            color: '#ff0015',
            font: {
                weight: 'bold',
                size: '14px',
            },
            formatter: (value) => `${value} $`,
        },
    },
};

const BarChart = ({ nameDiagram }) => (
    <div className='bar-chart'>
        <h2>{nameDiagram}</h2>
        <Bar data={data} options={options} />
    </div>
);

BarChart.propTypes = {
    nameDiagram: PropTypes.string.isRequired,
};

export default BarChart;
