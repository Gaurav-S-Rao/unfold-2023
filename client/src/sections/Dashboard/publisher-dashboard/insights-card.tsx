import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import InsightsChart from 'src/components/publisher-dashboard/insights-chart';

type InsightsCarsProps = {
  label: string;
  width?: string | number;
  height?: string | number;
};

export default function PublisherInsightsCard({
  label,
  width = 'auto',
  height = 'auto',
}: InsightsCarsProps) {
  return (
    <Card
      variant="outlined"
      sx={{ margin: 1, width: width, height: height }}
      component={ButtonBase}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <InsightsChart title="Insights" />
      </CardContent>
    </Card>
  );
}
