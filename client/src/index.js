import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route , IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/body/home';
import Feature from './components/body/feature';
import About from './components/body/about';
import FAQ from './components/body/faq'
import Signin from './components/body/auth/signin';
import Signout from './components/body/auth/signout';
import Signup from './components/body/auth/signup';

import RequireAuth from './components/body/auth/require_auth'
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
        {/*<Route path="/feature" component={RequireAuth(Feature)} />*/}
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.app'));
