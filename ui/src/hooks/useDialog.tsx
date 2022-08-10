import React, { useMemo, useState } from 'react';
import { Dialog as MuiDialog } from '@mui/material';

interface Props {
  children: any,
}

const useDialog = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);

  const closeDialog = () => setOpen(false);

  const Dialog = useMemo(() => {
    const DialogComponent: React.FC<Props> = ({ children, ...props}) => {
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
