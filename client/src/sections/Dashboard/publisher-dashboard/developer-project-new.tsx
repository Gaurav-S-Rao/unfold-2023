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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance, { endpoints } from 'src/utils/axios-instance';
import { COMPANY_CATEGORY_LIST } from 'src/config-global';

export default function NewProject() {
  const { enqueueSnackbar } = useSnackbar();

  const [authApi, setAuthApi] = useState<Record<string, any> | undefined>();

  const [formValues, setFormValues] = useState({
    name: '',
    campaignTopics: '',
  });

  const { copy } = useCopyToClipboard();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onCopy = useCallback(
    (text: string) => {
      if (text) {
        enqueueSnackbar('Copied!');
        copy(text);
      }
    },
    [copy, enqueueSnackbar]
  );

  useEffect(() => {
    axiosInstance
      .get(endpoints.apiKey.get)
      .then((res) => {
        res.data === '' ? setAuthApi(undefined) : setAuthApi(res.data);
      })
      .catch((err) => {
        console.log('🚀 ~ file: developer-project-new.tsx ~ line 118 ~ handleSubmit ~ err', err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(
      '🚀 ~ file: developer-project-new.tsx ~ line 114 ~ handleSubmit ~ formValues',
      formValues
    );

    try {
      await axiosInstance
        .post(endpoints.apiKey.create, {
          ...formValues,
        })
        .then((res) => {
          setAuthApi(res.data);
        });
    } catch (err) {
      console.log('🚀 ~ file: developer-project-new.tsx ~ line 118 ~ handleSubmit ~ err', err);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Card sx={{ p: 3, mt: '5%' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Title */}
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
                  sx={{ width: '250px', mt: '3px' }}
                  label="Title"
                  variant="outlined"
                  disabled={Boolean(authApi)}
                  name="name"
                  value={authApi ? authApi.name : formValues.name}
                  onChange={handleFormChange}
                />
              </Box>
            </Box>

            <Divider sx={{ mt: '5%', mb: '5%' }} />

            {/* Catrgory Topic */}
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
                  Category of your site
                </Typography>
                <Typography variant="body1">The Category of your online platform</Typography>
              </Box>

              <Box>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <InputLabel>Company Category</InputLabel>
                  <Select
                    id="demo-simple-select-helper"
                    value={authApi ? authApi.campaignTopics : formValues.campaignTopics}
                    name="campaignTopics"
                    onChange={handleFormChange}
                    disabled={Boolean(authApi)}
                  >
                    {COMPANY_CATEGORY_LIST.map((campaignTopics) => {
                      return (
                        <MenuItem value={campaignTopics.value} key={campaignTopics.value}>
                          {campaignTopics.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {authApi && (
              <>
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
                      value={authApi.id}
                      disabled
                      sx={{ width: '250px', mt: '3px' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ContentCopyIcon
                              cursor="pointer"
                              onClick={() => onCopy(authApi.id)}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
              </>
            )}
            {!authApi && (
              <Button
                type="submit"
                variant="contained"
                sx={{ my: 2, width: '100%', minHeight: 50 }}
                disabled={Object.values(formValues).some((value) => value === '')}
              >
                Submit to create an api key
              </Button>
            )}
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}

{
  /* <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
<Button variant="contained" color="primary">
  Save
</Button>
</Box> */
}
