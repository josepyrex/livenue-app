// src/auth/components/MusicianRegistrationForm.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  alpha
} from '@mui/material';

interface MusicianRegistrationFormProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const MusicianRegistrationForm: React.FC<MusicianRegistrationFormProps> = ({
  formData,
  onChange,
  onSubmit
}) => {
  const theme = useTheme();
  
  const genreOptions = [
    'Rock', 'Pop', 'Hip Hop', 'R&B', 'Jazz', 'Blues', 
    'Electronic', 'Classical', 'Country', 'Folk', 'Metal', 'Other'
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: theme.shape.borderRadius * 2,
        background: alpha(theme.palette.background.paper, 0.4),
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
        Musician Profile
      </Typography>
      
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Tell venues about you and your music
      </Typography>
      
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Artist/Band Name"
              value={formData.artistName || ''}
              onChange={(e) => onChange('artistName', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Primary Genre</InputLabel>
              <Select
                value={formData.genre || ''}
                label="Primary Genre"
                onChange={(e) => onChange('genre', e.target.value)}
              >
                {genreOptions.map((genre) => (
                  <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Website (optional)"
              value={formData.website || ''}
              onChange={(e) => onChange('website', e.target.value)}
              placeholder="https://your-website.com"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Bio"
              value={formData.bio || ''}
              onChange={(e) => onChange('bio', e.target.value)}
              placeholder="Tell venues about your music, experience, and what makes you unique..."
              helperText="Minimum 50 characters"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Performance Information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Typical Set Length (minutes)"
              type="number"
              InputProps={{ inputProps: { min: 15 } }}
              value={formData.setLength || ''}
              onChange={(e) => onChange('setLength', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Average Audience Draw"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={formData.audienceDraw || ''}
              onChange={(e) => onChange('audienceDraw', e.target.value)}
              helperText="Estimate how many people you typically bring to shows"
            />
          </Grid>
        </Grid>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ 
            mt: 4, 
            mb: 2,
            py: 1.5,
            borderRadius: theme.shape.borderRadius * 3,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.light, 0.9)})`,
          }}
        >
          Create Account
        </Button>
      </Box>
    </Paper>
  );
};

export default MusicianRegistrationForm;