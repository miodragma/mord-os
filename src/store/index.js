import { configureStore } from '@reduxjs/toolkit';

import programsSlice from '../components/Program/store/programs-slice';
import gallerySlice from '../components/Gallery/store/gallery-slice';

const store = configureStore({
  reducer: {
    programs: programsSlice.reducer,
    gallery: gallerySlice.reducer
  }
})

export default store;
