import { FC, useMemo, useEffect, Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { appActions } from '../store/app/appSlice';
// Selectors
import { selectIsAuthorization } from '../store/auth/authSelectors';
import { selectDrawerOpen } from '../store/app/appSelectors';
// Mui
import {
  Theme, Backdrop, Box, IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
// Icons
import {
  SvgIconComponent,
  PeopleOutlined as PeopleOutlinedIcon,
  HomeWorkOutlined as HomeWorkOutlinedIcon,
  HolidayVillageOutlined as HolidayVillageOutlinedIcon,
  Close as CloseIcon,
  TravelExplore as TravelExploreIcon,
} from '@mui/icons-material';


interface INav {
  to: string;
  label: string;
  icon: SvgIconComponent;
}

const Drawer:FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const drawerOpen = useSelector(selectDrawerOpen);
  const isAuthorization:boolean | null = useSelector(selectIsAuthorization);

  const navs:{ [key:string]:INav[] } = useMemo(() => {
    return {
      'admin': [
        { to: `/admin/agents`, label: 'Agents', icon: PeopleOutlinedIcon },
      ],
      'owner': [
        { to: `/admin/owners`, label: 'Owners', icon: PeopleOutlinedIcon },
        { to: `/admin/hotels`, label: 'Hotels', icon: HomeWorkOutlinedIcon },
        { to: `/admin/types-hotels`, label: 'Hotels Types', icon: TravelExploreIcon },
      ],
      'guest': [
        { to: `/admin/guests`, label: 'Guests', icon: PeopleOutlinedIcon },
        { to: `/admin/reservations`, label: 'Reservations',  icon: HolidayVillageOutlinedIcon },
      ]
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if ( isAuthorization && window.matchMedia('(min-width: 1440px)').matches && !drawerOpen ){
      handleToggleDrawer();
    }
    // eslint-disable-next-line
  }, [isAuthorization]);

  const handleToggleDrawer = () => dispatch(appActions.toggleDrawer());

  return (
    <Fragment>
      <Backdrop
        open={drawerOpen}
        onClick={handleToggleDrawer}
        sx={{
          display: { sm: 'none' },
          zIndex: (theme:Theme) => theme.zIndex.drawer - 1
        }}
      />
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          position: { xs: 'fixed', sm: 'relative' },
          top: 0, left: 0,
          width: {
            xs: '256px',
            sm: drawerOpen ? '256px' : '72px'
          },
          minHeight: 'calc(100vh - 64px)',
          bgcolor: 'white',
          borderRight: '1px solid rgba(0,0,0,0.12)',
          transform: {
            xs: drawerOpen ? 'initial' : 'translateX(-100%)',
            sm: 'translateX(0)'
          },
          '@media print': {
            display: 'none',
          },
          zIndex: (theme:Theme) => theme.zIndex.drawer
        }}
      >
        <Box
          sx={{
            display: {
              sm: 'none'
            },
            p: 2,
            textAlign: 'right'
          }}
        >
          <IconButton
            color="primary"
            onClick={handleToggleDrawer}
          ><CloseIcon /></IconButton>
        </Box>
        <List
          sx={{
            flexGrow: 1,
            overflowY: 'auto'
          }}
        >
          {Object.keys(navs).map((key:string) => (
            <Box key={`nav-item-${key}`}>
              <ListItemText
                sx={{
                  display: {
                    sm: drawerOpen ? 'block' : 'none'
                  },
                  color: 'rgba(0,0,0,0.6)',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '-0.4px',
                  padding: '7px 16px',
                  textTransform: 'capitalize'
                }}
                primary={key}
              />
              <List
                sx={{
                  borderBottom: '1px solid rgba(0,0,0,0.12)',
                  pt: 0,
                  pb: 0
                }}
              >
                {navs[key].map((nav:INav, index:number) => {
                  const Icon = nav.icon;
                  const selected = pathname.startsWith(nav.to);
                  return (
                    <ListItem key={`nav-item-${key}-${index}`} disablePadding>
                      <ListItemButton
                        component={NavLink}
                        to={nav.to}
                        selected={selected}
                        sx={(theme) => ({
                          justifyContent: {
                            sm: drawerOpen ? 'flex-start' : 'center'
                          },
                          color: selected ? theme.palette.primary.main : 'rgba(0,0,0,0.87)',
                          lineHeight: '24px',
                          letterSpacing: '-0.35px',
                          pt: { sm: drawerOpen ? '8px' : '12px' },
                          pb: { sm: drawerOpen ? '8px' : '12px' }
                        })}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: { xs: '48px', sm: drawerOpen ? '48px' : '24px' }
                          }}
                        >
                          <Icon color={selected ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            display: { sm: drawerOpen ? 'block' : 'none' }
                          }}
                          primary={nav.label}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </Box>
          ))}
        </List>
      </Box>
    </Fragment>
  );
};

export default Drawer;
