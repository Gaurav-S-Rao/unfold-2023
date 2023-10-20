import { Timeline } from '@mui/lab';
import { Typography, CardContent, Box } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineDot from '@mui/lab/TimelineDot';

const defaultContent = [
  {
    title: 'Create project',
    subheader: 'Create a projecet for your Reach Provider',
  },
  {
    title: 'Get Your Keys',
    subheader: 'You will find that keys have already been granted for your project',
  },
  {
    title: 'Configure your client',
    subheader: 'Setup your Reach Card, take a look at docs',
  },
];

interface Props extends CardProps {
  content?: { title: string; subheader: string }[];
}

export default function DeveloperTimeline({ content = defaultContent }: Props) {
  return (
    <Timeline
      sx={{
        m: 0,
        p: 3,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {content.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineDot color="primary" />
          <Box sx={{ ml: '2%' }}>
            <Typography variant="h6" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.subheader}
            </Typography>
          </Box>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
