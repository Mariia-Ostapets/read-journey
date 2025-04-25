import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  clearError,
  getCurrentUser,
  refreshToken,
} from './operations';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, handleRejected)
      .addCase(clearError, state => {
        state.error = null;
      })
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, state => {
        const tokenExists = state.token !== null;
        if (tokenExists) {
          state.isRefreshing = true;
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(refreshToken.pending, state => {
        state.isRefreshing = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isRefreshing = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isRefreshing = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
