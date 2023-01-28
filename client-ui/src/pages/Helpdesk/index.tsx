import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Store
import { selectMessages } from 'store/helpdesk/helpdeskSelectors';
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';
// Components
import Title from 'components/Title';
import HelpdeskInput from './HelpdeskInput';
import HelpdeskList from './HelpdeskList';
// MUI
import { IconButton, LinearProgress } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
// Styles
import classes from './styles.module.scss';
import { useIntersectionObserver } from 'react-intersection-observer-hook';

const HelpdeskPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const messages = useSelector(selectMessages);

  const ref = useRef<HTMLDivElement | null>(null);

  // Intersection Observer for scrollDown
  const [ refScrollDown, { entry: entry2 }] = useIntersectionObserver();
  const isVisibleRefScrollDown = entry2 && entry2.isIntersecting;

  const scrollToEnd = useCallback(() => {
    ref.current?.scrollIntoView({
      behavior: 'auto',
    });
  }, [ref]);

  useEffect(() => {

    return () => {
      dispatch(helpdeskActions.setInitialField('params'))
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
              <HelpdeskList scrollToEnd={scrollToEnd} refScrollDown={refScrollDown} isVisibleRefScrollDown={isVisibleRefScrollDown}/>
              <div style={{ height: '1px'}} ref={ref}/>
            </ul>
            <HelpdeskInput scrollToEnd={scrollToEnd} />

            {!isVisibleRefScrollDown && (
              <IconButton className={classes.btnScrollDown} onClick={scrollToEnd}>
                <ArrowCircleDownIcon />
              </IconButton>
            )}
          </div>
        ) : (
          <LinearProgress />
        )}
      </div>
    </div>
  )
}

export default HelpdeskPage;
