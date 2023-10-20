import { Box, Typography } from '@mui/material';
import PublisherProfileCard from './publisher-dashboard/publisher-profile-card';
import DeveloperGuideCard from './publisher-dashboard/developer-guide-card';
import PublisherInsightsCard from './publisher-dashboard/insights-card';
import MoneyMadeCard from './publisher-dashboard/money-made-card';

export default function OverviewDashboardPublisher() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" m={2}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <PublisherProfileCard label="Profile ➨" width={550} height={150} />
        <DeveloperGuideCard label="Developer Docs ➨" width={400} height={150} />
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
        <PublisherInsightsCard label="Insights" width={550} height={350} />
        <MoneyMadeCard
          label="Credits Earned"
          totalAdds={23}
          moneyEarned={433}
          width={400}
          height={350}
        />
      </Box>
    </Box>
  );
}
