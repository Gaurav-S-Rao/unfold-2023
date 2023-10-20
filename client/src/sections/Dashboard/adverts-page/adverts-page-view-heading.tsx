import { Box, Button, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const heading = 'Advertisements';

export default function AdvertsPageViewHeading() {
  const { push } = useRouter();

  return (
    <Stack direction="row" alignItems="center" sx={{ mb: { xs: 3, md: 5 } }} width="100%">
      <Box sx={{ flexGrow: 1 }}>
        {heading && (
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
        )}
      </Box>

      <Box sx={{ flexShrink: 0 }}>
        <Button
          component={RouterLink}
          href={paths.dashboard.adverts.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New Advertisement
        </Button>
      </Box>
    </Stack>
  );
}
