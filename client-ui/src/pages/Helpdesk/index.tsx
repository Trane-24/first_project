<<<<<<< HEAD
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
=======
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Store
import { fetchMessages } from 'store/helpdesk/helpdeskAsync';
import { selectMessages, selectParams } from 'store/helpdesk/helpdeskSelectors';
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';
// Components
import Title from 'components/Title';
import HelpdeskInput from './HelpdeskInput';
import HelpdeskList from './HelpdeskList';
// MUI
import { LinearProgress } from '@mui/material';
// Styles
import classes from './styles.module.scss';


const HelpdeskPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const messages = useSelector(selectMessages);
  const params = useSelector(selectParams);

  const ref = useRef<HTMLDivElement | null>(null);

  const scrollToEnd = useCallback(() => {
    ref.current?.scrollIntoView({
      behavior: 'auto',
    });
  }, [ref]);

  useEffect(() => {
    dispatch(fetchMessages(params))

    return () => {
      dispatch(helpdeskActions.setInitialField('messages'))
      dispatch(helpdeskActions.setInitialField('params'))
      dispatch(helpdeskActions.setInitialField('total'))
    }
  // eslint-disable-next-line
  }, [])

  return (
    <div className={classes.helpdesk}>
      <div className='container'>
        <Title>Helpdesk</Title>
        {messages ? (
          <div className={classes.helpdeskContent}>
            <ul className={classes.list}>
              <HelpdeskList scrollToEnd={scrollToEnd} />
              <div style={{ height: '1px'}} ref={ref}/>
            </ul>
            <HelpdeskInput scrollToEnd={scrollToEnd}/>
          </div>
        ) : (
          <LinearProgress />
        )}
      </div>
    </div>
  )
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261
}

export default HelpdeskPage;
