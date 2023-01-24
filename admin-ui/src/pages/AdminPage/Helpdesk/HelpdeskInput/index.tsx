import React from 'react';
import { useSelector } from 'react-redux';
// react-hook-form
import { Controller, useForm } from 'react-hook-form';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { sendMessasges } from 'store/helpdesk/helpdeskAsync';
// Selectors
import { selectCurrentConversation } from 'store/helpdesk/helpdeskSelectors';
// MUI
import { IconButton, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { makeStyles } from '@mui/styles';

interface Props {
  scrollToEnd: () => void;
}

interface IForm {
  message: string;
}

const HelpdeskInput: React.FC<Props> = ({ scrollToEnd }) => {
  const dispatch = useAppDispatch();
  const classes = useStyle();

  const currentConversation = useSelector(selectCurrentConversation);

  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      message: '',
    }
  });

  const messageWatcher = watch('message');

  const sendMessage = () => {
    const newData = {
      message: messageWatcher,
      userId: currentConversation.client._id,
    }

    dispatch(sendMessasges(newData))
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
              rows={2}
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

const useStyle = makeStyles({
  input: {
    borderRadius: '0 0 8px 8px',
    outline: 'none',
    backgroundColor: '#fff',
  },
  btn: {
    display: 'flex',
    gap: '8px',
    fontSize: '20px',
    color: '#49AAD1',
  }
});
