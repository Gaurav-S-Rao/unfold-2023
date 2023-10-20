import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import CampaignsCardTable from './campaigns-card-table';

type CampaignsCardProps = {
  label: string;
  width?: string | number;
  height?: string | number;
};

export default function CampaignsCard({
  label,
  width = 'auto',
  height = 'auto',
}: CampaignsCardProps) {
  return (
    <Card variant="outlined" sx={{ margin: 1, width: width, height: height }}>
      <CampaignsCardTable />
    </Card>
  );
}
