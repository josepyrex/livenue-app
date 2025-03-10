// src/pages/Landing/LandingPage.tsx
import React from 'react';
import Navbar from '../../components/landing/Navbar';
import HeroSection from '../../components/landing/HeroSection';
import ValuePropositionSection from '../../components/landing/ValuePropositionSection';
import HowItWorksSection from '../../components/landing/HowItWorksSection';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import CallToActionSection from '../../components/landing/CallToActionSection';
import Footer from '../../components/landing/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { colors } from '../../styles/theme';

// Create theme with our custom color palette
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    success: {
      main: colors.success,
    },
    error: {
      main: colors.error,
    },
  },
  typography: {
    fontFamily: '"Circular", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    button: {
      textTransform: 'none', // Apple-inspired - no uppercase buttons
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8, // Slightly rounded corners like Apple
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          fontSize: '1rem',
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${colors.primary.dark} 0%, ${colors.primary.main} 100%)`,
          '&:hover': {
            background: `linear-gradient(45deg, ${colors.primary.dark} 30%, ${colors.primary.main} 90%)`,
            boxShadow: `0 6px 20px rgba(0, 178, 178, 0.25)`,
          },
        },
      },
    },
  },
});

const LandingPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Navbar />
        <HeroSection />
        <ValuePropositionSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CallToActionSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;