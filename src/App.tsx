import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import useStyles from './components/styles/DrawerStyle';
import Nodes from './components/Nodes';
import Services from './components/Services';
import NodePortal from './components/NodePortal';
import ServicePortal from './components/ServicePortal';
import NodePage from './components/NodePage';
import {
  servicesRoute,
  servicePortalRoute,
  nodePortalRoute,
  nodesRoute,
  nodeRoute,
} from './constants/Routes';
import './App.css';

export const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Router>
        <Switch>
          <Route exact path="/" component={ServicePortal} />
          <Route path={servicePortalRoute} component={ServicePortal} />
          <Route path={nodePortalRoute} component={NodePortal} />
          <Route path={servicesRoute} component={Services} />
          <Route path={nodesRoute} component={Nodes} />
          <Route path={nodeRoute} component={NodePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
