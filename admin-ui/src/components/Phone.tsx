
import { FC } from 'react';
// react-phone
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css'
// Mui
import { makeStyles } from '@mui/styles';
import { Theme, FormControl, FormHelperText, TextFieldProps } from '@mui/material';

type Props = Omit<TextFieldProps, 'onChange'> & {
  label: string;
  value: string;
  onChange: () => void;
};

const Phone:FC<Props> = ({ label, name, value, required, error, helperText, margin, onChange }) => {
  const classes = useStyles();

  return (
    <FormControl error={error} fullWidth margin={margin || 'normal'}>
      <PhoneInput
        containerClass={`${classes.container} ${error ? classes.containerError : ''}`}
        value={value}
        onChange={onChange}
        specialLabel={`${label}${required ? ` *`: ''}`}
        inputProps={{
          name,
          required
        }}
        country={'ua'}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
};

export default Phone;

// Styles
const useStyles = makeStyles((theme:Theme) => ({
  container: {
    fontFamily: theme.typography.fontFamily,
    '& .special-label': {
      color: 'rgba(0,0,0,0.6)',
      left: '10px',
      top: '-9px',
      fontSize: '12px',
      paddingRight: '4px',
      paddingLeft: '4px'
    },
    '& .form-control': {
      width: '100%'
    }
  },
  containerError: {
    '& .special-label': {
      color: theme.palette.error.main
    },
    '& .form-control': {
      borderColor: theme.palette.error.main,
      '&:focus': {
        borderColor: theme.palette.error.main,
        boxShadow: `0 0 0 1px ${theme.palette.error.main}`
      }
    }
  }
}));
