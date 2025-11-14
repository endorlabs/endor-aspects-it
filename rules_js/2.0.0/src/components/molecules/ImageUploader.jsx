import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { CloudUpload as UploadIcon, Image as ImageIcon } from '@mui/icons-material';
import FileUploadButton from '../atoms/FileUploadButton';
import { isValidImageFile } from '../../utils/imageResizer';

/**
 * ImageUploader Molecule Component
 * Combines dropzone with upload button and drag-and-drop functionality
 */
const ImageUploader = ({ 
  onImageSelect, 
  loading = false, 
  disabled = false,
  sx = {} 
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (isValidImageFile(file)) {
        onImageSelect(file);
      }
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp']
    },
    multiple: false,
    disabled: disabled || loading
  });

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        textAlign: 'center',
        ...sx 
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: 4,
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover'
          },
          opacity: disabled || loading ? 0.6 : 1
        }}
      >
        <input {...getInputProps()} />
        
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={40} />
            <Typography variant="body1" color="text.secondary">
              Processing image...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {isDragActive ? (
              <>
                <UploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Typography variant="h6" color="primary.main">
                  Drop the image here!
                </Typography>
              </>
            ) : (
              <>
                <ImageIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                <Typography variant="h6" gutterBottom>
                  Drag & drop an image here
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  or click to browse
                </Typography>
              </>
            )}
            
            <FileUploadButton
              onFileSelect={onImageSelect}
              disabled={disabled || loading}
              variant="outlined"
              size="medium"
            >
              Browse Files
            </FileUploadButton>
          </Box>
        )}
      </Box>
      
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ 
          mt: 2, 
          display: 'block' 
        }}
      >
        Supports: JPEG, PNG, GIF, WebP, BMP
      </Typography>
    </Paper>
  );
};

export default ImageUploader;
