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
  const handleRemove =() => {
    remove();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <Typography>
          {`Are you sure want to delete ${title}`}
        </Typography>
        <Box>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmDeleteModal;
