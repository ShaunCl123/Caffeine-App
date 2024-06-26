'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import { green, yellow, red, blue, orange } from '@mui/material/colors';
import 'chart.js/auto';

export default function Page() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  const [coffeeIntake, setCoffeeIntake] = useState(0);

  // Use a ref to hold the chart instance
  const chartRef = useRef(null);

  const handleCoffeeInputChange = (event) => {
    let cups = parseInt(event.target.value, 10) || 0;

    // Ensure the user cannot exceed counting to 5
    cups = Math.min(cups, 5);

    setCoffeeIntake(cups);

    if (cups === 5) {
      alert('You have reached the maximum coffee intake for the day!');
    }
  };

  // create and update the chart
  const renderChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');

    // chart instance already exists, destroy it
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const scale = 3; // Adjust the scale based on how close the values should be to the limit

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Average', 'Average', 'Moderate', 'Extereme', 'Maximum'],
        datasets: [
          {
            label: 'Coffee Intake',
            data: [
              coffeeIntake,
              Math.min(coffeeIntake + 1, 5) * scale, // Adjust based on the limit
              Math.min(coffeeIntake + 2, 5) * scale, // Adjust based on the limit
              Math.min(coffeeIntake + 3, 5) * scale, // Adjust based on the limit
              Math.min(coffeeIntake + 4, 5) * scale, // Adjust based on the limit
            ],
            backgroundColor: [
              coffeeIntake === 1 ? green[500] : 'rgba(75, 192, 192, 0.2)',
              coffeeIntake === 2 ? blue[500] : 'rgba(75, 192, 192, 0.2)',
              coffeeIntake === 3 ? yellow[500] : 'rgba(75, 192, 192, 0.2)',
              coffeeIntake === 4 ? orange[500] : 'rgba(75, 192, 192, 0.2)',
              coffeeIntake === 5 ? red[500] : 'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  };

  // Call function
  useEffect(() => {
    renderChart();
  }, [coffeeIntake]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#E4C59E', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ backgroundColor: '#AF8260' }}> {/* Set background color */}
        <Toolbar>
          {/* Logo */}
          <img src="/logo/logo.jpg" alt="Logo of Something" style={{ marginRight: '55px', height: '55px' }} />
          <Typography variant="h6">Chart</Typography>
          <Button color="inherit" href="/home">
            Home
          </Button>
          <Button color="inherit" href="/scanner">
            Scanner
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" sx={{ padding: '20px', flex: '1' }}> {/* Set background color */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary">
                Caffeine Consumption
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div>
                <canvas id="myChart"></canvas>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Enter number of cups"
                variant="outlined"
                type="number"
                onChange={handleCoffeeInputChange}
                value={coffeeIntake}
                inputProps={{ max: 5, min: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={(coffeeIntake / 5) * 100}
                sx={{ width: '80%' }}
                color={
                  coffeeIntake === 1 ? 'success' : coffeeIntake === 5 ? 'warning' : 'error'
                }
              />
              {coffeeIntake === 5 && (
                <Alert severity="warning" sx={{ marginTop: 2 }}>
                  You have reached the maximum coffee intake for the day!
                </Alert>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
            {/* Grid Bars */}
            <Grid container spacing={2} style={{ textAlign: 'center', margin: 'auto' }}>
        <Grid item xs={12} sm={6}>
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundColor: '#000000', // Set background color to black
          width: '100%',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" color="primary">
          © 2024 All rights reserved.
        </Typography>
      </Box>
    </div>
  );
}
