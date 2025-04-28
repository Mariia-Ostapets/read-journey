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
