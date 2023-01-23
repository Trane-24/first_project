import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
  remove: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({
  title,
  open,
  onClose,
  remove
}) => {
  const handleRemove = () => {
    remove();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        p: 5, backgroundColor: '#fff', borderRadius: '5px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
      }}>
        <Typography variant='h6'>
          {`Are you sure want to delete ${title}`}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, pt: 3}}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleRemove}>Delete</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmDeleteModal;
