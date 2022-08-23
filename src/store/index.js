import { configureStore } from '@reduxjs/toolkit';

import programsSlice from '../components/Program/store/programs-slice';
import gallerySlice from '../components/Gallery/store/gallery-slice';
import newsSlice from '../components/News/store/news-slice';

const store = configureStore({
  reducer: {
    programs: programsSlice.reducer,
    gallery: gallerySlice.reducer,
    news: newsSlice.reducer,
  }
})

export default store;
