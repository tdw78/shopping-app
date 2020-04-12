import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from './types';


export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
     }))
    .catch(err => {
      console.log(err)
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
     });
   });
};

export const signUp = ({ name, email, password, passwordConfirmation }) => dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password, passwordConfirmation });
  axios
    .post('/api/users/signup', body, config)
    .then((res) => dispatch ({
      type: SIGNUP_SUCCESS,
      payload: res.data
     })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'SIGNUP_FAIL')
      );
      dispatch({
        type: SIGNUP_FAIL
     });
  });
};


export const signIn = ({ email, password }) =>  dispatch => {
  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  axios
    .post('/api/users/signin', body, config)
    .then(res =>
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log("SIGNIN ERROR", err.response.data)
      dispatch(
        returnErrors(err.response.data, err.response.status, 'SIGNIN_FAIL')
      );
      dispatch({
        type: SIGNIN_FAIL
     });
   });
};

export const signOut = () => {
  return {
    type: SIGNOUT_SUCCESS
  };
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  if (token) {
    config.headers['auth-token'] = token;
  }

  return config;
};
