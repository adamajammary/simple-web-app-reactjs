import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './App';
import { ApiRoute } from './const/api-route';
import { AppConfig } from './const/app-config';
import { initTasks } from './state/tasksReducer';
import store from './state/store';

import './index.scss';

fetch(`${ApiRoute.Server}${ApiRoute.Tasks}`,).then(response => {
  response.json().then(result => {
    store.dispatch(initTasks(result));
  }).catch(e => {
    if (!AppConfig.Env.IsProd) { console.error(e); }
  });
}).catch(e => {
  if (!AppConfig.Env.IsProd) { console.error(e); }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
