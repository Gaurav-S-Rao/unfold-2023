import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import ReachCard from '../_common/reach-card';
import { useGetAdvertsById } from 'src/api/adverts';
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { COMPANY_CATEGORY_LIST } from 'src/config-global';
import axiosInstance, { endpoints } from 'src/utils/axios-instance';

type CampaignPageNewPageViewProps = {
  advertId: string | null;
};

export default function CampaignPageNewPageView({ advertId }: CampaignPageNewPageViewProps) {
  const { adverts, advertsLoading, advertsError, advertsEmpty } = useGetAdvertsById({
    id: advertId,
  });

  const [formValues, setFormValues] = useState({
    name: '',
    campaignTopics: '',
    startDate: '',
    endDate: '',
    budget: '',
  });

  // {
  //   "name": "string",
  //   "startDate": "2023-10-21T01:37:55.357Z",
  //   "endDate": "2023-10-21T01:37:55.357Z",
  //   "budget": 10,
  //   "campaignTopics": "string",
  //   "advertisementId": "string"
  // }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // const listItems = [
  //   {
  //     id: '1',
  //     title: 'title',
  //     image: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg',
  //     description: 'description',
  //   },
  //   {
  //     id: '2',
  //     title: 'tifasdtle',
  //     image: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
  //     description: 'descrfasdfaiption',
  //   },
  //   {
  //     id: '3',
  //     title: 'tifasdtle',
  //     image: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg',
  //     description: 'descrfasdfaiption',
  //   },
  // ];

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setFormValues({
        ...formValues,
        startDate: date.toISOString(),
      });
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setFormValues({
        ...formValues,
        endDate: date.toISOString(),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(
      '🚀 ~ file: campaign-page-new-page-view.tsx ~ line 120 ~ handleSubmit ~ formValues',
      formValues,
      Number(formValues.budget),
      adverts?.id
    );

    try {
      await axiosInstance.post(endpoints.campaigns.create, {
        ...formValues,
        budget: Number(formValues.budget),
        advertisementId: adverts?.id,
      });

      window.location.reload();
    } catch (err) {
      console.log('🚀 ~ file: register-view.tsx ~ line 149 ~ handleSubmit ~ err', err);
    }
  };

  return (
    <Container>
      {/* Headers */}
      <Grid container>
        {/* Details */}
        <Grid item xs={12} md={5.5}>
          <Typography
            variant="h3"
            sx={{
              my: 4,
              textAlign: 'flex-start',
              color: 'text.primary',
            }}
          >
            Campaign Details
          </Typography>
        </Grid>

        <Grid item xs={12} md={1}>
          <Divider orientation="vertical" flexItem />
        </Grid>

        <Grid item xs={12} md={5.5}>
          <Typography
            variant="h3"
            sx={{
              my: 4,
              textAlign: 'flex-start',
              color: 'text.primary',
            }}
          >
            Preview Ad
          </Typography>
        </Grid>
      </Grid>

      {/* Details */}
      <Grid container>
        {/* Details */}
        <Grid item xs={12} md={5.5}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Card
                sx={{
                  width: 450,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  p: 4,
                }}
              >
                <Box
                  gap={2}
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                  <TextField
                    sx={{ width: '100%' }}
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={formValues.name}
                    onChange={handleFormChange}
                  />

                  <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel>Company Type</InputLabel>
                    <Select
                      id="demo-simple-select-helper"
                      name="campaignTopics"
                      value={formValues.campaignTopics}
                      onChange={handleFormChange}
                    >
                      {COMPANY_CATEGORY_LIST.map((companyType) => {
                        return (
                          <MenuItem value={companyType.value} key={companyType.value}>
                            {companyType.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>Select your Category</FormHelperText>
                  </FormControl>
                  <Box
                    gap={2}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      sx={{ width: '100%' }}
                      label="Budget"
                      variant="outlined"
                      name="budget"
                      type="number"
                      value={formValues.budget}
                      onChange={handleFormChange}
                    />
                    <Typography>USD</Typography>
                  </Box>
                  <DateTimePicker
                    label="Start Date"
                    value={formValues.startDate ? new Date(formValues.startDate) : null}
                    onChange={handleStartDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                    sx={{ width: '100%' }}
                  />
                  <DateTimePicker
                    label="End Date"
                    value={formValues.endDate ? new Date(formValues.endDate) : null}
                    onChange={handleEndDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Card>

              <Button
                sx={{ m: 1, color: 'red', minWidth: 450 }}
                onClick={() => {
                  setFormValues({
                    name: '',
                    campaignTopics: '',
                    startDate: '',
                    endDate: '',
                    budget: '',
                  });
                }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ m: 1, minHeight: 50, minWidth: 450 }}
                disabled={Object.values(formValues).some((value) => value === '')}
              >
                {'Submit and pay'}
              </Button>
            </Box>
          </form>
        </Grid>

        <Grid item xs={12} md={1}>
          <Divider orientation="vertical" flexItem />
        </Grid>

        <Grid item xs={12} md={5.5}>
          <ReachCard
            list={[adverts]}
            sx={{
              maxWidth: 450,
              maxHeight: 450,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
