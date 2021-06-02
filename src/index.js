import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import {BrowserRouter} from 'react-browser-router'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
