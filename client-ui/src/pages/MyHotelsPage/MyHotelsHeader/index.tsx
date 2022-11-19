import React from "react";
// Hooks
import useDialog from "hooks/useDialog";
// Componnts
import Title from "components/Title";
// Mui
import { Box, Button } from "@mui/material";
// Styles
import classes from './styles.module.scss';
import MyHotelsForm from "../MyHotelsForm";

const MyHotelsHeader: React.FC = () => {
  const {Dialog, openDialog, closeDialog} = useDialog();

  return (
    <React.Fragment>
      <Dialog  maxWidth="md">
        <MyHotelsForm onClose={closeDialog}/>
      </Dialog>

      <Box className={classes.header}>
        <Title>Hotels</Title>

        <Button
          sx={{ height: '40px' }}
          variant='contained'
          onClick={openDialog}
        >
          Create hotel
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default MyHotelsHeader;
