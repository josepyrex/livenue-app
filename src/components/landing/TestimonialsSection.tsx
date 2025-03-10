import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  IconButton, 
  useTheme, 
  styled, 
  alpha,
  useMediaQuery
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// Define prop interfaces for styled components
interface TestimonialCardProps {
  isactive?: string;
}

interface QuoteIconProps {
  usertype?: string;
}

// Testimonial card with dynamic styling
const TestimonialCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isactive'
})<TestimonialCardProps>(({ theme, isactive }) => ({
  height: '100%',
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(20px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: isactive === 'true' 
    ? `0 16px 40px -12px ${alpha(theme.palette.common.black, 0.25)}` 
    : 'none',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transform: isactive === 'true' ? 'scale(1)' : 'scale(0.9)',
  opacity: isactive === 'true' ? 1 : 0.6,
  transition: 'all 0.4s ease',
  pointerEvents: isactive === 'true' ? 'auto' : 'none',
  position: 'absolute',
  width: '100%',
  '&:hover': {
    boxShadow: isactive === 'true' 
      ? `0 20px 50px -12px ${alpha(theme.palette.common.black, 0.3)}` 
      : 'none',
  },
}));

// Navigation button styling
const NavButton = styled(IconButton)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  '&:hover': {
    background: alpha(theme.palette.background.paper, 0.9),
  },
}));

// Quote icon styling
const QuoteIcon = styled(FormatQuoteIcon, {
  shouldForwardProp: (prop) => prop !== 'usertype'
})<QuoteIconProps>(({ theme, usertype }) => ({
  fontSize: 60,
  color: usertype === 'musician' 
    ? alpha(theme.palette.primary.main, 0.4) 
    : alpha(theme.palette.secondary.main, 0.4),
  position: 'absolute',
  top: 20,
  right: 20,
}));

const TestimonialsSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Testimonial data structure
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Indie Rock Band Lead",
      userType: "musician",
      avatar: "/images/placeholder-avatar.jpg", // This would be replaced with real images
      quote: "Before Live, booking venues in NYC was a full-time job on its own. Now I spend more time on my music and less time sending unanswered emails.",
    },
    {
      name: "The Bowery Electric",
      role: "East Village Venue",
      userType: "venue",
      avatar: "/images/placeholder-venue.jpg",
      quote: "We've discovered incredible new talent through Live that we'd never have found otherwise. Our calendar stays full, and our audiences keep growing.",
    },
    {
      name: "Sarah Chen",
      role: "Jazz Vocalist",
      userType: "musician",
      avatar: "/images/placeholder-avatar-2.jpg",
      quote: "The transparency around payment and venue details has been game-changing. I know exactly what to expect before I commit to a performance.",
    },
    {
      name: "Brooklyn Night Bazaar",
      role: "Williamsburg Venue",
      userType: "venue",
      avatar: "/images/placeholder-venue-2.jpg",
      quote: "When we had a last-minute cancellation, we found a replacement act within hours through Live. The quality filter saved us from a potentially empty night.",
    }
  ];
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.background.paper, 0.3)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
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
          Success Stories
        </Typography>
        
        <Typography
          variant="h5"
          color="text.secondary"
          align="center"
          sx={{ 
            maxWidth: 700, 
            mx: 'auto', 
            mb: 8,
            lineHeight: 1.6
          }}
        >
          Hear from musicians and venues already connecting on our platform
        </Typography>
        
        <Box
          sx={{
            position: 'relative',
            height: { xs: 400, md: 300 },
            mb: 4
          }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              isactive={(index === activeIndex).toString()}
              sx={{
                zIndex: index === activeIndex ? 3 : 1,
                left: 0,
                right: 0,
              }}
            >
              <CardContent sx={{ p: 4, height: '100%', position: 'relative' }}>
                <QuoteIcon usertype={testimonial.userType} />
                
                <Typography
                  variant="h6"
                  component="blockquote"
                  sx={{ 
                    fontStyle: 'italic',
                    mb: 4,
                    fontSize: '1.2rem',
                    maxWidth: '80%',
                    lineHeight: 1.6
                  }}
                >
                  "{testimonial.quote}"
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ 
                      width: 56, 
                      height: 56,
                      bgcolor: testimonial.userType === 'musician' 
                        ? theme.palette.primary.main 
                        : theme.palette.secondary.main,
                      boxShadow: `0 0 0 3px ${alpha(
                        testimonial.userType === 'musician' 
                          ? theme.palette.primary.main 
                          : theme.palette.secondary.main, 
                        0.3
                      )}`
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </Avatar>
                  
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {testimonial.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </TestimonialCard>
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <NavButton
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </NavButton>
          
          <NavButton
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </NavButton>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;