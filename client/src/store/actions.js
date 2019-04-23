import axios from 'axios';
import { firebase } from '../firebase.js';

export const SET_PROFILE_START = 'SET_PROFILE_START';
export const SET_PROFILE_ERR = 'SET_PROFILE_ERR';
export const SET_PROFILE_SUCCESS = 'SET_PROFILE_SUCCESS';
export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_ERR = 'UPDATE_PROFILE_ERR';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const SEARCH_ACCOUNTS_START = 'SEARCH_TUTORS_START';
export const SEARCH_ACCOUNTS_ERR = 'SEARCH_TUTORS_ERR';
export const SEARCH_ACCOUNTS_SUCCESS = 'SEARCH_TUTORS_SUCCESS';
export const GET_USER_PROFILE_START = 'GET_USER_PROFILE_START';
export const GET_USER_PROFILE_ERR = 'GET_USER_PROFILE_ERR';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_ERR = 'LOGOUT_ERR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const UPLOAD_PICTURE_START = 'UPLOAD_PICTURE_START';
export const UPLOAD_PICTURE_ERR = 'UPDATE_PROFILE_ERR';
export const UPLOAD_PICTURE_SUCCESS = 'UPLOAD_PICTURE_SUCCESS';

export const setProfile = uid => dispatch => {
  dispatch({ type: SET_PROFILE_START });
  axios
    .get(`/api/accounts/${uid}`)
    .then(response => {
      dispatch({
        type: SET_PROFILE_SUCCESS,
        payload: response.data[0],
      });
    })
    .catch(e => {
      dispatch({
        type: SET_PROFILE_ERR,
        payload: e,
      });
    });
};

export const updateProfile = (uid, body) => dispatch => {
  dispatch({ type: UPDATE_PROFILE_START });
  axios
    .put(`/api/accounts/${uid}`, body)
    .then(response => {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: response.data,
      });
    })
    .catch(e => dispatch({ type: UPDATE_PROFILE_ERR, payload: e }));
};

export const search = (accountType, query) => dispatch => {
  dispatch({ type: SEARCH_ACCOUNTS_START });
  console.log('========================');
  console.log('actions.js');
  console.log(accountType, query);
  console.log('========================');
  axios
    .get(`/api/accounts/${accountType}?subjects=${query}`)
    .then(response => {
      dispatch({
        type: SEARCH_ACCOUNTS_SUCCESS,
        payload: response.data,
      });
    })
    .catch(e => dispatch({ type: SEARCH_ACCOUNTS_ERR, payload: e }));
};

export const getUserProfile = uid => dispatch => {
  dispatch({ type: GET_USER_PROFILE_START });
  axios
    .get(`/api/accounts/${uid}`)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: GET_USER_PROFILE_SUCCESS,
        payload: response.data[0],
      });
    })
    .catch(e => dispatch({ type: GET_USER_PROFILE_ERR, payload: e }));
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_START });
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch(e => dispatch({ type: LOGOUT_ERR, payload: e }));
};

export const uploadPicture = (uid, pictureFile) => dispatch => {
  dispatch({ type: UPLOAD_PICTURE_START });
  axios
    .post(`/upload/picture/${uid}`, pictureFile)
    .then(response => {
      dispatch({
        type: UPLOAD_PICTURE_SUCCESS,
        payload: response.data,
      });
    })
    .catch(e => dispatch({ type: UPLOAD_PICTURE_ERR, payload: e }));
};
