import AppBar from '@material-ui/core/AppBar';
import AppsIcon from '@material-ui/icons/Apps';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import ComputerIcon from '@material-ui/icons/Computer';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { nodesRoute, servicesRoute, portalRoute } from '../constants/Routes';
import useStyles from './styles/DrawerStyle';
import App from '../App';

function iconArray(name: string) {
  switch (name) {
    case 'Portal':
      return <DashboardIcon style={{ fontSize: 20, color: grey[500] }} />;
    case 'Services':
      return <DeviceHubIcon style={{ fontSize: 20, color: grey[500] }} />;
    case 'Nodes':
      return <ComputerIcon style={{ fontSize: 20, color: grey[500] }} />;
    case 'Settings':
      return <SettingsIcon style={{ fontSize: 20, color: grey[500] }} />;
    default:
      return <AppsIcon style={{ fontSize: 20, color: grey[500] }} />;
  }
}

function routeArray(name: string) {
  switch (name) {
    case 'Portal':
      return portalRoute;
    case 'Services':
      return servicesRoute;
    case 'Nodes':
      return nodesRoute;
    default:
      return servicesRoute;
  }
}

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Consul Catalog UI
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Portal', 'Services', 'Nodes'].map((text, index) => (
            <ListItem
              component={Link}
              to={routeArray(text)}
              replace
              button
              key={text}
              className={classes.styledLink}
            >
              <ListItemIcon>{iconArray(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <App />
    </div>
  );
}
