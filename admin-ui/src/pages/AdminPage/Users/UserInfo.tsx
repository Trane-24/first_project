import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';
import IUser from 'models/User';
import CloseIcon from '@mui/icons-material/Close';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';


interface Props {
  user: IUser;
  close: () => void;
}

const UserInfo:React.FC<Props> = ({user, close}) => {
  return (
    <Box sx={{ p: 2}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5'>
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Box onClick={close} sx={{ cursor: 'pointer'}}>
          <CloseIcon />
        </Box>
      </Box>
      <Divider sx={{ pb: 1, mb: 2}}/>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
        <Box sx={{ display: 'flex', gap: 2}}>
          <EmailOutlinedIcon />
          <Typography>
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2}}>
          <LocalPhoneOutlinedIcon />
          {user.phone ? (
            <Typography>
              <Link href={`tel:${user.phone}`}>{user.phone}</Link>
            </Typography>
          ) : (
            <Typography>Not phone</Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default UserInfo;
