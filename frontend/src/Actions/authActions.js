import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    } from "./types";
    
// Check token & load Customer: Any
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING});
}

//Login User
export const login = ({ email, password }) => dispatch => {
    
    const obj = {
        email: email,
        password: password,
    };
    
    axios.post('http://localhost:8080/auth/signin', obj)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

//Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

//Setup config/headers and token
export const tokenConfig = getState => {
    //Get token from localstorage
    const token = getState().auth.token;
    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    //If token, add to header
    if(token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};