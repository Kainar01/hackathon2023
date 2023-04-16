import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';

import adminAuthApi, { ADMIN_AUTH_API_REDUCER_KEY } from '~/api/admin-auth/api';
import clientApi, { CLIENT_API_REDUCER_API } from '~/api/client/api';
import deliveryApi, { DELIVERY_API_REDUCER_KEY } from '~/api/delivery/api';
import orderApi, { ORDER_API_REDUCER_KEY } from '~/api/order/api';
import serviceCenterApi, { SERVICE_CENTER_API_REDUCER_KEY } from '~/api/service-center/api';
import { authReducer, authSlice } from '~/features/auth';
import {
  serviceSlice, serviceReducer,
} from '~/features/client';
import { operatorAuthReducer, operatorAuthSlice } from '~/features/staff-auth';

import { RESET_STATE_ACTION_TYPE } from './actions/resetState';
import { rtkQueryErrorLogger } from './middlewares/rtkQueryErrorLogger';

const reducers = {
  [authSlice.name]: authReducer,
  [CLIENT_API_REDUCER_API]: clientApi.reducer,
  [ORDER_API_REDUCER_KEY]: orderApi.reducer,
  [DELIVERY_API_REDUCER_KEY]: deliveryApi.reducer,
  [serviceSlice.name]: serviceReducer,
  [operatorAuthSlice.name]: operatorAuthReducer,
  [ADMIN_AUTH_API_REDUCER_KEY]: adminAuthApi.reducer,
  [SERVICE_CENTER_API_REDUCER_KEY]: serviceCenterApi.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<AppState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    // eslint-disable-next-line no-param-reassign
    state = {} as AppState;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat([orderApi.middleware, adminAuthApi.middleware, serviceCenterApi.middleware,
    clientApi.middleware,
    rtkQueryErrorLogger,
  ]),
});

export const persistor = persistStore(store);

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
