import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import useStyles from './components/styles/DrawerStyle';
import Services from './components/Services';
import servicePortal from './components/servicePortal';
import Nodes from './components/Nodes';
import {
  servicesRoute,
  servicePortalRoute,
  nodePortalRoute,
  nodesRoute,
} from './constants/Routes';
import './App.css';
import NodePortal from './components/nodePortal';

export const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Router>
        <Switch>
          <Route exact path="/" component={servicePortal} />
          <Route path={servicePortalRoute} component={servicePortal} />
          <Route path={nodePortalRoute} component={NodePortal} />
          <Route path={servicesRoute} component={Services} />
          <Route path={nodesRoute} component={Nodes} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
