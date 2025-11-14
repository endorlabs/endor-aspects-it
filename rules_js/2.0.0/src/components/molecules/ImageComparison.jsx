import React from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import ImagePreview from '../atoms/ImagePreview';

/**
 * ImageComparison Molecule Component
 * Side-by-side display of original and resized images
 */
const ImageComparison = ({ 
  originalImage, 
  resizedImage, 
  originalDimensions,
  resizedDimensions,
  originalFileSize,
  resizedFileSize,
  sx = {} 
}) => {
  if (!originalImage && !resizedImage) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 4,
          ...sx 
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Upload an image to see the comparison
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ ...sx }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          mb: 3
        }}
      >
        Image Comparison
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ImagePreview
            src={originalImage}
            alt="Original image"
            label="Original Image"
            dimensions={originalDimensions}
            fileSize={originalFileSize}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <ImagePreview
            src={resizedImage}
            alt="Resized image"
            label="Resized to 100×100"
            dimensions={resizedDimensions}
            fileSize={resizedFileSize}
          />
        </Grid>
      </Grid>
      
      {originalImage && resizedImage && (
        <>
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Resize Summary
            </Typography>
            
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Original: {originalDimensions?.width}×{originalDimensions?.height}
                </Typography>
              </Grid>
              
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  →
                </Typography>
              </Grid>
              
              <Grid item>
                <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  Resized: 100×100
                </Typography>
              </Grid>
            </Grid>
            
            {originalFileSize && resizedFileSize && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mt: 1 }}
              >
                File size: {originalFileSize} → {resizedFileSize}
              </Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ImageComparison;
