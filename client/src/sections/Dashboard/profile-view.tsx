import { useAuthContext } from 'src/auth/hooks';

import { motion } from 'framer-motion';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { fDateTime } from 'src/utils/format-time';

export default function ProfileView() {
  const { user } = useAuthContext();

  const {
    name,
    role,
    company_name,
    company_category,
    company_type,
    website,
    sui_address,
    createdAt,
  } = user || {};

  return (
    <Container
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: 600,
        }}
      >
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Personal Information
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Name: {name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Role: {role}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Company Information
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Name: {company_name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Category: {company_category}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Type: {company_type}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Website: {website}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                SUI Address: {sui_address}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Member Since
              </Typography>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="subtitle1">{fDateTime(createdAt)}</Typography>
              </motion.div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
