import { Helmet } from 'react-helmet-async';
import { OverviewDashboardView } from 'src/sections/Dashboard/view';

export default function DashboardHomePage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <OverviewDashboardView />
    </>
  );
}
