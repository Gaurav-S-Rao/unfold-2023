import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import AuthGuard from 'src/auth/guard/auth-guard';
import { LoadingScreen } from 'src/components/loading-screen';
import DashboardLayout from 'src/layout/dashboard/layout';
import BillingPage from 'src/pages/dashboard/billing-page';
import CampaignPageNewPage from 'src/pages/dashboard/campaign-page-new';
import DeveloperPage from 'src/pages/dashboard/developer-page';
import NewProject from 'src/sections/Dashboard/publisher-dashboard/developer-project-new';

const DashboardHomePage = lazy(() => import('src/pages/dashboard/dashboard'));

const Profile = lazy(() => import('src/pages/dashboard/profile'));

const AdvertsPage = lazy(() => import('src/pages/dashboard/adverts-page'));

const AdvertsPageNew = lazy(() => import('src/pages/dashboard/adverts-page-new'));

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        element: <DashboardHomePage />,
        index: true,
      },
      {
        path: 'settings',
        element: <div>Settings</div>,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'billing',
        element: <BillingPage />,
      },
      {
        path: 'adverts',
        children: [
          {
            element: <AdvertsPage />,
            index: true,
          },
          {
            element: <AdvertsPageNew />,
            path: 'new',
          },
        ],
      },
      {
        path: 'developer',
        children: [
          {
            element: <DeveloperPage />,
            index: true,
          },
          {
            path: 'new',
            element: <NewProject />,
          },
        ],
      },
      {
        path: 'campaign',
        children: [
          {
            element: <div>Campaigns</div>,
            index: true,
          },
          {
            path: 'new',
            element: <CampaignPageNewPage />,
          },
        ],
      },
    ],
  },
];
