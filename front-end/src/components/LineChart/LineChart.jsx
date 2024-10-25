import './LineChart.css';
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
import moment from 'moment';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const labels = Array.from({ length: 7 }, (_, i) => moment().month(i).format('MMMM'));
const LineChart = () => {
    const colors = [
        { borderColor: 'rgba(246,244,148,0.9)', backgroundColor: 'rgba(0,0,0,0.3)' },
        { borderColor: 'rgba(244,136,156,0.9)', backgroundColor: 'rgba(0,0,0,0.3)' },
        { borderColor: 'rgba(140,87,239,0.9)', backgroundColor: 'rgba(0,0,0,0.3)' },
    ];

    const titles = ['Total number of active orders', 'Earned this month', 'Number of unreturned orders'];

    const lineCharts = titles.map((title, index) => {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: `${title} 2024 (in $)`,
                    data: [10, 20, 50, 100, 200, 500, 1000].map(value => value * (index + 1)),
                    borderColor: colors[index].borderColor,
                    backgroundColor: colors[index].backgroundColor,
                    fill: true,
                    tension: 0.3,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `${title}`,
                    font: {
                        weight: 'bold',
                        size: 20,
                    },
                },
            },
        };

        return (
            <div key={index} className='chart-wrapper'>
                <Line data={data} options={options} height={350} width={500} />
            </div>
        );
    });

    return (
        <div className='line-container'>
            {lineCharts}
        </div>
    );
};

export default LineChart;