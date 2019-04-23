import { combineReducers } from 'redux';
import {
  SET_PROFILE_START,
  SET_PROFILE_ERR,
  SET_PROFILE_SUCCESS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
  SEARCH_ACCOUNTS_START,
  SEARCH_ACCOUNTS_ERR,
  SEARCH_ACCOUNTS_SUCCESS,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_ERR,
  GET_USER_PROFILE_SUCCESS,
  LOGOUT_START,
  LOGOUT_ERR,
  LOGOUT_SUCCESS,
  UPLOAD_PICTURE_START,
  UPLOAD_PICTURE_ERR,
  UPLOAD_PICTURE_SUCCESS,
} from './actions.js';

const initialProfile = {
  isLoading: false,
  error: null,
  data: {},
  updated: false,
};

const profile = (state = initialProfile, action) => {
  switch (action.type) {
    case SET_PROFILE_START:
      return { ...state, isLoading: true };
    case SET_PROFILE_ERR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case UPDATE_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PROFILE_ERR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
        updated: true,
      };
    case LOGOUT_START:
      return { ...state, isLoading: true };
    case LOGOUT_ERR:
      return { ...state, isLoading: false, error: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, isLoading: false, error: null, data: {} };
    case UPLOAD_PICTURE_START:
      return {...state, isLoading: true };
    case UPLOAD_PICTURE_ERR:
      return {...state, isLoading: false, error: action.payload}
    case UPLOAD_PICTURE_SUCCESS:
      return {...state, isLoading: false, error: null, data: {...state.data, picture: action.payload}}
    default:
      return state;
  }
};

const initialSearch = {
  isLoading: false,
  error: null,
  data: [],
};

const searchResults = (state = initialSearch, action) => {
  switch (action.type) {
    case SEARCH_ACCOUNTS_START:
      return { ...state, isLoading: true };
    case SEARCH_ACCOUNTS_ERR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SEARCH_ACCOUNTS_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.payload,
      };
    default:
      return state;
  }
};

const initialUserProfile = {
  isLoading: false,
  error: null,
  data: {},
};

const userProfile = (state = initialUserProfile, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_START:
      return { ...state, isLoading: true };
    case GET_USER_PROFILE_ERR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  profile,
  searchResults,
  userProfile,
});

export default rootReducer;
