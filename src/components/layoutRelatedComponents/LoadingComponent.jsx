import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingComponent() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
