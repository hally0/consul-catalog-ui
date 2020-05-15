import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import useStyles from './components/styles/DrawerStyle';
import Nodes from './components/Node/Nodes';
import Services from './components/Service/Services';
import Portal from './components/Portal';
import NodePage from './components/Node/NodePage';
import {
  servicesRoute,
  nodesRoute,
  nodeRoute,
  portalRoute,
} from './constants/Routes';
import './App.css';

export const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Router>
        <Switch>
          <Route exact path="/" component={Portal} />
          <Route path={portalRoute} component={Portal} />
          <Route path={servicesRoute} component={Services} />
          <Route path={nodesRoute} component={Nodes} />
          <Route path={nodeRoute} component={NodePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
