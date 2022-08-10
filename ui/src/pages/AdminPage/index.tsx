import React from 'react';
// Components
import Drawer from '../../components/Drawer';
import AdminRouting from './Admin.routing';
// Mui
import { Box } from '@mui/material';

const AdminPage:React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      <Drawer />
      <Box id="content" sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
        <AdminRouting />
      </Box>
    </Box>
  );
}

export default AdminPage;
