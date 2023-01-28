import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
//Selectors
import { selectMessages, selectParams, selectTotal } from 'store/helpdesk/helpdeskSelectors';
// Async
import { fetchMessages } from 'store/helpdesk/helpdeskAsync';
// Components
import HelpdeskMessage from '../HelpdeskMessage';
// Styles
import classes from './styles.module.scss';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import { Chip, Divider } from '@mui/material';
// Utilites
import dayjs from 'dayjs';
import { formatMessageDate } from 'utilites/dateFormatter';

interface Props {
  scrollToEnd: () => void;
  refScrollDown: any;
  isVisibleRefScrollDown: any;
}

const HelpdeskList: React.FC<Props> = ({ scrollToEnd, refScrollDown, isVisibleRefScrollDown }) => {
  const dispatch = useAppDispatch();
  const messages = useSelector(selectMessages);
  const params = useSelector(selectParams);
  const total = useSelector(selectTotal);

  const [first, setFirst] = useState(false);

  let date = messages?.length ? messages[0].createdAt : null;
  // Intersection Observer for refetch
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  //
  const changeFirstRender = (value:boolean): void => {
    setTimeout(() => {
      setFirst(value);
    }, 500)
  }

  const reFetch = () => {
    if (total === messages?.length) return;

    dispatch(fetchMessages({
      ...params,
      page: params.page + 1,
    }))
  }

  useEffect(() => {
    if(isVisible && first) {
      reFetch();
    }
    changeFirstRender(true)
  // eslint-disable-next-line
  }, [isVisible]);

  useEffect(() => {
    if (isVisibleRefScrollDown) {
      scrollToEnd();
    }
  // eslint-disable-next-line
  }, [messages])

  return (
    <React.Fragment>
      {date ? (
        <Divider sx={{ mb: 2}}>
          <Chip label={formatMessageDate(date)} className={classes.chip} />
        </Divider>
      ) : null}

      {messages?.map((message, ind) => {
          const isSameDay = dayjs(message.createdAt).isSame(date, 'day');
          if (isSameDay) {
            return (
              <HelpdeskMessage
                message={message}
                referenc={ind === 5 ? ref : null}
                referenc2={ind === messages.length - 5 ? refScrollDown : null}
                key={message._id}
              />
            )
          } else {
            date = message.createdAt;
            return (
              <React.Fragment key={message._id}>
                <Divider sx={{ mb: 2}}>
                  <Chip label={formatMessageDate(date)} className={classes.chip} />
                </Divider>
                <HelpdeskMessage
                  message={message}
                  referenc={ind === 5 ? ref : null}
                  referenc2={ind === messages.length - 5 ? refScrollDown : null}
                />
              </React.Fragment>
            )
          }
      })}
    </React.Fragment>
  )
}

export default HelpdeskList;
