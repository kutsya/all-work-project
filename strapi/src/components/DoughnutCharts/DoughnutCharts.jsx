import './DoughnutCharts.css';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import BarChart from '../BarChart/BarChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom";
import AnimatedNumbers from "../AnimatedNumbers/AnimatedNumbers.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutCharts({ nameDiagram, values, isFinances }) {
    const data = {
        labels: [
            'Total number of active orders',
            'Earned this month',
            'Number of unreturned orders',
        ],
        datasets: [
            {
                label: '# of Votes',
                data: values,
                backgroundColor: [
                    'rgba(244,136,156,0.9)',
                    'rgba(140,87,239,0.9)',
                    'rgba(246,244,148,0.9)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const [colors] = useState([
        'rgba(244,136,156,0.9)',
        'rgba(140,87,239,0.9)',
        'rgba(246,244,148,0.9)'
    ]);

    const [showDoughnut, setShowDoughnut] = useState(true);
    const [showBarChart, setShowBarChart] = useState(false);
    const [buttonContainerStyle, setButtonContainerStyle] = useState({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -27%)',
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
    });

    const handleButtonClick = () => {
        setShowDoughnut(!showDoughnut);
        setShowBarChart(true);
        setButtonContainerStyle({
            position: 'absolute',
            left: '55%',
            top: '15%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around'
        });
    };

    const handleDoughnutClick = () => {
        setShowDoughnut(true);
        setShowBarChart(false);
        setButtonContainerStyle({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -27%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        });
    };

    return (
        <div className={`doughnut-charts ${showDoughnut ? '' : 'full-width'}`}>
            {isFinances ?
                <>
                    <h2>{nameDiagram}</h2>
                    <Doughnut data={data} />
                </> : null}
            {showDoughnut && !isFinances ? (
                <>
                    <h2>{nameDiagram}</h2>
                    <div className="doughnut-container">
                        <Doughnut data={data} />
                        <div className="anime_wrap">
                            {values?.map((el, i) => (
                                <div key={i} className="anime"
                                    style={{
                                        borderLeft: `25px solid ${colors[i]}`,
                                        borderTop: `25px solid ${colors[i]}`,
                                        borderRight: `25px solid ${colors[i]}`
                                    }}>
                                    <AnimatedNumbers value={el} /> %
                                </div>
                            ))}
                        </div>
                        <div style={buttonContainerStyle} className="button-container">
                            <button className="dashboardButton" onClick={handleButtonClick}>
                                Monthly Sales
                            </button>
                            <Link className="dashboardButton" to="/Calendar">
                                Next deadline
                                <div className="ping" />
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                showBarChart && (
                    <div className="bar-chart-container">
                        <div style={buttonContainerStyle} className="button-container">
                            <button className="dashboardButton" onClick={handleDoughnutClick}>
                                Doughnut Chart
                            </button>
                            <Link className="dashboardButton" to="/Calendar">
                                Next deadline
                                <div className="ping" />
                            </Link>
                        </div>
                        <BarChart nameDiagram="Monthly Sales" />
                    </div>
                )
            )}
        </div>
    );
};

DoughnutCharts.propTypes = {
    nameDiagram: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    isFinances: PropTypes.arrayOf(PropTypes.number)
};

export default DoughnutCharts;
