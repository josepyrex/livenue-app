// src/components/landing/HeroSection.tsx
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  useTheme, 
  styled,
  alpha,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Gradient text effect for headline
const GradientTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: '-1px',
  background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(2),
}));

// Animated background element
const BackgroundGradient = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-10%',
  right: '-5%',
  width: '50%',
  height: '120%',
  background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, rgba(0,0,0,0) 70%)`,
  borderRadius: '50%',
  filter: 'blur(60px)',
  animation: 'pulse 8s ease-in-out infinite alternate',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1) translate(0, 0)',
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(1.1) translate(-5%, 5%)',
      opacity: 0.7,
    },
  },
  zIndex: -1,
}));

// Secondary background element
const SecondaryGradient = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-20%',
  left: '-10%',
  width: '40%',
  height: '60%',
  background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, rgba(0,0,0,0) 70%)`,
  borderRadius: '50%',
  filter: 'blur(60px)',
  animation: 'float 10s ease-in-out infinite alternate',
  '@keyframes float': {
    '0%': {
      transform: 'scale(1) translate(0, 0)',
    },
    '100%': {
      transform: 'scale(1.2) translate(5%, -5%)',
    },
  },
  zIndex: -1,
}));

// CTA Buttons with enhanced styling
const MusicianButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.25)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.35)}`,
    transform: 'translateY(-2px)',
  },
}));

const VenueButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: `0 4px 14px 0 ${alpha(theme.palette.secondary.main, 0.25)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 6px 20px 0 ${alpha(theme.palette.secondary.main, 0.35)}`,
    transform: 'translateY(-2px)',
  },
}));

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        position: 'relative',
        pt: { xs: 15, md: 20 }, 
        pb: { xs: 10, md: 15 },
        overflow: 'hidden'
      }}
    >
      {/* Animated background gradients */}
      <BackgroundGradient />
      <SecondaryGradient />

      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <GradientTypography variant="h1" as="h1">
              Connect. Book. Perform.
            </GradientTypography>
              
              <Typography 
                variant="h5" 
                color="text.secondary"
                sx={{ 
                  mb: 4,
                  lineHeight: 1.5,
                  fontWeight: 400,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                The platform where musicians and venues in NYC connect directly. 
                No middlemen, no hassle—just music.
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <MusicianButton variant="contained" disableElevation>
                  <RouterLink to="/register?type=musician" style={{ color: 'inherit', textDecoration: 'none' }}>
                     I'm a Musician
                  </RouterLink>
                </MusicianButton>
                
                <VenueButton 
                  variant="contained"
                  disableElevation
                  >
                   <RouterLink 
                     to="/register?type=venue" 
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      I'm a Venue
                    </RouterLink>
                </VenueButton>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mt: 2, opacity: 0.8 }}
                align={isMobile ? "center" : "left"}
              >
                Join 500+ musicians and 100+ venues already on the platform
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            {/* Here we'd typically have an image or illustration */}
            <Box
              sx={{
                height: 450,
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                borderRadius: theme.shape.borderRadius * 2,
                boxShadow: `0 16px 40px -12px ${alpha('#000', 0.3)}`,
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              {/* Placeholder for actual hero image or app preview */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: alpha(theme.palette.primary.main, 0.2),
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" fontWeight={700}>
                  App Preview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  (Replace with actual UI mockup)
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;