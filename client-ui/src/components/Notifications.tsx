import { FC, useEffect } from 'react'
import { useSnackbar } from 'notistack';
// Models
import INotification from '../models/Notification';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { appActions } from '../store/app/appSlice';
// Selectors
import { selectNotifications } from '../store/app/appSelectors';
// Mui
import { Button } from '@mui/material';
// Icons
import { Close as CloseIcon } from '@mui/icons-material';

let displayed:string[] = [];

const Notifications:FC = () => {
  // Dispatch
  const dispatch = useDispatch();
  // State
  const notifications:INotification[] = useSelector(selectNotifications);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const closeNotification = (key:string) => dispatch(appActions.closeSnackbar({ key, dismissAll: Boolean(key) }));
  const removeNotification = (key:string) => dispatch(appActions.removeSnackbar(key));

  const storeDisplayed = (key:string) => {
    displayed = [...displayed, key];
  };

  const removeDisplayed = (key:string) => {
    displayed = displayed.filter((id:string) => id !== key);
  };

  useEffect(() => {
    if ( notifications ){
      notifications.forEach(({ key, message, options = {}, dismissed = false }:INotification) => {
        if ( dismissed ){
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if ( displayed.includes(key) ) return;
  
        enqueueSnackbar(message, {
          key,
          ...options,
          action: (myKey:string) => (
            <Button style={{ color: 'white' }} size="small" onClick={() => closeNotification(myKey)}><CloseIcon /></Button>
          ),
          onClose: (event, reason, myKey) => {
            if ( options.onClose ) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey:string) => {
            removeNotification(myKey);
            removeDisplayed(myKey);
          },
        });
        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      });
    }
    // eslint-disable-next-line
  }, [notifications]);

  return null;
}

export default Notifications;