import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Store
import { fetchConversations, fetchMessages } from 'store/helpdesk/helpdeskAsync';
import { selectCurrentConversation, selectMessages } from 'store/helpdesk/helpdeskSelectors';
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';
// Components
import HelpdeskInput from './HelpdeskInput';
import HelpdeskList from './HelpdeskList';
import NotSelectChat from 'components/NotSelectChat';
import HelpdeskConversations from './HelpdeskConversations';
// MUI
import { Avatar, IconButton, LinearProgress, Typography } from '@mui/material';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
// Styles
import { makeStyles } from '@mui/styles';


const HelpdeskPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const currentConversation = useSelector(selectCurrentConversation);
  const messages = useSelector(selectMessages);

  const ref = useRef<HTMLDivElement | null>(null);

  const scrollToEnd = useCallback(() => {
    ref.current?.scrollIntoView({
      behavior: 'auto',
    });
  }, [ref]);

  const deleteCurrentConversation = () => {
    dispatch(helpdeskActions.setInitialField('currentConversation'));
  };

  useEffect(() => {
    dispatch(fetchConversations({}))

    return () => {
      dispatch(helpdeskActions.setInitialField('currentConversation'))
    }
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentConversation) {
      dispatch(helpdeskActions.setInitialField('messages'));
      dispatch(helpdeskActions.setInitialField('total'))

      const newParams = { data: { page: 1, limit: 20 }, userId: currentConversation.client._id };
      dispatch(fetchMessages(newParams))
    }
  // eslint-disable-next-line
  }, [currentConversation])

  return (
    <div className={classes.helpdesk}>
      <div className='container'>
        <Typography onClick={scrollToEnd} variant='h5' className={classes.title}>Helpdesk</Typography>

        <div className={classes.helpdeskContent}>
          <HelpdeskConversations />

            <div className={classes.list} style={{ zIndex: currentConversation ? '3' : '1'}}>
              {currentConversation ? (
                <React.Fragment>
                  <div className={classes.name}>
                    <IconButton onClick={deleteCurrentConversation} className={classes.btnBack}>
                      <ReplyOutlinedIcon />
                    </IconButton>
                    <Avatar sx={{ backgroundColor: '#49AAD1'}}>
                      {`${currentConversation.client.firstName.slice(0, 1)}`}
                      {`${currentConversation.client.lastName.slice(0, 1)}`}
                    </Avatar>
                    <span>
                      {`${currentConversation.client.firstName} ${currentConversation.client.lastName}`}
                    </span>
                  </div>

                  {messages ? (
                    <>
                    <ul className={classes.listContent}>
                      <HelpdeskList scrollToEnd={scrollToEnd} />
                      <div style={{ height: '1px'}} ref={ref}/>
                    </ul>

                    <HelpdeskInput scrollToEnd={scrollToEnd}/>
                    </>
                  ) : (
                    <LinearProgress />
                  )}
                </React.Fragment>
              ) : <NotSelectChat />}
            </div>
        </div>

      </div>
    </div>
  )
}

export default HelpdeskPage;

const useStyle = makeStyles({
  helpdesk: {

  },
  title: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
  },
  helpdeskContent: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    borderRadius: '5px',
    height: 'calc(100vh - 166px)',
    marginTop: '20px',

    backgroundColor: '#fff',
    boxShadow: '0px 0px 0px 1px #E0E0E0',
    overflow: 'hidden',
  },
  list: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    '@media (min-width: 900px)': {
      position: 'relative',
    },
  },
  name: {
    height: '61px',
    paddingLeft: '28px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    borderBottom: '1px solid #ddd',
    fontSize: '18px',
  },
  btnBack: {
    display: 'block',
    '@media (min-width: 900px)': {
      display: 'none',
    },
  },
  listContent: {
    width: '100%',
    height: 'calc(100vh - (306px))',
    padding: '10px 14px',
    overflowY: 'scroll',
    backgroundColor: '#f5f6f7',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }
})
