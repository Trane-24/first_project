import { Box, Typography } from "@mui/material";
import React from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

interface Props {
  value?: string;
  isDone: boolean;
  message: string;
}

const MessageInfo: React.FC<Props> = ({value, isDone, message} ) => {
  if (!value) {
    return (
    <React.Fragment>
      <Box sx={{ display: 'flex', gap: 1, opacity: '0.8'}}>
        <FiberManualRecordIcon fontSize='small' />
        <Typography>
          {message}
        </Typography>
      </Box>
    </React.Fragment>
    )
  } else if (value && isDone) {
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', gap: 1, color: 'green'}}>
          <CheckCircleOutlineIcon fontSize='small' />
          <Typography>
            {message}
          </Typography>
        </Box>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', gap: 1, color: 'red'}}>
          <NotInterestedIcon fontSize='small' />
          <Typography>
            {message}
          </Typography>
        </Box>
      </React.Fragment>
  )
};

export default MessageInfo;
