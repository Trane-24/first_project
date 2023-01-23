import React from 'react';
import { Controller, useForm } from 'react-hook-form';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { sendMessasges } from 'store/helpdesk/helpdeskAsync';
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


  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      message: '',
    }
  });

  const messageWatcher = watch('message');

  const sendMessage = () => {
    dispatch(sendMessasges(messageWatcher))
      .unwrap()
      .then(() => scrollToEnd())
  };
  
  const onSubmit = handleSubmit((data: IForm) => {
    const { message } = data;
    if (!message) return;

    sendMessage();

    setValue('message', '');
  });

  return (
    <form onSubmit={onSubmit}>
        <Controller
          control={control} name="message"
          render={({ field }) => (
            <TextField
              className={classes.input}
              autoComplete='off'
              multiline
              maxRows={2}
              {...field}
              fullWidth
              placeholder="Type your message..."
              InputProps={{
                endAdornment: (
                  <IconButton className={classes.btn} onClick={onSubmit}>
                    <span>Send</span>
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
