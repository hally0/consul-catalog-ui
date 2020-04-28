import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import useStyles from './components/styles/DrawerStyle';
import Services from './components/Services';
import './App.css';

export const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Router>
        <Switch>
          <Route exact path="/" component={Services} />
          <Route path="/Portal" component={Services} />
          <Route path="/Services" component={Services} />
          <Route path="/Nodes" component={Services} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
