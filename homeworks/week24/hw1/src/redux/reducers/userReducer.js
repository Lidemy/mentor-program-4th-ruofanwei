/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-unresolved
import { createSlice } from '@reduxjs/toolkit';
import {
  getMe,
  login as loginAPI,
  register as registerAPI,
} from '../../WebAPI';
import { setAuthToken, getAuthToken } from '../../utils';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLoadingUser: false,
    errorMessage: null,
    userData: null,
  },
  reducers: {
    setIsLoadingUser: (state, action) => {
      state.isLoadingUser = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setIsLoadingUser, setErrorMessage, setUser } = userReducer.actions;

export const getUser = () => (dispatch) => {
  dispatch(setIsLoadingUser(true));
  if (getAuthToken()) {
    return getMe().then((res) => {
      dispatch(setIsLoadingUser(false));
      if (res.ok !== 1) {
        setAuthToken(null);
        return;
      }
      dispatch(setUser(res.data));
      return res.data;
    });
  }
  dispatch(setIsLoadingUser(false));
};

export const login = (username, password) => dispatch => loginAPI(username, password).then((data) => {
  if (data.ok === 0) {
    dispatch(setErrorMessage(data.message));
    return;
  }
  setAuthToken(data.token);
  return getMe().then((res) => {
    if (res.ok !== 1) {
      dispatch(setErrorMessage(res.toString()));
      return;
    }
    dispatch(setUser(res.data));
    return res;
  });
});

export const register = (username, nickname, password) => dispatch => registerAPI(username, nickname, password).then((data) => {
  if (data.ok === 0) {
    dispatch(setErrorMessage(data.message));
    return;
  }
  setAuthToken(data.token);
  return getMe().then((res) => {
    if (res.ok !== 1) {
      dispatch(setErrorMessage(res.toString()));
      return;
    }
    dispatch(setUser(res.data));
    return res;
  });
});


export default userReducer.reducer;
