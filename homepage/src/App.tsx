import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import useStyles from './components/styles/DrawerStyle';
import './App.css';

export const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Router>
        <Switch>
          <Route exact path="/" />
          <Route path="/Portal" />
          <Route path="/Services" />
          <Route path="/Nodes" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
