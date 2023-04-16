import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import type { AuthState } from './types';

const initialState: AuthState = {
  isLoggedIn: false,
  token: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout(state) {
      state.token = '';
      state.isLoggedIn = false;
    },
    assignToken(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  },
});

export const { logout, assignToken } = authSlice.actions;

export const authReducer = persistReducer(
  {
    key: 'rtk:auth',
    storage,
    whitelist: ['token', 'isLoggedIn'],
  },
  authSlice.reducer,
);
