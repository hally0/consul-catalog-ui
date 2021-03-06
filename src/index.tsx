import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Drawer from './components/Drawer';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Drawer />
    </HashRouter>
    ,
  </React.StrictMode>,
  document.getElementById('root')
);
