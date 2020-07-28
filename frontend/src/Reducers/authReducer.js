import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
  } from '../Actions/types';
  
  const initialState = {
    isAuthenticated: null,
    isLoading: false,
    id: null,
    username: null,
    lname: null,
    email: null,
    erole: null,
    accessToken: null,
    tokenType: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: state.accessToken === null,
          isLoading: false,
          id: localStorage.getItem('id'),
          username: localStorage.getItem('username'),
          lname: localStorage.getItem('lname'),
          email: localStorage.getItem('email'),
          erole: localStorage.getItem('erole'),
          accessToken: localStorage.getItem('accessToken'),
          tokenType: localStorage.getItem('tokenType'),
        };
      case LOGIN_SUCCESS:
        localStorage.setItem('id', action.payload.id);
        localStorage.setItem('username', action.payload.username);
        localStorage.setItem('lname', action.payload.lname);
        localStorage.setItem('email', action.payload.email);
        localStorage.setItem('erole', action.payload.erole);
        localStorage.setItem('acessToken', action.payload.acessToken);
        localStorage.setItem('tokenType', action.payload.tokenType);
        console.log(action.payload);
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          id: action.payload.id,
          username: action.payload.username,
          lname: action.payload.lname,
          email: action.payload.email,
          erole: action.payload.erole,
          acessToken: action.payload.acessToken,
          tokenType: action.payload.tokenType,
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
          localStorage.removeItem('id');
          localStorage.removeItem('username');
          localStorage.removeItem('lname');
          localStorage.removeItem('email');
          localStorage.removeItem('erole');
          localStorage.removeItem('acessToken');
          localStorage.removeItem('tokenType');
          return {
            id: null,
            username: null,
            lname: null,
            email: null,
            isAuthenticated: false,
            isLoading: false,
            erole: null,
            acessToken: null,
            tokenType: null,
          }
      default:
        return state;
    }
  }
  