import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  info: {
    name: '',
    email: '',
    hobbies: [],
    occupation: '',
    image: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action) {
      state.info = action.payload; // its enough because of immer
    },
    clearUser(state) {
      state.info = initialState;
    },
  },
});
