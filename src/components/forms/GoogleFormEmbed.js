import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { Google } from '@mui/icons-material';

const GoogleFormEmbed = ({ formUrl, title, description }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Google sx={{ mr: 1, color: '#4285F4' }} />
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" paragraph>
        {description}
      </Typography>
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <iframe
          src={formUrl}
          width="100%"
          height="400"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title={title}
        >
          Loading…
        </iframe>
      </Box>
      <Button
        variant="outlined"
        href={formUrl}
        target="_blank"
        sx={{ mt: 2 }}
        startIcon={<Google />}
      >
        Open Form in New Tab
      </Button>
    </Paper>
  );
};

export default GoogleFormEmbed;