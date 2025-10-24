import { createHashRouter, Navigate } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import { 
  PatientHistoryPage, 
  PatientListPage, 
  PatientPage, 
  PatientUpdateControl, 
  ProviderListPage, 
  ProviderPage 
} from "./routesLazyLoad";

export const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard/patient-list" replace />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <Navigate to="patient-list" replace />,
      },
      {
        path: 'patient',
        element: <PatientPage />,
      },
      {
        path: 'provider',
        element: <ProviderPage />,
      },
      {
        path: 'patient-list',
        element: <PatientListPage />,
      },
      {
        path: 'provider-list',
        element: <ProviderListPage />,
      },
      {
        path: 'patient-update-control',
        element: <PatientUpdateControl />,
      },
      {
        path: 'patient-history',
        element: <PatientHistoryPage />,
      },
      {
        path: '*',
        element: <Navigate to="patient-list" replace />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard/patient-list" replace />,
  },
]);