'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default function Page() {
  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data === 'valid') {
      console.log('login is valid!');
    } else {
      console.log('not valid');
    }
  }

  const handleSubmit = (event) => {
    console.log('handling submit');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email');
    let pass = data.get('pass');
    console.log('Sent email:' + email);
    console.log('Sent pass:' + pass);
    let url = `http://localhost:3000/api/login?email=${email}&pass=${pass}`;
    console.log(url);
    runDBCallAsync(url);
  };

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: '#333',
              width: '100%',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <Typography variant="h4" color="primary">
              Welcome to Our Page
            </Typography>
          </Box>

          {/* Form */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="pass"
              id="pass"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>

            {/* Grid Boxes */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box border={1} p={2}>
                  <Typography variant="body1">Some additional words here.</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box border={1} p={2}>
                  <Typography variant="body1">And more words here.</Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Footer */}
            <Box
              sx={{
                backgroundColor: '#333',
                width: '100%',
                padding: '20px',
                textAlign: 'center',
                marginTop: '20px',
              }}
            >
              <Typography variant="body1" color="primary">
                © 2024 All rights reserved.
              </Typography>
            </Box>

            {/* Links */}
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}