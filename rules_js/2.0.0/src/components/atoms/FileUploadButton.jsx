import React, { useRef } from 'react';
import { Button, Box } from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

/**
 * FileUploadButton Atom Component
 * Styled Material-UI button for file selection
 */
const FileUploadButton = ({ 
  onFileSelect, 
  accept = 'image/*',
  multiple = false,
  disabled = false,
  variant = 'contained',
  size = 'large',
  children = 'Choose Image',
  sx = {}
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
    // Clear the input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <input
        ref={fileInputRef}
        accept={accept}
        style={{ display: 'none' }}
        multiple={multiple}
        type="file"
        onChange={handleFileChange}
        disabled={disabled}
      />
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        startIcon={<UploadIcon />}
        onClick={handleButtonClick}
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          px: 3,
          py: 1.5
        }}
      >
        {children}
      </Button>
    </Box>
  );
};

export default FileUploadButton;
