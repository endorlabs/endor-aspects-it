import React from 'react';
import { 
  Container, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography,
  CssBaseline 
} from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';

/**
 * MainLayout Template Component
 * App layout with Material-UI Container/Box and header
 */
const MainLayout = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <CssBaseline />
      
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <ImageIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Image Resizer Tool
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;
