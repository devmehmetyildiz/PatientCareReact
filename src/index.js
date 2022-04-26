import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { Provider } from 'react-redux'
import store from  './app/Redux/store'

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter basename="/app">
    <App />
  </BrowserRouter> 
  </Provider> , 
  document.getElementById('root'));

