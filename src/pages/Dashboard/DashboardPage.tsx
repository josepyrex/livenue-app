// src/pages/Dashboard/DashboardPage.tsx
import React, { useEffect } from 'react';
import { Box, Container, Typography, Button, Paper, Grid, useTheme, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();
  
  useEffect(() => {
    // Redirect based on user type
    if (userProfile?.userType === 'musician') {
      navigate('/musician-dashboard');
    } else if (userProfile?.userType === 'venue') {
      navigate('/venue-dashboard');
    }
  }, [userProfile, navigate]);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: theme.shape.borderRadius * 2,
            background: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Welcome to your dashboard! This is a placeholder page that will redirect you to the appropriate dashboard based on your user type.
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  User Information
                </Typography>
                <Typography variant="body1">
                  Email: {currentUser?.email}
                </Typography>
                <Typography variant="body1">
                  User Type: {userProfile?.userType || 'Loading...'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            sx={{ mt: 4 }}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default DashboardPage;