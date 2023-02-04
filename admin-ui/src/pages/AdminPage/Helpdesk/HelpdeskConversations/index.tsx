import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Models
import IConversation from 'models/Conversation';
// Async
import { fetchConversations } from 'store/helpdesk/helpdeskAsync';
// MUI
import { Avatar, debounce } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// Selectors
import { selectConversations, selectCurrentConversation } from 'store/helpdesk/helpdeskSelectors';
// utilites
import dayjs from 'dayjs';

const HelpdeskConversations: React.FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyle();

  const [inputValue, setInputValue] = useState<string>('');

  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; 
    setInputValue(value);
    debouncedChangeHandler(value)
  }

  // eslint-disable-next-line
  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      dispatch(fetchConversations({ data: {
        search: value,
      }}))
    }, 1000)
  , []);

  const conversations = useSelector(selectConversations);
  const currentConversation = useSelector(selectCurrentConversation);

  const changeConverstation = (conversation: IConversation) => {
    dispatch(helpdeskActions.chnageConversation(conversation));
  };

  return (
    <div className={classes.conversations}>

      <label className={classes.search}>
        <SearchOutlinedIcon />
        <input
          type="search"
          className={classes.input}
          value={inputValue}
          onChange={changeInputValue}
          placeholder="Search..."
        />
      </label>
      
      <div className={classes.list}>
        {conversations?.map(conversation => {
          const { firstName, lastName } = conversation.client;

          return (
            <div key={conversation._id} className={
              [classes.item, conversation._id === currentConversation?._id ? classes.act : ''].join(' ')
            } onClick={() => {
              changeConverstation(conversation);
            }}>
              <Avatar sx={{ backgroundColor: '#49AAD1'}}>
                {`${firstName.slice(0, 1)}`}
                {`${lastName.slice(0, 1)}`}
              </Avatar>

              <div className={classes.itemContent}>
                <span className={classes.name}>
                  {`${firstName} ${lastName}`}
                </span>
                <span className={classes.lastMessage}>
                  {conversation.message}
                </span>
                
              </div>
              <span className={classes.time}>
                {dayjs(conversation.updatedAt).format('h:mm A')}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default HelpdeskConversations;

const useStyle = makeStyles({
  conversations: {
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 2,
    borderRight: '1px solid #ddd',
    '@media (min-width: 900px)': {
      maxWidth: '400px',
    }
  },
  search: {
    paddingLeft: '22px',
    paddingRight: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderBottom: '1px solid #ddd',
  },
  input: {
    width: '100%',
    border: 'none',
    outline: 'none',
    height: '60px',
    fontSize: '18px'
  },
  list: {
    width: '100%',
  },
  item: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
  },
  act: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
    borderRight: '1px solid #ddd',
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  name: {
    fontSize: '18px',
  },
  lastMessage: {
    maxWidth: '70%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: 'grey',
  },
  time: {
    position: 'absolute',
    right: '10px',
    fontSize: '12px',
    color: 'grey',
  },
})

