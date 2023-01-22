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
}

export default HelpdeskPage;
