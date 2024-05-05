import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';
import userReducer from './userSlice'; // Import the reducer for managing user state

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    user: userReducer, // Add the reducer for managing user state
  },
});

export default store;
