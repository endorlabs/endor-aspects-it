/**
 * Image Resizer Utility
 * Resizes any image to exactly 100x100 pixels using Canvas API
 */

/**
 * Resizes an image file to exactly 100x100 pixels
 * @param {File} file - The image file to resize
 * @returns {Promise<{original: string, resized: string, blob: Blob}>} - Object containing data URLs and blob
 */
export const resizeImageTo100x100 = async (file) => {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        try {
          // Create canvas for resizing
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas size to exactly 100x100
          canvas.width = 100;
          canvas.height = 100;
          
          // Clear canvas with white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 100, 100);
          
          // Calculate scaling to fit image in 100x100 while maintaining aspect ratio
          const scale = Math.min(100 / img.width, 100 / img.height);
          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;
          
          // Center the image in the 100x100 canvas
          const x = (100 - scaledWidth) / 2;
          const y = (100 - scaledHeight) / 2;
          
          // Draw the scaled image
          ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
          
          // Convert to blob and data URL
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to create resized image blob'));
              return;
            }
            
            const resizedDataUrl = canvas.toDataURL('image/png', 1.0);
            
            resolve({
              original: e.target.result,
              resized: resizedDataUrl,
              blob: blob,
              originalDimensions: {
                width: img.width,
                height: img.height
              },
              resizedDimensions: {
                width: 100,
                height: 100
              }
            });
          }, 'image/png', 1.0);
          
        } catch (error) {
          reject(new Error(`Image processing failed: ${error.message}`));
        }
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = e.target.result;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Validates if a file is a valid image type
 * @param {File} file - File to validate
 * @returns {boolean} - True if valid image
 */
export const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
  return validTypes.includes(file.type.toLowerCase());
};

/**
 * Gets file size in human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
