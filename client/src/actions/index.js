import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({username,password}){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signin`,{username,password})
        .then(response=>{
          dispatch({type: AUTH_USER});
          localStorage.setItem('token',response.data.token);
          browserHistory.push('/feature');
        })
        .catch(()=>{
          dispatch(authError('Bad Login Info'));
        });
    }
}

export function signupUser({username,email,password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`,{username,email,password})
    .then(response=>{
      dispatch({type: AUTH_USER});
      localStorage.setItem('token',response.data.token);
      browserHistory.push('/feature');
    })
    .catch(error =>dispatch(authError(error.response.data.error)));
  }
}

export function authError(error){
  return{
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {type: UNAUTH_USER}
}

export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL,{
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response=> {
      dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
      });
    });
  }
}
