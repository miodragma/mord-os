import { configureStore } from '@reduxjs/toolkit';

import programsSlice from '../components/Program/store/programs-slice';

const store = configureStore({
  reducer: {
    programs: programsSlice.reducer
  }
})

export default store;
