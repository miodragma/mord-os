import { createSlice } from '@reduxjs/toolkit';

const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    runningPrograms: []
  },
  reducers: {
    openProgram(state, action) {
      state.runningPrograms = [...state.runningPrograms, action.payload];
    },
    closeProgram(state, action) {
      state.runningPrograms = state.runningPrograms.filter(program => program.id !== action.payload);
    }
  }
});

export const programsActions = programsSlice.actions;

export default programsSlice;
