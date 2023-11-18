import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {/* Horizontal container on top */}
          <Grid item xs={12}>
            <Box sx={{ bgcolor: '#cfe8fc', height: '10vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* Text in the top horizontal container */}
              <Typography variant="h5" align="center">
                Welcome to Chapter Chat
              </Typography>
            </Box>
          </Grid>

          {/* Left container with text */}
          <Grid item xs={6}>
            <Box sx={{ bgcolor: '#cfe8fc', height: '30vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* Text in the left vertical container */}
              <Typography variant="body1" align="center">
                Features
              </Typography>
              {/* Divider under "Features" */}
              <Divider sx={{ width: '80%', mt: 1, mb: 1 }} />
            </Box>
          </Grid>

          {/* Right container */}
          <Grid item xs={6}>
            <Box sx={{ bgcolor: '#cfe8fc', height: '30vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* Text in the right vertical container */}
              <Typography variant="body1" align="center">
                Start Here
              </Typography>
              {/* Divider under "Start Here" */}
              <Divider sx={{ width: '80%', mt: 1, mb: 1 }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}


