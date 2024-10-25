import './Dashboard.css';
import DoughnutCharts from '../../components/DoughnutCharts/DoughnutCharts';

function Dashboard() {

    return (
        <div className='dashboard'>
            <DoughnutCharts nameDiagram="Dashboard" values={[75, 50, 65]} />
        </div>
    );
}

export default Dashboard;