import { Box, ButtonBase, Card, CardContent, Typography } from '@mui/material';

import InsightsBar from 'src/components/dashboard/insights-bar';

type InsightsCardProps = {
  label: string;
  width?: string | number;
  height?: string | number;
};

export default function InsightsCard({
  label,
  width = 'auto',
  height = 'auto',
}: InsightsCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        margin: 1,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">{label}</Typography>
      </CardContent>
      <InsightsBar
        title="Insights"
        chart={{
          impressions: 110,
          creditsLeft:70,
        }}
      />
    </Card>
  );
}
