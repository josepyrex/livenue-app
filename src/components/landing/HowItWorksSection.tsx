import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Tabs, 
  Tab, 
  Grid, 
  Paper, 
  useTheme, 
  styled, 
  alpha 
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CelebrationIcon from '@mui/icons-material/Celebration';

// Styled tabs with custom indicator
const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: 3,
  },
  marginBottom: theme.spacing(6),
}));

// Custom tab styling
const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  padding: theme.spacing(2, 4),
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

// Define prop interfaces for styled components
interface StyledBoxProps {
  userType?: string;
}

// Process step card with subtle hover effect
const StepCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.3s ease',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

// Step number indicator with gradient
const StepNumber = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'userType',
})<StyledBoxProps>(({ theme, userType }) => {
  const color = userType === 'musician' ? theme.palette.primary.main : theme.palette.secondary.main;
  
  return {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
    color: theme.palette.common.white,
    fontWeight: 700,
    boxShadow: `0 4px 8px ${alpha(color, 0.5)}`,
  };
});

// Icon container
const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'userType',
})<StyledBoxProps>(({ theme, userType }) => {
  const color = userType === 'musician' ? theme.palette.primary.main : theme.palette.secondary.main;
  
  return {
    width: 64,
    height: 64,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: alpha(color, 0.1),
    marginBottom: theme.spacing(2),
    color: color,
  };
});

// Connection line between steps
const ConnectionLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'userType',
})<StyledBoxProps>(({ theme, userType }) => {
  const color = userType === 'musician' ? theme.palette.primary.main : theme.palette.secondary.main;
  
  return {
    position: 'absolute',
    height: 2,
    background: `linear-gradient(to right, ${color}, ${alpha(color, 0.3)})`,
    top: '32%',
    left: '60%',
    width: '40%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  };
});

const HowItWorksSection: React.FC = () => {
  const theme = useTheme();
  const [userType, setUserType] = useState<'musician' | 'venue'>('musician');
  
  const handleChange = (_event: React.SyntheticEvent, newValue: 'musician' | 'venue') => {
    setUserType(newValue);
  };
  
  // Process steps data structure
  const steps = {
    musician: [
      {
        title: 'Create Profile',
        description: 'Build your artist profile with media, performance history, and audience metrics.',
        icon: <AccountCircleIcon sx={{ fontSize: 32 }} />
      },
      {
        title: 'Discover Venues',
        description: 'Search venues that match your genre, size, and payment preferences.',
        icon: <SearchIcon sx={{ fontSize: 32 }} />
      },
      {
        title: 'Submit Applications',
        description: 'Apply directly to venues with your preferred dates and terms.',
        icon: <HandshakeIcon sx={{ fontSize: 32 }} />
      },
      {
        title: 'Perform',
        description: 'Play your gig, collect payment, and build your performance history.',
        icon: <CelebrationIcon sx={{ fontSize: 32 }} />
      }
    ],
    venue: [
      {
        title: 'Create Venue Profile',
        description: 'Showcase your space with details on capacity, equipment, and audience.',
        icon: <AccountCircleIcon sx={{ fontSize: 32 }} />
      },
      {
        title: 'Browse Artists',
        description: 'Search for musicians that fit your venue\'s style and audience expectations.',
        icon: <SearchIcon sx={{ fontSize: 32 }} />
      },
      {
        title: 'Send Booking Offers',
        description: 'Reach out directly to artists with your terms and available dates.',
        icon: <HandshakeIcon sx={{ fontSize: 32 }} />
      },
      {
        title: 'Host Amazing Shows',
        description: 'Welcome artists to your venue and grow your reputation in the music scene.',
        icon: <CelebrationIcon sx={{ fontSize: 32 }} />
      }
    ]
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            fontWeight: 700,
            mb: 2
          }}
        >
          How It Works
        </Typography>
        
        <Typography
          variant="h5"
          color="text.secondary"
          align="center"
          sx={{ 
            maxWidth: 700, 
            mx: 'auto', 
            mb: 6,
            lineHeight: 1.6
          }}
        >
          A simple process designed for both sides of the music industry
        </Typography>
        
        <StyledTabs
          value={userType}
          onChange={handleChange}
          centered
        >
          <StyledTab value="musician" label="For Musicians" />
          <StyledTab value="venue" label="For Venues" />
        </StyledTabs>
        
        <Grid container spacing={4} position="relative">
          {steps[userType].map((step, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={6} md={3}>
                <StepCard elevation={2}>
                  <StepNumber userType={userType}>{index + 1}</StepNumber>
                  <IconContainer userType={userType}>
                    {step.icon}
                  </IconContainer>
                  <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepCard>
              </Grid>
              
              {index < steps[userType].length - 1 && (
                <ConnectionLine userType={userType} />
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;