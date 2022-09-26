import { Box, Typography } from '@mui/material';
import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

interface Props {
  title: string;
  renderFun: () => React.ReactNode;
}


const InfoPage: React.FC<Props> = ({ title, renderFun }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const classes = useStyles();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <KeyboardBackspaceIcon sx={{ cursor: 'pointer'}} onClick={goBack} />

        <Typography variant='h5'>
          {title}
        </Typography>
      </Box>

      <Box className={classes.list}>
        <Box className={classes.items}>
          {renderFun()}
        </Box>
      </Box>

    </Box>
  )
};

export default InfoPage;

const useStyles = makeStyles({
  list: {
    marginTop: '20px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 0px 0px 1px #E0E0E0',
    overflow: 'hidden',
  },
  items: {
    maxHeight: 'calc(100vh - 196px)',
    overflowY: 'scroll',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 164px)',
    },
  },
  pagination: {
    boxShadow: '0px -3px 6px -1px rgb(0 0 0 / 8%)',
  },
  image: {
    // objectFit: 'contain',
    maxHeight: 'calc(100vh - 202px)',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 222px)',
    },
  }
})
