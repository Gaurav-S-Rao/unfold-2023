import { useTheme } from '@mui/material/styles';
import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useRouter } from 'src/routes/hooks';

import Chart from 'src/components/chart';
import { fNumber } from 'src/utils/format-number';

type AdvtPrefCardProps = {
  label: string;
  width?: string | number;
  height?: string | number;
  chart: {
    colors?: string[];
    series: number[];
    options?: ApexOptions;
  };
};

export default function AdvtPrefCard({
  label,
  width = 'auto',
  height = 'auto',
  chart,
  ...other
}: AdvtPrefCardProps) {
  const { push } = useRouter();

  const handleClick = () => {
    push('/dashboard/adverts');
  };
  const theme = useTheme();

  const {
    colors = [theme.palette.primary.light, theme.palette.primary.main],
    series,
    options,
  } = chart;

  const chartOptions = {
    colors: colors.map((colr) => colr[1]),
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[0] },
          { offset: 100, color: colors[1] },
        ],
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '68%',
        borderRadius: 2,
      },
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
    ...options,
  };

  return (
    <Card
      variant="outlined"
      sx={{ margin: 1, width: width, height: height }}
      component={ButtonBase}
      onClick={handleClick}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{mb:'10px'}}>{label}</Typography>
        <Chart
          type="line"
          width={60}
          height={36}
          series={[{ data: series }]}
          options={chartOptions}
        />
      </CardContent>
    </Card>
  );
}
