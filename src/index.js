import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { Provider } from 'react-redux'
import rootReducer from './app/Redux/reducers'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter basename="/app">
    <App />
  </BrowserRouter> 
  </Provider> , 
  document.getElementById('root'));

