import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

/**
 * ImagePreview Atom Component
 * Displays a single image with label and dimensions
 */
const ImagePreview = ({ 
  src, 
  alt = 'Image preview', 
  label, 
  dimensions, 
  fileSize,
  sx = {} 
}) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        textAlign: 'center',
        ...sx 
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        {label}
      </Typography>
      
      <Box
        sx={{
          width: '100%',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          overflow: 'hidden',
          mb: 2
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '4px'
            }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No image
          </Typography>
        )}
      </Box>
      
      {dimensions && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {dimensions.width} × {dimensions.height} pixels
        </Typography>
      )}
      
      {fileSize && (
        <Typography variant="body2" color="text.secondary">
          {fileSize}
        </Typography>
      )}
    </Paper>
  );
};

export default ImagePreview;
