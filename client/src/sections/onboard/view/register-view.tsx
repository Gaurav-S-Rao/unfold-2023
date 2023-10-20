import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import { COMPANY_CATEGORY_LIST, COMPANY_TYPE_LIST, userTypes } from 'src/config-global';
import { IuserTypes } from 'src/types/user';
import axiosInstance, { endpoints } from 'src/utils/axios-instance';

export default function LoginPageViewOnBoard() {
  const [role, setRole] = useState<IuserTypes['role']>(); // advertiser or publisher

  const [formValues, setFormValues] = useState({
    name: '',
    company_name: '',
    company_type: '',
    company_category: '',
    website: '',
  });

  const { user } = useAuthContext();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, role: IuserTypes['role']) => {
    e.preventDefault();
    setRole(role);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('🚀 ~ file: register-view.tsx ~ line 149 ~ handleSubmit ~ formValues', formValues);
    console.log('🚀 ~ file: register-view.tsx ~ line 149 ~ handleSubmit ~ user', user);

    try {
      await axiosInstance.patch(endpoints.user.update(user?.id), {
        ...formValues,
        role: role?.toLocaleUpperCase(),
      });

      window.location.reload();
    } catch (err) {
      console.log('🚀 ~ file: register-view.tsx ~ line 149 ~ handleSubmit ~ err', err);
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '2%' }}>
      {!role &&
        userTypes.map((userType) => {
          return (
            <Card
              key={userType.role}
              component={ButtonBase}
              sx={{
                margin: 1,
                width: 300,
                height: 200,
                cursor: 'pointer',
              }}
              onClick={(e) => handleButtonClick(e, userType.role)}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Typography variant="h4">{userType.label}</Typography>
                <IconButton>
                  <Iconify icon="maki:arrow" />
                </IconButton>
              </CardContent>
            </Card>
          );
        })}

      {role && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 172px)',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 3,
            }}
          >
            Registering as {role.toLocaleUpperCase()}
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              sx={{ m: 1, minWidth: 300 }}
              label="Name"
              variant="outlined"
              name="name"
              value={formValues.name}
              onChange={handleFormChange}
            />
            <TextField
              sx={{ m: 1, minWidth: 300 }}
              label="Company Name"
              variant="outlined"
              name="company_name"
              value={formValues.company_name}
              onChange={handleFormChange}
            />
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel>Company Type</InputLabel>
              <Select
                id="demo-simple-select-helper"
                name="company_type"
                value={formValues.company_type}
                onChange={handleFormChange}
              >
                {COMPANY_TYPE_LIST.map((companyType) => {
                  return (
                    <MenuItem value={companyType.value} key={companyType.value}>
                      {companyType.label}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select your title</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel>Company Category</InputLabel>
              <Select
                id="demo-simple-select-helper"
                value={formValues.company_category}
                name="company_category"
                onChange={handleFormChange}
              >
                {COMPANY_CATEGORY_LIST.map((companyCategory) => {
                  return (
                    <MenuItem value={companyCategory.value} key={companyCategory.value}>
                      {companyCategory.label}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select your title</FormHelperText>
            </FormControl>

            <TextField
              sx={{ m: 1, minWidth: 300 }}
              label="Website"
              variant="outlined"
              name="website"
              value={formValues.website}
              onChange={handleFormChange}
            />

            <Button
              sx={{ m: 1, color: 'red' }}
              onClick={() => {
                setFormValues({
                  name: '',
                  company_name: '',
                  company_type: '',
                  company_category: '',
                  website: '',
                });
              }}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ m: 1, minWidth: 300, minHeight: 50 }}
              disabled={Object.values(formValues).some((value) => value === '')}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
}
