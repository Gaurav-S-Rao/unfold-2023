import { Container } from '@mui/material';
import OverviewDashboardAdvertiser from '../overview-dashboard-advertiser';
import { useAuthContext } from 'src/auth/hooks';
import OverviewDashboardPublisher from '../overview-dashboard-publisher';

export default function OverviewDashboardView() {
  const { user } = useAuthContext();

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '2%' }}>
      {user?.role.toLowerCase() === 'advertiser' && <OverviewDashboardAdvertiser />}
      {user?.role.toLowerCase() === 'publisher' && <OverviewDashboardPublisher />}
    </Container>
  );
}
