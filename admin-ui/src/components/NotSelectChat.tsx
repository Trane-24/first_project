import { Box } from '@mui/material';
import React from 'react';

const NotSelectChat: React.FC = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', borderRadius: '0 4px 4px 0' }}>
      <img src="/images/selectChat.svg" alt="Select chat" />
    </Box>
  )
};

export default NotSelectChat;
