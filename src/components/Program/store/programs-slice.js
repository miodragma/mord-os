import { createSlice } from '@reduxjs/toolkit';

const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    runningPrograms: [],
    files: []
  },
  reducers: {
    openProgram(state, action) {
      state.runningPrograms = [...state.runningPrograms, action.payload];
    },
    closeProgram(state, action) {
      state.runningPrograms = state.runningPrograms.filter(program => program.id !== action.payload);
    },
    saveFile(state, action) {
      const findRunningProgramIndex = state.runningPrograms.findIndex(program => program.id === action.payload.programId);
      const runningProgramToUprate = { ...state.runningPrograms[findRunningProgramIndex] };
      runningProgramToUprate.currentLabel = action.payload.currentLabel;
      runningProgramToUprate.fileId = action.payload.id;

      state.files = [...state.files, action.payload];
      state.runningPrograms[findRunningProgramIndex] = runningProgramToUprate;
    },
    updateFile(state, action) {
      const findFileIndexToUpdate = state.files.findIndex(file => file.id === action.payload.id);
      const fileToUpdate = { ...state.files[findFileIndexToUpdate] };
      fileToUpdate.value = action.payload.value;
      state.files[findFileIndexToUpdate] = fileToUpdate;
    },
    deleteFile(state, action) {
      state.files = state.files.filter(file => file.id !== action.payload);
    }
  }
});

export const programsActions = programsSlice.actions;

export default programsSlice;
