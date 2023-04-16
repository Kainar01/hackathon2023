import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from '../../api/auth/api';
import { persistReducer } from 'redux-persist';
import type { AuthState } from './auth.interface';
import { ConfirmVerificaitonResponse } from '../../api/auth/types';

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.confirmVerification.matchFulfilled,
      (state, { payload }: PayloadAction<ConfirmVerificaitonResponse>) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    );
  },
});

export const { logout } = authSlice.actions;

export const authReducer = persistReducer(
  {
    key: 'rtk:auth',
    storage: AsyncStorage,
    whitelist: ['token', 'user'],
  },
  authSlice.reducer
);
