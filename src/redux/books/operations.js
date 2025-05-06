import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';

export const getRecommendedBooks = createAsyncThunk(
  'books/recommended',
  async ({ limit, page = 1, author, title }, thunkAPI) => {
    const queryParams = {};
    if (limit) queryParams.limit = limit;
    if (page) queryParams.page = page;
    if (author) queryParams.author = author;
    if (title) queryParams.title = title;

    const queryString = new URLSearchParams(queryParams).toString();

    try {
      const { data } = await api.get(`/books/recommend?${queryString}`);
      if (page > data.totalPages) page = 1;
      return { ...data, page };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllBooks = createAsyncThunk(
  'books/allBooks',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get(`/books/recommend`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addBookById = createAsyncThunk(
  'books/addBookById',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.post(`/books/add/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post(`/books/add`, credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getOwnBooks = createAsyncThunk(
  'books/getOwnBooks',
  async (credentials, thunkAPI) => {
    try {
      const url =
        credentials && credentials !== 'all'
          ? `/books/own?status=${credentials}`
          : '/books/own';
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOwnBook = createAsyncThunk(
  'books/deleteOwnBook',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.delete(`/books/remove/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getBookById = createAsyncThunk(
  'books/getBookById',
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await api.get(`/books/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const startReading = createAsyncThunk(
  'books/startReading',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/books/reading/start', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const stopReading = createAsyncThunk(
  'books/stopReading',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/books/reading/finish', credentials);
      return data;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteReading = createAsyncThunk(
  'books/deleteReading',
  async (credentials, thunkAPI) => {
    const queryString = new URLSearchParams(credentials).toString();
    try {
      const { data } = await api.delete(`/books/reading?${queryString}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
