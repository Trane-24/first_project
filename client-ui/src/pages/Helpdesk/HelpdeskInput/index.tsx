import React from 'react';
import { Controller, useForm } from 'react-hook-form';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Actions
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';
// MUI
import { IconButton, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
// Styles
import classes from './styles.module.scss';

interface Props {
  scrollToEnd: () => void;
}

interface IForm {
  message: string;
}

const HelpdeskInput: React.FC<Props> = ({ scrollToEnd }) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      message: '',
    }
  });
  
  const onSubmit = handleSubmit((data: IForm) => {
    const message = data.message.trim();
    if (!message) return;
    
    const nextData: IForm = {
      ...data,
      message,
    }

    dispatch(helpdeskActions.sendMessage(nextData));

    reset();
    scrollToEnd();
  });

  return (
    <form noValidate>
      <Controller
        control={control} name="message"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            className={classes.input}
            autoComplete='off'
            multiline
            rows={2}
            {...field}
            fullWidth
            placeholder="Type your message..."
            InputProps={{
              endAdornment: (
                <IconButton className={classes.btn} onClick={onSubmit}>
                  <SendOutlinedIcon />
                </IconButton>
              )
            }}
          />
        )}
      />
    </form>
  )
}

export default HelpdeskInput;
