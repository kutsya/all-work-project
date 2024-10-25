import './Dashboard.css';
import DoughnutCharts from '../../components/DoughnutCharts/DoughnutCharts';
import { useEffect } from 'react';
import { Title } from 'react-admin';

function Dashboard() {

    useEffect(() => {
        const role = sessionStorage.getItem('role');
        if (role && role !== 'admin') {
            sessionStorage.setItem('open_dialogue_user', role);
        }
    }, []);

    return (
        <div className='dashboard'>
            <Title title="Dashboard" />
            <DoughnutCharts nameDiagram="Dashboard" values={[75, 50, 65]} />
        </div>
    );
}

export default Dashboard;