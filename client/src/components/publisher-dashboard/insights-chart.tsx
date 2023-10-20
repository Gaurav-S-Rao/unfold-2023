import { ApexOptions } from 'apexcharts';
import { useState, useCallback } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import ButtonBase from '@mui/material/ButtonBase';
import Card, { CardProps } from '@mui/material/Card';
// components
import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// Dummy Data
const dummyData = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      year: '2022',
      data: [
        {
          name: 'Advertisement Views',
          data: [120, 230, 310, 400, 290, 350, 460, 490, 420, 380, 330, 290],
        },
      ],
    },
  ],
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart?: {
    categories?: string[];
    colors?: string[][];
    series?: {
      year: string;
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
  };
}

export default function AppAreaInstalled({ title, subheader, chart = dummyData, ...other }: Props) {
  const { categories = dummyData.categories, series = dummyData.series, options } = chart;

  const popover = usePopover();

  const [seriesData, setSeriesData] = useState('2022');

  const chartOptions = useChart({
    colors: ['#FF0000'],
    fill: {
      type: 'solid',
    },
    xaxis: {
      categories,
    },
    ...options,
  });

  const handleChangeSeries = useCallback(
    (newValue: string) => {
      popover.onClose();
      setSeriesData(newValue);
    },
    [popover]
  );

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={title}
          subheader={subheader}
          action={
            <Box
              onClick={popover.onOpen}
              sx={{
                pl: 1,
                py: 0.5,
                pr: 0.5,
                borderRadius: 1,
                typography: 'subtitle2',
                bgcolor: 'background.neutral',
              }}
            >
              {seriesData}

              <Iconify
                width={16}
                icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                sx={{ ml: 0.5 }}
              />
            </Box>
          }
        />

        {series.map((item) => (
          <Box key={item.year}>
            {item.year === seriesData && (
              <Chart
                dir="ltr"
                type="line"
                series={item.data}
                options={chartOptions}
                height={320}
                width={550}
              />
            )}
          </Box>
        ))}
      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose}  sx={{ width: 140 }}>
        {series.map((option) => (
          <MenuItem
            key={option.year}
            selected={option.year === seriesData}
            onClick={() => handleChangeSeries(option.year)}
          >
            {option.year}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
