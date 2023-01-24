import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
//Selectors
import { selectCurrentConversation, selectMessages, selectParams, selectTotal } from 'store/helpdesk/helpdeskSelectors';
// Async
import { fetchMessages } from 'store/helpdesk/helpdeskAsync';
// Components
import HelpdeskMessage from '../HelpdeskMessage';
// MUI
import { Chip, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
// Utilites
import dayjs from 'dayjs';

interface Props {
  scrollToEnd: () => void;
}

const HelpdeskList: React.FC<Props> = ({ scrollToEnd }) => {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const messages = useSelector(selectMessages);
  const params = useSelector(selectParams);
  const total = useSelector(selectTotal);
  const currentConversation = useSelector(selectCurrentConversation);

  const [first, setFirst] = useState(false);

  let date = messages?.length ? messages[0].createdAt : null;
  // Intersection Observer
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  //
  const changeFirstRender = (value:boolean): void => {
    setTimeout(() => {
      setFirst(value);
    }, 100)
  }

  const reFetch = () => {
    if (total === messages?.length) return;
    console.log('reFetch')

    dispatch(fetchMessages({
      data: {
        ...params,
        page: params.page + 1,
      },
      userId: currentConversation.client._id,
    }))
  }

  useEffect(() => {
    if(isVisible && first) {
      reFetch()
    }
    changeFirstRender(true)
  // eslint-disable-next-line
  }, [isVisible]);

  useEffect(() => {
    console.log('scroll')
    scrollToEnd();

  // eslint-disable-next-line
  }, [currentConversation]);

  useEffect(() => {
    return () => {
      dispatch(helpdeskActions.setInitialField('messages'))
      dispatch(helpdeskActions.setInitialField('params'))
      dispatch(helpdeskActions.setInitialField('total'))
    }
  }, [])

  return (
    <React.Fragment>
      <Divider sx={{ mb: 2}}>
        <Chip label={dayjs(date).format('MMMM DD')} className={classes.chip} />
      </Divider>
  
      {messages?.map((message, ind) => {
        const isSameDay = dayjs(message.createdAt).isSame(date, 'day');

        if (isSameDay) {
          return <HelpdeskMessage message={message} referenc={ind === 5 ? ref : null} key={message._id}/>
        } else {
          date = message.createdAt;
          return (
            <React.Fragment key={message._id}>
              <Divider sx={{ mb: 2}}>
                <Chip label={dayjs(date).format('MMMM DD')} className={classes.chip} />
              </Divider>
              <HelpdeskMessage message={message} referenc={ind === 5 ? ref : null}/>
            </React.Fragment>
          )
        }
      })}
    </React.Fragment>
  )
}

export default HelpdeskList;

const useStyle = makeStyles({
  chip: {
    transform: 'translateY(50%)',
  }
})
