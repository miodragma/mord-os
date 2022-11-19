import { configureStore } from '@reduxjs/toolkit';

import programsSlice from '../components/Program/store/programs-slice';
import gallerySlice from '../components/Gallery/store/gallery-slice';
import newsSlice from '../components/News/store/news-slice';
import authSlice from '../components/Auth/store/auth.slice';
import membersSlice from '../components/Members/store/members-slice';

const store = configureStore({
  reducer: {
    programs: programsSlice.reducer,
    gallery: gallerySlice.reducer,
    news: newsSlice.reducer,
    auth: authSlice.reducer,
    members: membersSlice.reducer
  }
})

export default store;
