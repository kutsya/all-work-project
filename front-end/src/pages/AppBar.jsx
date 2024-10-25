import * as React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import { AppBar, Logout, UserMenu, useUserMenu } from "react-admin";

// eslint-disable-next-line react/display-name
const SettingsMenuItem = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { onClose } = useUserMenu();

  const handleProfileClick = () => {
    onClose();
    navigate("profile");
  };

  return (
    <MenuItem onClick={handleProfileClick} ref={ref} {...props}>
      <ListItemIcon>
        <AccountBoxIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Profile</ListItemText>
    </MenuItem>
  );
});

const MyAppBar = () => (
  <AppBar
    userMenu={
      <UserMenu>
        <SettingsMenuItem />
        <Logout />
      </UserMenu>
    }
  />
);
export default MyAppBar;
