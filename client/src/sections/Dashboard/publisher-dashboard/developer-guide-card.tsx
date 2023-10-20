import { ButtonBase, Card, CardContent, Typography } from '@mui/material';

type DeveloperGuideProps = {
  label: string;
  width?: string | number;
  height?: string | number;
};

export default function DeveloperGuideCard({
  label,
  width = 'auto',
  height = 'auto',
}: DeveloperGuideProps) {
  return (
    <Card
      variant="outlined"
      sx={{ margin: 1, width: width, height: height }}
      component={ButtonBase}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">{label}</Typography>
      </CardContent>
    </Card>
  );
}
