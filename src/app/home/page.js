'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

// Import DatePicker component and its styles from react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Main component
export default function Page() {
  // Create a theme
  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  // State for the selected date and reminders
  const [date, setDate] = React.useState(new Date());
  const [reminders, setReminders] = React.useState({});

  // Function to handle reminder input change
  const handleReminderChange = (event) => {
    const newReminders = { ...reminders, [date.toDateString()]: event.target.value };
    setReminders(newReminders);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* App bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
          <Button color="inherit" href="/scanner">
            Scanner
          </Button>
          <Button color="inherit" href="/chart">
            Chart
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main content container */}
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
          {/* Avatar and header */}
          <Avatar>{/* Your Avatar */}</Avatar>
          <Typography component="h1" variant="h5">
            Welcome to the Health App
          </Typography>

          {/* App description */}
          <Typography variant="body1" align="center">
            This app is designed to help you monitor and improve your health. It provides various tools and features, including a scanner for health-related data and charts to track your progress.
          </Typography>

          {/* DatePicker component with reminder input */}
          <DatePicker selected={date} onChange={date => setDate(date)} />
          <input
            type="text"
            placeholder="Add a reminder"
            onChange={handleReminderChange}
          />

          {/* Display existing reminder for the selected day */}
          {reminders[date.toDateString()] && (
            <Typography variant="body2" align="center">
              Reminder: {reminders[date.toDateString()]}
            </Typography>
          )}

          {/* Grid Boxes */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box border={1} p={2} mt={4}>
                <Typography variant="body1">Displayed on this page is a calendar.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box border={1} p={2} mt={4}>
                <Typography variant="body1">Please enter a reminder so that we can remind you.</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      
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
    </ThemeProvider>
  );
}