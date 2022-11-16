import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

export const StyledTextField = withStyles({
  root: {
    '& label': {
      color: '#000',
    },
    '& label.Mui-focused': {
      color: '#000',
    },
    '& label.Mui-disabled': {
      color: '#000',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
      paddingLeft: '20px',
      backgroundColor: '#fff',
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.87)',
      },
      '&.Mui-focused fieldset': {
        boxShadow: 'inset 0 -4px 8px rgba(0, 0, 0, 0.3)',
      },
      '&.Mui-disabled fieldset': {
        borderColor: '#fff',
      },
    },
    '& .Mui-error, & .Mui-error .MuiOutlinedInput-notchedOutline': {
      color: '#CB3D40',
      borderColor: '#fff',
    },
  },
})(TextField);

