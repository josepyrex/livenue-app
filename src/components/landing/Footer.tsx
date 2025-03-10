import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  IconButton, 
  Divider, 
  useTheme, 
  styled, 
  alpha 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Container with subtle gradient background
const FooterContainer = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.6),
  backdropFilter: 'blur(10px)',
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

// Logo typography with gradient
const LogoTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: '-0.5px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

// Footer link styling
const FooterLink = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

// Social media icon styling
const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
    background: alpha(theme.palette.primary.main, 0.1),
  },
}));

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  // Footer link groups
  const footerLinks = [
    {
      title: 'For Musicians',
      links: [
        { name: 'Find Venues', path: '/musicians/venues' },
        { name: 'Create Profile', path: '/register?type=musician' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Success Stories', path: '/musicians/stories' },
      ]
    },
    {
      title: 'For Venues',
      links: [
        { name: 'Discover Artists', path: '/venues/artists' },
        { name: 'Register Venue', path: '/register?type=venue' },
        { name: 'Booking Solutions', path: '/venues/booking' },
        { name: 'Testimonials', path: '/venues/testimonials' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
      ]
    },
  ];
  
  // Social media links
  const socialLinks = [
    { icon: <FacebookIcon />, path: 'https://facebook.com' },
    { icon: <TwitterIcon />, path: 'https://twitter.com' },
    { icon: <InstagramIcon />, path: 'https://instagram.com' },
    { icon: <LinkedInIcon />, path: 'https://linkedin.com' },
  ];

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Logo and description */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <LogoTypography variant="h4">
                  <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    LIVE
                  </RouterLink>
                </LogoTypography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Connecting musicians and venues in NYC. 
                The platform that makes booking live music easy, transparent, and fair for everyone.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <SocialIcon 
                    key={index}
                    onClick={() => window.open(social.path, '_blank', 'noopener,noreferrer')}
                    aria-label={`Visit our ${social.path.split('.com')[0].split('https://')[1]} page`}
                    size="small"
                  >
                    {social.icon}
                  </SocialIcon>
                ))}
              </Box>
            </Grid>
            
            {/* Links columns */}
            {footerLinks.map((group, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  {group.title}
                </Typography>
                
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {group.links.map((link, i) => (
                    <Box component="li" key={i} sx={{ mb: 1 }}>
                      <FooterLink href="#" onClick={(e) => {
                        e.preventDefault();
                        // Use native navigation or history.push in a real app
                      }}>
                        <RouterLink 
                          to={link.path} 
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {link.name}
                        </RouterLink>
                      </FooterLink>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
            
            {/* Contact and newsletter */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Contact Us
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                hello@liveapp.com
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                +1 (212) 555-1234
              </Typography>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.1) }} />
        
        <Box 
          sx={{ 
            py: 3, 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
            textAlign: { xs: 'center', sm: 'left' },
            gap: { xs: 2, sm: 0 }
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Live App. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FooterLink 
              href="#"
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                // Use native navigation or history.push in a real app
              }}
            >
              <RouterLink 
                to="/privacy" 
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Privacy Policy
              </RouterLink>
            </FooterLink>
            
            <FooterLink 
              href="#"
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                // Use native navigation or history.push in a real app
              }}
            >
              <RouterLink 
                to="/terms" 
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Terms of Service
              </RouterLink>
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;