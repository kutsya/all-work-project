import './Finance.css';
import BarChart from '../../components/BarChart/BarChart';
import DoughnutCharts from '../../components/DoughnutCharts/DoughnutCharts';
import AnimatedNumbers from '../../components/AnimatedNumbers/AnimatedNumbers';
import { income } from '../../income';
import { useEffect, useState } from 'react';

function Finance() {
    const incomeLength = income.length;

    const [dataPercent] = useState(() => {
        const myIncomeLastMonth = +(income[incomeLength - 1] * 0.2).toFixed(0);
        const otherIncomeLastMonth = +(income[incomeLength - 1] * 0.8).toFixed(0);
        return [myIncomeLastMonth, otherIncomeLastMonth];
    });

    useEffect(() => {
        console.log(dataPercent);
    }, [dataPercent]);

    return (
        <div className='finance_wrap'>
            <div>
                <BarChart nameDiagram="Total monthly income" />
            </div>
            <div>
                <div>
                    <div><span>My income (20%)</span><span><AnimatedNumbers value={dataPercent[0]} /> $</span></div><br />
                    <div><span>Freelancer earnings (80%)</span><span><AnimatedNumbers value={dataPercent[1]} /> $</span></div>
                </div>
                <DoughnutCharts nameDiagram="Company Percentage" values={dataPercent} isFinances />
            </div>
        </div>
    );
}

export default Finance;
