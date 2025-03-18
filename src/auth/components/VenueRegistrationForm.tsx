// src/auth/components/VenueRegistrationForm.tsx
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

interface VenueRegistrationFormProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const VenueRegistrationForm: React.FC<VenueRegistrationFormProps> = ({
  formData,
  onChange,
  onSubmit
}) => {
  const theme = useTheme();
  
  const venueTypeOptions = [
    'Bar', 'Club', 'Concert Hall', 'Coffee Shop', 'Restaurant', 
    'Theater', 'Outdoor Space', 'Art Gallery', 'Other'
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
        Venue Profile
      </Typography>
      
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Tell musicians about your venue
      </Typography>
      
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Venue Name"
              value={formData.venueName || ''}
              onChange={(e) => onChange('venueName', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Venue Type</InputLabel>
              <Select
                value={formData.venueType || ''}
                label="Venue Type"
                onChange={(e) => onChange('venueType', e.target.value)}
              >
                {venueTypeOptions.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Capacity"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={formData.capacity || ''}
              onChange={(e) => onChange('capacity', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Location
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              value={formData.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="City"
              value={formData.city || ''}
              onChange={(e) => onChange('city', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="State"
              value={formData.state || ''}
              onChange={(e) => onChange('state', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="ZIP Code"
              value={formData.zipCode || ''}
              onChange={(e) => onChange('zipCode', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Venue Description"
              value={formData.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Tell musicians about your venue, atmosphere, equipment provided, and typical audience..."
              helperText="Minimum 50 characters"
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
            background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.light, 0.9)})`,
          }}
        >
          Create Account
        </Button>
      </Box>
    </Paper>
  );
};

export default VenueRegistrationForm;