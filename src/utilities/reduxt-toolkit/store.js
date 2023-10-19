import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { cartSlice } from './slices/cartSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';
export const store = configureStore({
  reducer: combineReducers({
    userSlice: userSlice.reducer,
    cartSlice: cartSlice.reducer,
  }),
});
setupListeners(store.dispatch);
