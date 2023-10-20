import { Navigate, useRoutes } from 'react-router-dom';
import { dashboardRoutes } from './dashboard';
import { authRoutes } from './auth';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={'/dashboard'} replace />,
    },

    ...authRoutes,

    ...dashboardRoutes,
  ]);
}
