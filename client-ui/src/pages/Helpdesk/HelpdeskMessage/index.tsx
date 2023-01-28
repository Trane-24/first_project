import React from 'react';
import { useSelector } from 'react-redux';
// MUI
import { Avatar } from '@mui/material';
// Models
import IMessage from 'models/Message';
// Slectors
import { selectCurrentUser } from 'store/users/usersSelectors';
// Styles
import classes from './styles.module.scss';
// Utilites
import dayjs from 'dayjs';
import classNames from 'classnames';
import { IntersectionObserverHookRefCallback } from 'react-intersection-observer-hook';

interface Props {
  message: IMessage;
  referenc: IntersectionObserverHookRefCallback | null;
  referenc2: IntersectionObserverHookRefCallback | null;
}

const HelpdeskMessage: React.FC<Props> = ({ message, referenc, referenc2 }) => {
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = message.fromUser._id !== currentUser?._id;

  return (
    <li className={classNames(classes.message, {[classes.admin]: isAdmin})} ref={referenc || referenc2}>
      {isAdmin && (
        <Avatar sx={{ backgroundColor: '#49AAD1'}}>{`${message.fromUser.firstName.slice(0, 1)}${message.fromUser.lastName.slice(0, 1)}`}</Avatar>
      )}
      <div className={classNames(classes.messageContent, {[classes.adminContent]: isAdmin})}>
        <span className={classes.text}>
          {message.message}
        </span>
        <span className={classNames(classes.time, {[classes.adminTime]: isAdmin})}>
          {dayjs(message.createdAt).format('h:mm A')}
        </span>
      </div>

    </li>
  )
}

export default HelpdeskMessage;
