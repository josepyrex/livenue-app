// src/components/landing/Navbar.tsx
import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  useMediaQuery,
  styled,
  alpha
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

// Enhanced AppBar with backdrop filter for glass effect
const GlassAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: 'none',
}));

// Logo typography with gradient effect
const LogoTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: '-0.5px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

// Nav link with hover effect
const NavLink = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
}));

// Primary CTA button
const SignupButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  padding: '8px 24px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.25)}`,
  '&:hover': {
    boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.35)}`,
  },
}));

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { text: 'Musicians', path: '/musicians' },
    { text: 'Venues', path: '/venues' },
    { text: 'How It Works', path: '/how-it-works' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navLinks.map((link) => (
         <ListItem key={link.text} component={RouterLink} to={link.path}>
            <ListItemText 
              primary={link.text}
              primaryTypographyProps={{ 
                fontWeight: 600,
                color: 'text.primary' 
              }}
            />
          </ListItem>
        ))}
        <ListItem 
          component={RouterLink} 
          to="/login"
          sx={{ 
         '&:hover': { 
         bgcolor: 'rgba(0, 0, 0, 0.04)' 
           },
         borderRadius: 1
           }}
        >
          <ListItemText 
             primary="Log In" 
            primaryTypographyProps={{ 
            fontWeight: 600,
            color: 'text.primary' 
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <GlassAppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <LogoTypography variant="h5" sx={{ textDecoration: 'none' }}>
  <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
    LiveNue
  </RouterLink>
</LogoTypography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <NavLink>
                <RouterLink to={link.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {link.text}
                </RouterLink>
              </NavLink>
              ))}
              <Box sx={{ ml: 3, display: 'flex', gap: 2 }}>
                <Button 
                  component={RouterLink} 
                  to="/login"
                  variant="outlined" 
                  color="primary"
                  sx={{ borderRadius: theme.shape.borderRadius * 3 }}
                >
                  Log In
                </Button>
                <SignupButton variant="contained" disableElevation>
  <RouterLink to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
    Sign Up
  </RouterLink>
</SignupButton>
              </Box>
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </GlassAppBar>
  );
};

export default Navbar;