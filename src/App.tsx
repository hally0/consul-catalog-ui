import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import useStyles from './components/styles/DrawerStyle';
import Services from './components/Services';
import Portal from './components/Portal';
import Nodes from './components/Nodes';
import './App.css';

export const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Router>
        <Switch>
          <Route exact path="/" component={Portal} />
          <Route path="/Portal" component={Portal} />
          <Route path="/Services" component={Services} />
          <Route path="/Nodes" component={Nodes} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
