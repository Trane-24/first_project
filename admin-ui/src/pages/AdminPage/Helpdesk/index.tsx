import { Box, LinearProgress, TextField } from '@mui/material';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import HelpdeskAsync from 'store/helpdesk/helpdeskAsync';
import { selectConversations, selectMessages } from 'store/helpdesk/helpdeskSelectors';
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';
import { selectCurrentUser } from 'store/users/usersSelectors';

const HelpdeskPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const { clientId } = useParams();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const messages = useSelector(selectMessages);
  const conversations = useSelector(selectConversations);

  const [message, setMessage] = useState<string>('');

  const onChange = (e:any) => setMessage(e.target.value);

  const sendMessage = (e: any) => {
    if (e.key !== 'Enter' || !message.trim()) return;
    dispatch(helpdeskActions.sendMessage({ fromUser: currentUser, clientId, message }));
    setMessage('');
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(HelpdeskAsync.fetchConversations({}))
      .unwrap()
      .finally(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    if (!clientId) return;
    setIsLoadingMessages(true);
    dispatch(HelpdeskAsync.fetchMessages({ clientId }))
      .unwrap()
      .finally(() => setIsLoadingMessages(false))
  }, [clientId]);

  if (isLoading) return <LinearProgress />;

  return (
    <Box sx={{ display: 'flex', gap: 5 }}>
      <Box sx={{ flexGrow: 1, border: '1px solid #eee', height: '600px' }}>
        {conversations?.map(conversation => (
          <NavLink style={{ display: 'block', padding: '5px 0' }} key={conversation._id} to={`/${currentUser?.role}/helpdesk/${conversation.client._id}`}>
            {`${conversation.client.firstName} ${conversation.client.lastName}`}
          </NavLink>
        ))}
      </Box>
      <Box sx={{ flexGrow: 3, border: '1px solid #eee', height: '600px' }}>
          {isLoadingMessages ? <LinearProgress /> : messages && clientId ? (
            <React.Fragment>
              <Box sx={{ height: '540px', overflowY: 'scroll', display: 'flex', flexDirection: 'column', gap: 1 }}>
                {messages.map(message => (
                  <Box sx={{
                      width: 'max-content', minWidth: '100px', maxWidth: '40%', borderRadius: '4px', p: 1, m: 1,
                      backgroundColor: message.fromUser._id === clientId ? '#48A8D0' : '#53B8E0', color: '#fff',
                      alignSelf: message.fromUser._id === clientId ? 'flex-start' : 'flex-end'
                    }}>
                    <p>{message.message}</p>
                  </Box>
                ))}
              </Box>
              <TextField
                sx={{ height: '60px' }}
                fullWidth
                value={message}
                onChange={onChange}
                onKeyDown={sendMessage}
                placeholder="Type message..."
              />
            </React.Fragment>
          ) : null}
      </Box>
    </Box>
  );
}

export default HelpdeskPage;
