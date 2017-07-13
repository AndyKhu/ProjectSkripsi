import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route , IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/Blogin/body/home';
import Feature from './components/Blogin/body/feature';
import About from './components/Blogin/body/about';
import FAQ from './components/Blogin/body/faq'
import Signin from './components/Blogin/body/auth/signin';
import Signout from './components/Blogin/body/auth/signout';
import Signup from './components/Blogin/body/auth/signup';
import RequireAuth from './components/Blogin/body/auth/require_auth'


import Content from './components/content';

import reducers from './reducers';
import {AUTH_USER} from  './actions/types';
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if(token){
  store.dispatch({
    type:AUTH_USER
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/feature" component={Feature}/>
        <Route path="/about" component={About}/>
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/faq" component={FAQ}/>
      </Route>
      <Route path="/content" component={RequireAuth(Content)} />
    </Router>
  </Provider>
  , document.querySelector('.app'));
