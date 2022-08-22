import { createSlice } from '@reduxjs/toolkit';

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    gallery: []
  },
  reducers: {
    setGallery(state, action) {
      state.gallery = action.payload.slice(0, 20);
    }
  }
});

export const galleryActions = gallerySlice.actions;

export default gallerySlice;
