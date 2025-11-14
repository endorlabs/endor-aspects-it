import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Alert,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

import ImageUploader from '../molecules/ImageUploader';
import ImageComparison from '../molecules/ImageComparison';
import { resizeImageTo100x100, formatFileSize } from '../../utils/imageResizer';

/**
 * ImageResizerCard Organism Component
 * Main card containing uploader + comparison + download functionality
 */
const ImageResizerCard = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState(null);
  const [resizedDimensions, setResizedDimensions] = useState(null);
  const [originalFileSize, setOriginalFileSize] = useState(null);
  const [resizedFileSize, setResizedFileSize] = useState(null);
  const [resizedBlob, setResizedBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = async (file) => {
    if (!file) {
      console.log('No file provided to handleImageSelect');
      return;
    }

    console.log('File selected:', file.name, file.type, file.size);
    
    // Reset all state first
    setOriginalImage(null);
    setResizedImage(null);
    setOriginalDimensions(null);
    setResizedDimensions(null);
    setOriginalFileSize(null);
    setResizedFileSize(null);
    setResizedBlob(null);
    setError(null);
    setLoading(true);
    
    try {
      // Store original file info
      setOriginalFileSize(formatFileSize(file.size));
      
      // Resize the image
      const result = await resizeImageTo100x100(file);
      
      console.log('Resize result:', result);
      
      // Update state with results
      setOriginalImage(result.original);
      setResizedImage(result.resized);
      setOriginalDimensions(result.originalDimensions);
      setResizedDimensions(result.resizedDimensions);
      setResizedBlob(result.blob);
      setResizedFileSize(formatFileSize(result.blob.size));
      
      toast.success('Image resized successfully!');
      
    } catch (err) {
      console.error('Error resizing image:', err);
      setError(err.message);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resizedBlob) {
      toast.error('No resized image to download');
      return;
    }

    try {
      saveAs(resizedBlob, 'resized-image-100x100.png');
      toast.success('Image downloaded successfully!');
    } catch (err) {
      console.error('Error downloading image:', err);
      toast.error('Failed to download image');
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setResizedImage(null);
    setOriginalDimensions(null);
    setResizedDimensions(null);
    setOriginalFileSize(null);
    setResizedFileSize(null);
    setResizedBlob(null);
    setError(null);
    toast.success('Reset successful');
  };

  return (
    <Card 
      elevation={3} 
      sx={{ 
        maxWidth: 1200, 
        mx: 'auto',
        my: 2
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4
          }}
        >
          Image Resizer
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            textAlign: 'center',
            mb: 4
          }}
        >
          Upload any image and resize it to exactly 100×100 pixels
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <ImageUploader
          onImageSelect={handleImageSelect}
          loading={loading}
          disabled={loading}
          sx={{ mb: 4 }}
        />

        <ImageComparison
          originalImage={originalImage}
          resizedImage={resizedImage}
          originalDimensions={originalDimensions}
          resizedDimensions={resizedDimensions}
          originalFileSize={originalFileSize}
          resizedFileSize={resizedFileSize}
          sx={{ mb: 4 }}
        />

        {resizedImage && (
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                px: 4,
                py: 1.5
              }}
            >
              Download Resized Image
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={handleReset}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                px: 4,
                py: 1.5
              }}
            >
              Reset
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageResizerCard;
