import { lazy } from 'react';

export const PatientPage = lazy(
  () => import('../pages/dashboard/patient/PatientPage')
);

export const ProviderPage = lazy(
  () => import('../pages/dashboard/provider/ProviderPage')
);

export const PatientUpdateControl = lazy(
  () => import('../pages/dashboard/patient-update-control/PatientUpdateControl')
);

export const PatientHistoryPage = lazy(
  () => import('../pages/dashboard/patient-history/PatientHistoryPage')
);

export const PatientListPage = lazy(
  () => import('../pages/dashboard/patient-list/PatientListPage')
);

export const ProviderListPage = lazy(
  () => import('../pages/dashboard/provider-list/ProviderListPage')
);