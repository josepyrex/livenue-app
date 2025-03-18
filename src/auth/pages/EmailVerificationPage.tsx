// src/auth/pages/EmailVerificationPage.tsx
import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress,
  Alert,
  useTheme,
  alpha
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const EmailVerificationPage: React.FC = () => {
  const theme = useTheme();
  const { currentUser, verifyEmail } = useAuth();
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Handle timer for resend button
  useEffect(() => {
    if (!canResend && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);
  
  const handleResendVerification = async () => {
    try {
      setError('');
      setMessage('');
      setLoading(true);
      await verifyEmail();
      setMessage('Verification email sent! Check your inbox.');
      setCanResend(false);
      setTimeLeft(60);
    } catch (error: any) {
      console.error('Email verification error:', error);
      setError('Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!currentUser) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: theme.shape.borderRadius * 2,
            background: alpha(theme.palette.background.paper, 0.4),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
            }}
          >
            <MailOutlineIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main }}
            />
          </Box>
          
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Verify Your Email
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We've sent a verification email to <strong>{currentUser.email}</strong>.<br />
            Please check your inbox and click the link to activate your account.
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {message && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {message}
            </Alert>
          )}
          
          <Button
            variant="outlined"
            color="primary"
            disabled={!canResend || loading}
            onClick={handleResendVerification}
            sx={{ 
              mb: 3,
              borderRadius: theme.shape.borderRadius * 3,
              py: 1,
              px: 3,
            }}
          >
            {loading ? 'Sending...' : canResend ? 'Resend Verification Email' : `Resend in ${timeLeft}s`}
          </Button>
          
          <Typography variant="body2" color="text.secondary">
            Already verified?{' '}
            <RouterLink
              to="/login"
              style={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Log in
            </RouterLink>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmailVerificationPage;