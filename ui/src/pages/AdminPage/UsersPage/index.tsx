import { Button, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../../../functions';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import useDialog from '../../../hooks/useDialog';
import IUser from '../../../models/User';
import { fetchUsers } from '../../../store/users/usersAsync';
import { selectUsers } from '../../../store/users/usersSelectors';
import UserForm from './UserForm';
import UserItem from './UserItem';

interface Props {
  role: string;
}

const UserPage: React.FC<Props> = ({ role }) => {
  //dispatch
  const dispatch = useAppDispatch();

  // state
  const [isLoading, setIsLoading] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState<IUser[]>([]);

  const users = useSelector(selectUsers);

  const getVisibleUsers = () => {
    const newData = users.filter((user: IUser) => user.role === role);

    setVisibleUsers(newData);
  };

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchUsers({}))
      .unwrap()
      .then(() => getVisibleUsers())
      .finally(() => setIsLoading(false));
  }, []);

  const {Dialog, openDialog, closeDialog} = useDialog();

  if (isLoading) return <LinearProgress />;
  if (!users) return null;

  return (
    <React.Fragment>
      <Dialog>
        <UserForm user={null} onClose={closeDialog} />
      </Dialog>

      <Box sx={{
        height: 'calc(100vh - 78px)',
        display: 'flex',
        width: '100%'
      }}>
        <Box sx={{ padding: '40px 80px', width: '100%'}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5'>
              {`${capitalizeFirstLetter(role)} List`}
            </Typography>
            <Button variant='contained' onClick={openDialog}>{`create ${role}`}</Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px', pt: 5}}>
            {visibleUsers.map((user: IUser) => {
              return (
                <UserItem key={user.id} user={user} />
              )
            })}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default UserPage;