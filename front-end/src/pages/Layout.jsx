import PropTypes from "prop-types";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import MyAppBar from "./AppBar";

export const Layout = ({ children }) => (
  <RALayout appBar={MyAppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
