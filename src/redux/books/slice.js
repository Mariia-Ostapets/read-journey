import { createSlice } from '@reduxjs/toolkit';
import { getRecommendedBooks } from './operations';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState = {
  books: [],
  ownBooks: [],
  readingBook: [],
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    goToNextPage(state) {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    goToPrevPage(state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getRecommendedBooks.pending, handlePending);
    builder.addCase(getRecommendedBooks.fulfilled, (state, action) => {
      state.books = action.payload.results;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getRecommendedBooks.rejected, handleRejected);
  },
});

export const booksReducer = booksSlice.reducer;
