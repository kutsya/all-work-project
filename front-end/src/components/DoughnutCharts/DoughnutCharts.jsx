import './DoughnutCharts.css';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import BarChart from '../BarChart/BarChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutCharts({ isFinances, nameDiagram, values }) {

    const [fontSize, setFontSize] = useState(20);

    useEffect(() => {
        const handleResize = () => {
            const newSize = Math.max(12, Math.min(40, window.innerWidth / 50));
            setFontSize(newSize);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const labels = [
        'Total number of active orders',
        'Earned this month',
        ...(values.length > 2 ? ['Number of unreturned orders'] : []),
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: values.filter((value, index) => (index < 2 || values.length > 2)),
                backgroundColor: [
                    'rgba(244,136,156,0.9)',
                    'rgba(140,87,239,0.9)',
                    ...(values.length > 2 ? ['rgba(246,244,148,0.9)'] : []),
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'yellow',
                },
            },

            datalabels: {
                formatter: (value) => {
                    return `${Math.round((value / values.reduce((a, b) => a + b, 0)) * 100)}%`;
                },
                color: 'yellow',
                font: {
                    size: fontSize,
                },
            },
        },
    };

    return (
        <div className="doughnut-charts">
            <div className="doughnut-container">
                <h2 className="user-dashboard__charts_block_name">{nameDiagram}</h2>
                <Doughnut data={data} options={options} />
            </div>
            {
                !isFinances ? (
                    <div className="bar-chart-container">
                        <BarChart nameDiagram="Monthly Sales" />
                    </div>
                ) : null
            }
        </div>
    );
}

DoughnutCharts.propTypes = {
    isFinances: PropTypes.bool,
    nameDiagram: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DoughnutCharts;
