import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  contacts: [],
  filter: '',
  isLoading: false,
  error: null,
};

const baseURL = 'https://connections-api.herokuapp.com';

// Function to extract the authorization token from Redux state
const selectAuthToken = state => state.user.authToken;

// Async thunk function to make a GET request to the /contacts route
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { getState }) => {
    try {
      const authToken = selectAuthToken(getState()); // Get the authorization token
      const response = await axios.get(`${baseURL}/contacts`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Add the authorization token to the request header
        },
      });
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter } = contactSlice.actions;

export default contactSlice.reducer;
