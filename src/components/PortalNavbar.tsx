import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ComputerIcon from '@material-ui/icons/Computer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles/NavStyle';
import { servicePortalRoute, nodePortalRoute } from '../constants/Routes';
import '../App.css';

export default function PortalNavbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.background}
    >
      <BottomNavigationAction
        component={Link}
        to={servicePortalRoute}
        label="Services"
        className={classes.styledLink}
        icon={<DeviceHubIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={nodePortalRoute}
        label="Nodes"
        className={classes.styledLink}
        icon={<ComputerIcon />}
      />
    </BottomNavigation>
  );
}
