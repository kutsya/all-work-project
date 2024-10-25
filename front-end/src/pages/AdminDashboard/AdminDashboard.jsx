import ClosestDeadline from './components/ClosestDeadline/ClosestDeadline'
import ProcessedOrdersChart from './components/ProcessedOrdersCharts/ProcessedOrdersChart'
import EarningsChart from './components/EarningsChart/EarningsChart';
import DialogsChart from './components/DialogsChart/DialogsChart';
import FreelancersChart from './components/FreelancersChart/FreelancersChart';
import ActiveOrdersChart from './components/ActiveOrdersChart/ActiveOrdersChart';
import './AdminDashboard.css';
import { Title } from 'react-admin';

const data = [
    { orderId: 1, status: 'Active', date: '2024-01-01', amount: 250 },
    { orderId: 2, status: 'Active', date: '2024-01-02', amount: 150 },
    { orderId: 3, status: 'Completed', date: '2024-01-03', amount: 300 },
    { orderId: 4, status: 'Active', date: '2024-01-04', amount: 400 },
    // ... другие заказы
  ];


const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Title title="Dashboard" />
            <div className="admin-dashboard__charts">
                <div className="admin-dashboard__charts_block">
                    <h2 className="admin-dashboard__charts_block_name">Total Number of Dialogs</h2>
                    <DialogsChart />
                </div>
                <div className="admin-dashboard__charts_block">
                  <h2 className="admin-dashboard__charts_block_name">Closest Deadline</h2>
                  <ClosestDeadline/>
                </div>
            </div>
            <div className="admin-dashboard__charts">
                <div className="admin-dashboard__charts_block">
                    <h2 className="admin-dashboard__charts_block_name">Total Number of Freelancers</h2>
                    <FreelancersChart />
                </div>
                <div className="admin-dashboard__charts_block">
                    <h2 className="admin-dashboard__charts_block_name">Processed Orders Per Platform</h2>
                    <ProcessedOrdersChart />
                </div>
            </div>
            <div className="admin-dashboard__charts">
                <div className="admin-dashboard__charts_block">
                    <h2 className="admin-dashboard__charts_block_name">Active Orders Chart</h2>
                    <ActiveOrdersChart data={data} />
                </div>
                <div className="admin-dashboard__charts_block">
                    <h2 className="admin-dashboard__charts_block_name">Earned This Month</h2>
                    <EarningsChart />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

