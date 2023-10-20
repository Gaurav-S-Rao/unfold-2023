import {
  Typography,
  CardContent,
  Box,
  Container,
  TextField,
  Button,
  Divider,
  Card,
  InputAdornment,
} from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { usePopover } from 'src/components/custom-popover';
import { useCallback } from 'react';
import {useSnackbar} from 'src/components/snackbar'

export default function NewProject() {
  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const popover = usePopover();

  const onCopy = useCallback(
    (text: string) => {
      if (text) {
        enqueueSnackbar('Copied!');
        copy(text);
      }
    },
    [copy, enqueueSnackbar]
  );

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Card sx={{ width: '70%', p: 3, mt: '5%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              mt: '5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Title
              </Typography>
              <Typography variant="body1">The Name of your Project</Typography>
            </Box>

            <Box>
              <TextField
                variant="outlined"
                placeholder="Enter Name"
                sx={{ width: '250px', mt: '3px' }}
              />
              <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mt: '5%', mb: '5%' }} />

          <Box
            sx={{
              mt: '5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Project ID
              </Typography>
              <Typography variant="body1">
                Your Project ID gives you access to your OrbReach
              </Typography>
            </Box>

            <Box>
              <TextField
                variant="outlined"
                value={'Project ID'}
                disabled
                sx={{ width: '250px', mt: '3px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ContentCopyIcon cursor="pointer"  onClick={()=>onCopy("Project id") }/>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
