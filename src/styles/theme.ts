// src/styles/theme.ts
export const colors = {
    // Primary palette
    primary: {
      main: '#00B2B2',    // Modern teal - our primary accent
      light: '#4FE3E3',   // Light teal variant for hover states
      dark: '#007A7A',    // Dark teal for pressed states
    },
    // Background scale
    background: {
      default: '#121212',  // Spotify-inspired dark background
      paper: '#1E1E1E',    // Card/elevation background
      elevated: '#282828', // Secondary elevation level
    },
    // Text hierarchy
    text: {
      primary: '#FFFFFF',  // Primary text on dark backgrounds
      secondary: '#B3B3B3', // Secondary/helper text
      disabled: '#727272', // Disabled state text
    },
    // Complementary accent for CTAs
    secondary: {
      main: '#FF9270',     // Soft coral - complementary to teal
      light: '#FFB59F',    // Light variant
      dark: '#CC6E50',     // Dark variant
    },
    // Feedback states
    success: '#1DB954',    // Spotify green
    error: '#FF5252',      // Error state
  };