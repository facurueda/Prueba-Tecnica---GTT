import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistedAuthReducer } from './authSlice';
import userProfileReducer from './userProfileSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    userProfile: userProfileReducer,
    chat: chatReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
