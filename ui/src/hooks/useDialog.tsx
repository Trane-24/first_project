import React, { useMemo, useState } from 'react';
import { Dialog as MuiDialog, DialogProps } from '@mui/material';

const useDialog = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);

  const closeDialog = () => setOpen(false);

  const Dialog = useMemo(() => {
    const DialogComponent: React.FC<Omit<DialogProps, 'onClose' | 'open'>> = ({ children, ...props}) => {
      return (
        <MuiDialog
          {...props}
          open={open}
          onClose={closeDialog}
          fullWidth
        >
          {children}
        </MuiDialog>
      )
    }

    return DialogComponent;
  }, [open]);

  return {
    Dialog,
    openDialog,
    closeDialog,
  }
}

export default useDialog;
