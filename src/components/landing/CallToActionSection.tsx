import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  useTheme, 
  styled, 
  alpha 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Gradient background container
const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
  borderRadius: theme.shape.borderRadius * 3,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `0 20px 60px -20px ${alpha(theme.palette.primary.main, 0.6)}`,
}));

// Animated dots pattern in background
const AnimatedPattern = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.1,
  backgroundImage: `radial-gradient(circle, ${theme.palette.common.white} 2px, transparent 2px)`,
  backgroundSize: '24px 24px',
  animation: 'patternMove 40s linear infinite',
  '@keyframes patternMove': {
    '0%': {
      backgroundPosition: '0 0',
    },
    '100%': {
      backgroundPosition: '100px 100px',
    },
  },
}));

// Custom prop interface for button
interface CTAButtonProps {
  secondary?: string;
}

// CTA button with hover effect
const CTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'secondary'
})<CTAButtonProps>(({ theme, secondary }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius * 3,
  textTransform: 'none',
  boxShadow: secondary 
    ? 'none' 
    : `0 8px 20px -8px ${alpha(theme.palette.common.black, 0.4)}`,
  background: secondary 
    ? 'transparent' 
    : theme.palette.common.white,
  color: secondary 
    ? theme.palette.common.white 
    : theme.palette.primary.main,
  border: secondary 
    ? `2px solid ${theme.palette.common.white}` 
    : 'none',
  '&:hover': {
    background: secondary 
      ? alpha(theme.palette.common.white, 0.1) 
      : theme.palette.common.white,
    boxShadow: secondary 
      ? 'none' 
      : `0 8px 25px -5px ${alpha(theme.palette.common.black, 0.5)}`,
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const CallToActionSection: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <GradientBox sx={{ py: { xs: 6, md: 8 }, px: { xs: 3, md: 6 } }}>
          <AnimatedPattern />
          
          <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <Typography
              variant="h2"
              component="h2"
              color="white"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Ready to Transform Your Music Experience?
            </Typography>
            
            <Typography
              variant="h5"
              color="white"
              sx={{ 
                mb: 4,
                opacity: 0.9,
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Join hundreds of musicians and venues already building connections through Live
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                justifyContent: 'center',
                flexWrap: { xs: 'wrap', sm: 'nowrap' }
              }}
            >
              <CTAButton>
                <RouterLink 
                  to="/register" 
                  style={{ 
                    color: 'inherit', 
                    textDecoration: 'none',
                    display: 'block',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  Get Started Free
                </RouterLink>
              </CTAButton>
              
              <CTAButton secondary="true">
                <RouterLink 
                  to="/how-it-works" 
                  style={{ 
                    color: 'inherit', 
                    textDecoration: 'none',
                    display: 'block',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  Learn More
                </RouterLink>
              </CTAButton>
            </Box>
          </Box>
        </GradientBox>
      </Container>
    </Box>
  );
};

export default CallToActionSection;