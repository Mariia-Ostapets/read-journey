import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import api, {
  setAuthHeader,
  clearAuthHeader,
} from '../../api/axiosInstance.js';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.code === 11000) {
        const existingEmail = error.response.data.keyValue.email;
        return thunkAPI.rejectWithValue(
          `Email ${existingEmail} is already in use`
        );
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/users/login', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return thunkAPI.rejectWithValue('Incorrect email or password');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is not available');
    }
    setAuthHeader(persistedToken);
    try {
      const res = await api.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.refreshToken;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('No refresh token');
    }
    setAuthHeader(persistedToken);
    try {
      const res = await api.get('/users/current/refresh');
      const newToken = res.data.token;
      setAuthHeader(newToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearError = createAction('auth/clearError');
