import { Admin, CustomRoutes, Resource } from 'react-admin';
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import OrdersIcon from "@mui/icons-material/Task";
import FreelancersIcon from "@mui/icons-material/Computer";
import CalendarIcon from "@mui/icons-material/CalendarToday";

import { authProvider } from "./authProvider";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Finance from "./pages/Finance/Finance";
import { OrdersList } from "./pages/OrdersList/OrdersList";
import { FreelancersList } from "./pages/FreelancersList/FreelancersList";
import { dataCombinedProvider } from './utils/dataCombinedProvider.js';
import { UserOrders } from "./pages/UserOrders/userorders";
import { Route } from "react-router-dom";
import AdminAccountPage from "./pages/AdminAccount/AdminAccount.jsx";
import { Layout } from "./pages/Layout.jsx";
import UserAccount from "./pages/user-account/UserAccount.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { Calendar } from "./components/Calendar/Calendar.jsx";
import { ChatList } from "./pages/UserChats/ChatList";
import { ChatCreate } from "./pages/UserChats/ChatCreate";
import SupportBoard from "./pages/SupportBoard/SupportBoard";

import MessageList from "./pages/AdminDashboard/components/AdminChat/AdminFreelancerChat/MessageList";
import MessageCreate from "./pages/AdminDashboard/components/AdminChat/AdminFreelancerChat/MessageCreate";
import SupportMessageCreate from "./pages/AdminDashboard/components/AdminChat/AdminSupportChat/SupportMessageCreate";
import SupportMessageList from "./pages/AdminDashboard/components/AdminChat/AdminSupportChat/SupportMessageList";

const user = JSON.parse(localStorage.getItem('user'));

const App = () => {
  return (
    <Admin
      layout={Layout}
      dataProvider={dataCombinedProvider}
      authProvider={authProvider}
      dashboard={user.role === 'admin' ? AdminDashboard : Dashboard}
    >
      {
        (permissions) => {
          const role = permissions?.role;

          return role === "admin" ? (
            <>
              {/* ADMIN */}
              <Resource name="finance" list={Finance} icon={LocalAtmIcon} />
              <Resource name="orders" list={OrdersList} icon={OrdersIcon} />
              <Resource name="freelancers" list={FreelancersList} icon={FreelancersIcon} />
              <CustomRoutes>
                <Route path="profile" element={<AdminAccountPage />} />
              </CustomRoutes>
            </>
          ) : (
            <>
              {/* USER */}
              <Resource name="User-orders" list={UserOrders} icon={OrdersIcon} />
              <Resource name="Calendar" list={Calendar} icon={CalendarIcon} />
              <CustomRoutes>
                <Route path="profile" element={<UserAccount />} />
              </CustomRoutes>
            </>
          );
        }
      }
      {/* Support, Chats, and Messages Resources */}
      <Resource name="support" list={SupportBoard} />
      <Resource
        name="admin_freelancers_chat"
        list={MessageList}
        icon={MarkUnreadChatAltIcon}
        create={MessageCreate}
      />
      <Resource
        name="support_messages"
        list={SupportMessageList}
        icon={MarkUnreadChatAltIcon}
        create={SupportMessageCreate}
      />
      <Resource
        name="chats"
        list={ChatList}
        icon={MarkUnreadChatAltIcon}
        create={ChatCreate}
      />
    </Admin>
  );
};

export default App;
