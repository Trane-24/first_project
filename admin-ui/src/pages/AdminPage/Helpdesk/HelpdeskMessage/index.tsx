import React from 'react';
import { useSelector } from 'react-redux';
// MUI
import { Avatar } from '@mui/material';
// Models
import IMessage from 'models/Message';
// Slectors
import { selectCurrentUser } from 'store/users/usersSelectors';
// Styles
import { makeStyles } from '@mui/styles';
// Utilites
import dayjs from 'dayjs';
import classNames from 'classnames';

interface Props {
  message: IMessage;
  referenc: any;
}

const HelpdeskMessage: React.FC<Props> = ({ message, referenc }) => {
  const classes = useStyle();
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = message.fromUser._id !== currentUser?._id;

  return (
    <li className={classNames(classes.message, {[classes.admin]: isAdmin})} ref={referenc}>
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

const useStyle = makeStyles({
  message: {
    display: "flex",
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'flex-end',
    maxWidth: '90%',
    '@media (min-width: 600px)': {
      maxWidth: '70%',
    },
  },
  messageContent: {
    backgroundColor: '#49AAD1',
    padding: '10px 15px',
    borderRadius: '8px 8px 0 8px',
    color: '#fff',
    wordBreak: 'break-word',
  
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  adminContent: {
    backgroundColor: '#DAE6EA',
    borderRadius: '8px 8px 8px 0',
    color: '#000',
  },
  text: {
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    alignSelf: 'flex-end',
  },
  time: {
    alignSelf: 'flex-end',
    color: "#98CBE2",
    fontSize: '14px',
  },
  adminTime: {
    color: '#8C9597',
    alignSelf: 'flex-start',
  },
  admin: {
    alignSelf: 'flex-start',
  },
})
