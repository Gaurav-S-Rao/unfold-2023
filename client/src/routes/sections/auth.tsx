import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { GuestGuard } from 'src/auth/guard';
import { SplashScreen } from 'src/components/loading-screen';
import DashboardLayout from 'src/layout/dashboard/layout';

const LoginPage = lazy(() => import('src/pages/auth/login'));
const RegisterPage = lazy(() => import('src/pages/auth/register'));

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <GuestGuard>
        <DashboardLayout>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </GuestGuard>
    ),
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        ),
      },
      {
        path: 'register',
        children: [
          {
            element: (
              <GuestGuard>
                <RegisterPage />
              </GuestGuard>
            ),
            index: true,
          },
        ],
      },
    ],
  },
];
