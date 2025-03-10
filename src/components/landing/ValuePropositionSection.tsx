import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  useTheme, 
  styled, 
  alpha 
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Feature card with glassmorphism effect
const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: alpha(theme.palette.background.paper, 0.6),
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.2)}`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 16px 40px 0 ${alpha(theme.palette.common.black, 0.3)}`,
  },
}));

// Gradient overlay for section background
const GradientOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.15)}, transparent 60%)`,
  zIndex: -1,
}));

// Define interface for component props
interface IconBoxProps {
  color?: string;
}

// Feature icon container with gradient background
const IconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color'
})<IconBoxProps>(({ theme, color }) => {
  const iconColor = color || theme.palette.primary.main;
  
  return {
    width: 64,
    height: 64,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${iconColor} 0%, ${alpha(iconColor, 0.7)} 100%)`,
    marginBottom: theme.spacing(2),
    boxShadow: `0 8px 16px -4px ${alpha(iconColor, 0.5)}`,
  };
});

const ValuePropositionSection: React.FC = () => {
  const theme = useTheme();
  
  // Feature data structure ensures content separation from presentation
  const features = [
    {
      title: "For Musicians",
      description: "Discover venues that match your style, negotiate directly, and build your performance history—all in one platform.",
      icon: <MusicNoteIcon sx={{ fontSize: 32, color: 'white' }} />,
      benefits: [
        "Apply directly to venues that fit your genre and audience",
        "Negotiate fair payment terms with transparency",
        "Build a performance portfolio with ratings and attendance metrics",
        "Get discovered by venues looking for your specific talent"
      ],
      color: theme.palette.primary.main
    },
    {
      title: "For Venues",
      description: "Find vetted talent that draws crowds, fill calendar gaps, and ensure quality performances every time.",
      icon: <LocationOnIcon sx={{ fontSize: 32, color: 'white' }} />,
      benefits: [
        "Browse musicians filtered by genre, draw power, and reputation",
        "Fill last-minute calendar openings with quality talent",
        "Standardize booking processes and payment terms",
        "Build relationships with reliable performers"
      ],
      color: theme.palette.secondary.main
    }
  ];

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <GradientOverlay />
      
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Connecting Artists & Venues
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            A platform designed to solve the booking problem for both sides of the stage
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <FeatureCard>
                <CardContent sx={{ p: 4 }}>
                  <IconBox color={feature.color}>
                    {feature.icon}
                  </IconBox>
                  
                  <Typography 
                    variant="h4" 
                    component="h3"
                    sx={{ 
                      mb: 2,
                      fontWeight: 600,
                      color: alpha(feature.color, 0.9)
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 3, fontSize: '1.1rem' }}
                  >
                    {feature.description}
                  </Typography>
                  
                  <Box>
                    {feature.benefits.map((benefit, i) => (
                      <Box 
                        key={i} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          mb: 1.5
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: feature.color,
                            mr: 2,
                            boxShadow: `0 0 8px ${feature.color}`
                          }} 
                        />
                        <Typography variant="body1">
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ValuePropositionSection;