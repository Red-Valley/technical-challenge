import { Outlet, NavLink } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div>
      <nav>
        <NavLink to="patient">Patient</NavLink> |{" "}
        <NavLink to="provider">Provider</NavLink> |{" "}
        <NavLink to="patient-list">Patient List</NavLink> |{" "}
        <NavLink to="provider-list">Provider List</NavLink> |{" "}
        <NavLink to="patient-update-control">Update Control</NavLink> |{" "}
        <NavLink to="patient-history">History</NavLink>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
};

DashboardPage.propTypes = {}

export default DashboardPage