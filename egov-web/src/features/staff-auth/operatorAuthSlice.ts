import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import authApi from '~/api/admin-auth/api';

import { operatorAuthSliceType } from './types';

const initialState: operatorAuthSliceType = {
  user: null,
  isLoggedIn: false,
  verificationId: null,
  token: '',
};

export const operatorAuthSlice = createSlice({
  name: 'operatorAuthSlice',
  initialState,
  reducers: {
    adminLogout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.verificationId = null;
      state.token = '';
    },
  },
});

export const { adminLogout } = operatorAuthSlice.actions;

export const operatorAuthReducer = persistReducer(
  {
    key: 'rtk:operatorAuth',
    storage,
    whitelist: ['isLoggedIn', 'token', 'user'],
  },
  operatorAuthSlice.reducer,
);
