import React, { useEffect, useState } from 'react';
import { Box, TextField, LinearProgress } from '@mui/material';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { selectMessages } from 'store/helpdesk/helpdeskSelectors';
import HelpdeskAsync from 'store/helpdesk/helpdeskAsync';
import { selectCurrentUser } from 'store/users/usersSelectors';
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';

const HelpdeskPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>('');

  const messages = useSelector(selectMessages);
  const currentUser = useSelector(selectCurrentUser);

  const onChange = (e:any) => setMessage(e.target.value);

  const sendMessage = (e: any) => {
    if (e.key !== 'Enter' || !message.trim()) return;
    dispatch(helpdeskActions.sendMessage({ fromUser: currentUser, message }));
    setMessage('');
  }

  useEffect(() => {
    dispatch(HelpdeskAsync.fetchMessages({}));
  }, [])

  if (!messages) return <LinearProgress />;

  return (
    <Box sx={{ width: '700px', height: '500px', margin: '50px auto 0' }}>
      <Box sx={{ height: '465px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {messages.map((message) => (
          <p style={{ alignSelf: message.fromUser._id === currentUser?._id ? 'flex-end' : 'flex-start' }}>{message.message}</p>
        ))}
      </Box>
      <TextField
        fullWidth
        sx={{ height: '35px' }}
        value={message}
        onChange={onChange}
        onKeyDown={sendMessage}
        placeholder="Type message.."
      />
    </Box>
  );
}

export default HelpdeskPage;
