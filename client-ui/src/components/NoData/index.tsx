import React from "react";
// MUI
import { Box } from "@mui/material";
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
// Styles
import classes from './styles.module.scss';

const NoData: React.FC = () => {
  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <FileCopyOutlinedIcon fontSize="large" />
        No data to display
      </Box>
    </Box>
  )
}

export default NoData;
