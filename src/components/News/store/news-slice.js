import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: []
  },
  reducers: {
    setNews(state, action) {
      state.news = action.payload.slice(0, 20);
    }
  }
});

export const newsActions = newsSlice.actions;

export default newsSlice;
