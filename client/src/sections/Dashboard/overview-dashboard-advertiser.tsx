import { Box } from '@mui/material';
import AdvtPrefCard from './advt-pref-card';
import BillingCard from './billing-card';
import BusinessProfileCard from './business-profile-card';
import CampaignsCard from './campaigns-card';
import InsightsCard from './insights-card';

export default function OverviewDashboardAdvertiser() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" m={2}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <AdvtPrefCard
          label="Create Advertisement  "
          width={400}
          height={150}
          chart={{
            series: [2, 9, 11],
          }}
        />
        <BillingCard
          label="Billing "
          width={400}
          height={150}
          chart={{
            series: [250, 150, 110],
          }}
        />
        <BusinessProfileCard label="Business Profile ➨" width={450} height={150} />
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
        <CampaignsCard label="Campaigns ➨" width={815} height={400} />
        <InsightsCard label="Insights" width={450} height={400} />
      </Box>
    </Box>
  );
}
