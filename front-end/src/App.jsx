import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route } from "react-router-dom";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import OrdersIcon from "@mui/icons-material/Task";
import FreelancersIcon from "@mui/icons-material/Computer";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import ForumIcon from '@mui/icons-material/Forum';

import authProvider from './utils/authProvider.js';
import { dataCombinedProvider } from './utils/dataCombinedProvider.js';

import Login from './pages/Login/Login.jsx';
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Finance from "./pages/Finance/Finance";
import { OrdersList } from "./pages/OrdersList/OrdersList";
import { FreelancersList } from "./pages/FreelancersList/FreelancersList";
import { UserOrders } from "./pages/UserOrders/userorders";
import AdminAccountPage from "./pages/AdminAccount/AdminAccount.jsx";
import { Layout } from "./pages/Layout.jsx";
import UserAccount from './pages/UserAccount/UserAccount.jsx';
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Dialogue from './pages/Dialogue/Dialogue.jsx';

import { Calendar } from "./components/Calendar/Calendar.jsx";
import { useEffect, useState } from 'react';

const App = () => {

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = sessionStorage.getItem('role') || 'guest';
    setUserRole(role);
  }, [userRole]);

  if (!userRole) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
      Loading...</div>;
  }

  return (
    <Admin
      loginPage={() => <Login setUserRole={setUserRole} />}
      layout={Layout}
      dataProvider={dataCombinedProvider}
      authProvider={authProvider}
      dashboard={userRole === 'admin' ? AdminDashboard : Dashboard}
    >
      {userRole === "admin" ? (
        <>
          {/* Ресурсы для администратора */}
          <Resource name="finance" list={Finance} icon={LocalAtmIcon} />
          <Resource name="orders" list={OrdersList} icon={OrdersIcon} />
          <Resource name="freelancers" list={FreelancersList} icon={FreelancersIcon} />
          <CustomRoutes>
            <Route path="profile" element={<AdminAccountPage />} />
          </CustomRoutes>
        </>
      ) : (
        <>
          {/* Ресурсы для пользователя */}
          <Resource name="User-orders" list={UserOrders} icon={OrdersIcon} />
          <Resource name="Calendar" list={Calendar} icon={CalendarIcon} />
          <CustomRoutes>
            <Route path="profile" element={<UserAccount />} />
          </CustomRoutes>
        </>
      )}
      {/* Общие ресурсы поддержки, чатов и сообщений */}
      <Resource name="support" list={Dialogue} icon={ForumIcon} />
    </Admin>
  );
};

export default App;
