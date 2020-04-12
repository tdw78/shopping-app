import { USER_LOADED, USER_LOADING, AUTH_ERROR, SIGNIN_SUCCESS,
  SIGNIN_FAIL, SIGNOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_FAIL
  } from "../actions/types";
import cookie from 'js-cookie';

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
  };
  
  export default function(state = initialState, action) {
     switch(action.type){
       case USER_LOADING:
         return {
           ...state,
           isLoading: true
         };
       case USER_LOADED:
         return {
           ...state,
           isAuthenticated: true,
           isLoading: false,
           user: action.payload,
           userId: action.payload._id
          };
       case SIGNIN_SUCCESS:
       case SIGNUP_SUCCESS:
         cookie.set('token', action.payload.token);
         localStorage.setItem('user', JSON.stringify(action.payload.user));
         localStorage.setItem('token', action.payload.token);

          return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload
           };
       case AUTH_ERROR:
       case SIGNIN_FAIL:
       case SIGNOUT_SUCCESS:
       case SIGNUP_FAIL:
         localStorage.removeItem('user');
         localStorage.removeItem('token');
         cookie.remove('token');
           return {
             ...state,
             token: null,
             user: null,
             isAuthenticated: false,
             isLoading:false
            }
         default:
           return state
    }
  }